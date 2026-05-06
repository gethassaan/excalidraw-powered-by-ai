# Excalidraw Powered By AI

An agentic diagram design tool built as a portfolio project on top of the **AI Engineering Fundamentals** workshop project.

This repository started from the ideas and course structure taught in Frontend Masters’ *AI Engineering Fundamentals* workshop, and I am extending it as my own project with additional product, engineering, and UX work.

## Overview

This project explores how to build and improve an AI-powered diagramming agent that can:

- Interpret natural-language diagram requests
- Control an Excalidraw canvas through structured tool calls
- Read and update live canvas state
- Use web search for fresh information
- Use RAG over a private knowledge base for grounded answers
- Stream responses, show tool activity, and support approval flows
- Be evaluated and iteratively improved with AI engineering practices

## Why this repo exists

I’m using this repository as a hands-on portfolio project to deepen and demonstrate my work in:

- AI agents and tool use
- LLM evaluation workflows
- context engineering
- retrieval-augmented generation
- human-in-the-loop interaction design
- generative UI and planning systems
- full-stack product engineering

## My work in this repo

Beyond the workshop foundation, I am using this repo to experiment with and build my own improvements, which may include:

- product and UX refinements
- custom agent behaviors and tool design
- evaluation and benchmarking changes
- prompt/context engineering improvements
- RAG and knowledge pipeline changes
- interface and workflow enhancements
- deployment, developer-experience, or architecture changes

## Course credit

This project is based on material from the Frontend Masters workshop **AI Engineering Fundamentals**.

Credit for the original course concept, lesson structure, and teaching material belongs to **Frontend Masters** and the course instructor(s). This repository is my own working adaptation and extension for learning and portfolio purposes, and any mistakes, modifications, or additions here are mine.

If you are looking for the original course materials, please use the official Frontend Masters course/repository instead of treating this repo as the canonical source.

## Relationship to the original course

This repository is **not** the official Frontend Masters course repository.

It is a personal derivative project inspired by and built on top of that course material. I am using it to document my implementation, experiments, and improvements as I continue developing the idea.

## Tech stack

- Cloudflare Workers
- Cloudflare Agents SDK
- AI SDK
- React + Vite
- Excalidraw
- Upstash Vector
- Braintrust
- Tavily
- OpenAI

## Running locally

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run embed
npm run eval
```

## Notes

The original workshop organizes lessons by git branch, where each lesson branch contains notes and the previous lesson’s solution. This portfolio repo may diverge from that teaching structure over time as I adapt the codebase for my own goals.
