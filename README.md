# How to start the project
```bash
cp .env.example .env
```

```bash
pnpm install
```

```bash
pnpm --filter=api migrate:up
```

```bash
pnpm dev
```

## to test the api
```bash
npm test
```

# Team Player
- before working on the project, I would want to have a clear understanding of what each team member will be working on, to limit intersections of tasks
- work on individual branches, with PR/MR + peer code review
- listen to feedback from team and implement them during the next sprint/job

# If I had more time
If i had more time I would focus on the following:
- add more endpoints for more granular control (GET /superheroes/id or PATCH /superheroes/id for example)
- add more tests
- add documentation
- move db schema and zod schema out of api into a sharable package, so that both api and web can get access to the types generated from drizzle and zod
- complete the web app with edite, delete and view for each superhero
- create both a per project/package changelog and a high-level changelog for the project
