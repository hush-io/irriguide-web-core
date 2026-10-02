**Irriguide Web Core** -  Smart Irrigation Monitoring System  
_Environmental monitoring and irrigation suitability assessment for rice production areas in Malolos, Bulacan_

### Technology Stack

Framework: **React**  
Meta-framework: **NextJS**  
CSS: **Tailwind**  
UI Framework: **Shadcn UI**  
Verified package managers: **Bun** v1.3.3

### Getting Started

#### Prerequisites

Install dependencies using preferred package manager. _(The project was initialized using [bun](https://bun.com/https://bun.com/) v1.3.3 so you might want to use that)_.  
```sh
bun install
```

#### Running the App

The app expects [irriguide-backend](https://github.com/irriguide/irriguide-backend) to be running. Set `IRRIGUIDE_API_URL` to its URL if it is not on `http://localhost:8000`.

Run development server  
```sh
bun run dev
```

Run production server  
```sh
bun run build
bun run start
```

#### Code Maintainance

Format code  
```sh
bun run fmt
```

### Gitflow

#### Rules

- No commits should be pushed directly to the `main` branch
- No PRs should be merged if there are request changes or pipeline failures

#### Branching

The name of the branch should be prefixed with the issue type and issue number. Suffixing the branch name with whatever the issue is about is prerogative of the engineer working on the issue. Branch names **should all be lowercase**.

Template: `<issue type>/<issue number>-<issue purpose>`  
Samples:

- `feature/143`
- `feature/143-authentication`

#### Commits

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) specification.
