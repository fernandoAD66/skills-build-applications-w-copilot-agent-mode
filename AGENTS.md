# Octofit Tracker agent guide

This repository is a multi-tier fitness tracker app for Mergington High School. The working app has a Node.js/Express TypeScript backend under `octofit-tracker/backend` and a React + Vite frontend under `octofit-tracker/frontend`.

## Start here

- Project overview: [README.md](README.md)
- Story and product context: [docs/octofit_story.md](docs/octofit_story.md)
- Shared setup constraints: [.github/instructions/octofit_tracker_setup_project.instructions.md](.github/instructions/octofit_tracker_setup_project.instructions.md)
- Backend guidance: [.github/instructions/octofit_tracker_django_backend.instructions.md](.github/instructions/octofit_tracker_django_backend.instructions.md)
- Frontend guidance: [.github/instructions/octofit_tracker_react_frontend.instructions.md](.github/instructions/octofit_tracker_react_frontend.instructions.md)

## Key conventions

- Do not change directories in shell commands. Use direct paths such as `octofit-tracker/backend` and `octofit-tracker/frontend`.
- Keep the public API ports to the project defaults: backend on `8000`, frontend on `5173`, database on `27017`.
- Prefer feature-oriented, small changes over broad rewrites.
- Use Mongoose models for data access instead of ad-hoc MongoDB scripts.
- Check MongoDB status with `ps aux | grep mongod` before relying on database-backed work.
- Use the existing package scripts and project structure rather than introducing a new framework or monorepo layout.

## Repo layout

```text
.
├── README.md
├── docs/
├── octofit-tracker/
│   ├── backend/
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
└── .github/instructions/
```

## Typical tasks

- Backend work: update routes, models, and configuration in `octofit-tracker/backend`.
- Frontend work: update React components/pages and styling in `octofit-tracker/frontend`.
- Shared app behavior: keep the stack aligned with the setup guide and avoid introducing new ports or frameworks.

## Link, don’t duplicate

When a rule or requirement is already captured in the repo docs, link to it instead of copying it into new files. This keeps the guidance concise and aligned with the project’s existing instructions.
