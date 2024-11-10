# Projection Start

# Set up the project

## Dependencies

To be able to run the project you need :

-   [pnpm](https://pnpm.io/fr/installation)
-   [docker](https://docs.docker.com/engine/install/)

## Installation

To set up the project you need to run :

```bash
pnpm install
```

this will resolve all the deps.

## Dev

You can now start the project :

First launch the docker image of the DB :

```bash
docker-compose build
```

Than you can launch the dev app :

```bash
pnpm dev
```

# TODOS

## BACK

-   [ ] set up the DB with drizzle

## FRONT

-   [ ] set up tanstack router / query
-   [ ] set up tailwindcss

## CONTRACT

-   [ ] generate a swagger

## chess

-   [ ] code the game
