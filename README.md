# Rails Inertia React Template

An opinionated starting point for building web applications with **Ruby on Rails** and **React**, connected by **Inertia.js**. It captures a way of working refined over years of shipping Rails + Inertia + React projects: a single frontend directory with clear boundaries, typed page props shared from Rails, error pages rendered through the same layout as the rest of the app, and a test and lint setup that runs the same locally and in CI.

Use it as a reference for conventions or as the base of a new project.

## Stack

| Layer     | Technology                                                      |
| --------- | --------------------------------------------------------------- |
| Backend   | Ruby 4.0, Rails 8.1, PostgreSQL, Solid Queue / Cache / Cable    |
| Bridge    | Inertia.js 3 via `inertia_rails`                                |
| Frontend  | React 19, TypeScript 7, Vite 8 via `vite_rails`                 |
| Styling   | Tailwind CSS 4, shadcn/ui (Radix), Lucide icons                 |
| Quality   | Biome, RuboCop (Rails Omakase), Brakeman, bundler-audit, Minitest |
| Delivery  | Docker, Kamal, Thruster, GitHub Actions, Dependabot             |

## Requirements

- Ruby 4.0.6 (see `.ruby-version`)
- Node.js 24 (see `.node-version`)
- PostgreSQL 14 or newer
- Google Chrome for system tests

## Getting started

```sh
bin/setup   # installs gems and npm packages, prepares the database
bin/dev     # starts Rails and the Vite dev server
```

The app is available at http://localhost:3000. Vite serves assets with hot module replacement from port 3036.

## Project structure

```
app/
  controllers/
    inertia_controller.rb   # base class for Inertia pages, shares data with the frontend
    errors_controller.rb    # 404 / 422 / 500 pages rendered through Inertia
    home_controller.rb
  frontend/
    entrypoints/            # Vite entrypoints: inertia.tsx and application.css
    pages/                  # one component per controller action (home/index.tsx)
    components/
      common/               # reusable app components (FlashMessages, ErrorPage)
      layout/               # page layouts (MainLayout)
      ui/                   # shadcn/ui primitives, managed by the shadcn CLI
    hooks/                  # React hooks (usePageProps)
    lib/                    # framework-agnostic helpers (cn)
    config/                 # frontend constants (APP_NAME)
    types/                  # shared TypeScript types and Inertia type augmentation
```

Every directory exposes its public API through an `index.ts` barrel, so imports read as `@/components/layout` rather than deep paths.

## Conventions

**Pages follow Rails routing.** A controller action renders the page component at `app/frontend/pages/<controller>/<action>.tsx`. The `HomeController#index` action renders `pages/home/index.tsx`:

```ruby
class HomeController < InertiaController
  def index
    render inertia: { name: "World" }
  end
end
```

**Shared props are typed.** Anything shared from `InertiaController` with `inertia_share` is described in `app/frontend/types/index.ts` and picked up by `usePage()` and `usePageProps()` through the Inertia type augmentation in `types/globals.d.ts`.

**One default layout.** `MainLayout` wraps every page through the `layout` option in `entrypoints/inertia.tsx`. A page can opt out or use another layout by setting `Page.layout`.

**Flash messages travel with the page.** Rails `notice` and `alert` are forwarded by `inertia_rails` and rendered by `FlashMessages` inside the layout. Use `flash.inertia[:key]` for custom keys.

**Error pages use the app layout.** `config.exceptions_app = routes` sends 404, 422 and 500 responses to `ErrorsController`, which renders Inertia pages from `pages/errors/`. Non-HTML requests get an empty response with the right status.

**Adding UI primitives.** Use the shadcn CLI and commit the generated file:

```sh
npx shadcn@latest add dialog
```

## Quality checks

| Command             | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run verify`    | Runs Biome and the TypeScript compiler          |
| `npm run lint:fix`  | Fixes lint and formatting issues                |
| `bin/rubocop`       | Lints Ruby code                                 |
| `bin/brakeman`      | Scans for Rails security issues                 |
| `bin/bundler-audit` | Checks gems for known vulnerabilities           |
| `bin/rails test`    | Runs unit, controller and integration tests     |
| `bin/rails test:system` | Runs browser tests in headless Chrome       |

Controller tests use the Inertia assertions from `inertia_rails/minitest`, for example `assert_inertia_component` and `assert_inertia_props`.

If Selenium cannot find a compatible Chrome, point it at one explicitly:

```sh
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" bin/rails test:system
```

## Continuous integration

The GitHub Actions workflow runs on every pull request and on pushes to `main`:

- Brakeman and bundler-audit for Ruby, `npm audit` for JavaScript
- RuboCop, Biome and the TypeScript compiler
- Rails tests and system tests against PostgreSQL

Dependabot opens weekly pull requests for gems, npm packages and GitHub Actions.

## Deployment

The `Dockerfile` builds a production image with Ruby, Node and precompiled assets. `config/deploy.yml` holds the Kamal configuration; fill in the server, registry and domain before the first `bin/kamal deploy`.

## Updating dependencies

```sh
bundle update
npm update
npx shadcn@latest add --all --overwrite   # optional: refresh shadcn/ui components
```

Keep `.ruby-version`, `.node-version` and the `RUBY_VERSION` and `NODE_VERSION` arguments in the `Dockerfile` in sync.
