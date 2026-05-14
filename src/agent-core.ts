// Shared agent logic. Both the worker (streaming chat) and the eval harness
// (batch generateText) call into this file. Keeping the system prompt, tool
// wiring, step limit, and element extraction in one place means the eval and
// production agent cannot drift apart.

import {
  generateText,
  streamText,
  stepCountIs,
  type LanguageModel,
  type ModelMessage,
} from "ai";
import { buildTools } from "./tools";
import { SYSTEM_PROMPT } from "./system-prompt";
import { ExcalidrawElement } from "./schema";
import { serializeCanvasState } from "./context/canvas-state";
import process from "node:process";

interface AgentArgs {
  model: LanguageModel;
  messages: ModelMessage[];
  // Seed canvas state for the headless simulator. The eval passes this so
  // modify cases can be scored against the post application canvas. The
  // worker leaves it undefined; the browser handles the real mutation.
  canvasState?: ExcalidrawElement[];
  system?: string;
  maxSteps?: number;
}

function buildSystem(
  base: string,
  canvasState: ExcalidrawElement[] | undefined,
): string {
  return `${base}\n\n# Current canvas state\n\n${serializeCanvasState(canvasState ?? [])}`;
}

// Streaming variant. Used by the worker for the live chat experience.
export function streamAgent({
  model,
  messages,
  canvasState,
  system = SYSTEM_PROMPT,
  maxSteps = 5,
}: AgentArgs) {
  return streamText({
    model,
    system: buildSystem(system, canvasState),
    messages,
    tools: buildTools(process.env),
    stopWhen: stepCountIs(maxSteps),
  });
}

// Non-streaming variant. Used by the eval harness so we can collect the full
// result and pull out elements for scoring.
export async function runAgent({
  model,
  messages,
  canvasState,
  system = SYSTEM_PROMPT,
  maxSteps = 5,
}: AgentArgs) {
  const result = await generateText({
    model,
    system,
    messages,
    tools: buildTools(process.env),
    stopWhen: stepCountIs(maxSteps),
  });
  return {
    text: result.text,
    elements: extractElements(result.steps, canvasState ?? []),
    steps: result.steps,
  };
}

// Walk the agent's tool calls in order and simulate what the canvas would
// look like after they were all applied. This mirrors what the client does
// in the browser: generateDiagram replaces the canvas, modifyDiagram merges
// updates into the matching element by id.
interface StepLike {
  toolResults?: { toolName: string; output: unknown }[];
}

export function extractElements(steps: StepLike[], initial: any[] = []): any[] {
  let canvas = [...initial];

  for (const step of steps) {
    for (const toolResult of step.toolResults ?? []) {
      if (toolResult.toolName === "generateDiagram") {
        const output = toolResult.output as any;
        if (Array.isArray(output?.elements)) {
          canvas = [...output.elements];
        }
      } else if (toolResult.toolName === "modifyDiagram") {
        const output = toolResult.output as any;
        if (typeof output?.elementId === "string" && output.updates) {
          const target = canvas.find((el) => el.id === output.elementId);
          if (target) Object.assign(target, output.updates);
        }
      }
    }
  }

  return canvas;
}
