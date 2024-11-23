# nodejs-express

App to learn nodejs and some of its most famous libs and frameworks like express and prisma.

**Concepts around nodejs**

- nodejs is a runtime not a language - javascript is the language. The browser is another runtime.
- nodejs and the browser have a lot of overlapping but there are some differences when it comes to the globals (like nodejs doesn't have a window global).

## API with Vanilla Nodejs - no frameworks

To start and nodejs, simply run `npm init --yes`. It'll bootstrap the `package.json` file with the basics.

Nodejs comes with a built-in module called `http`, which is meant to create and expose apis.

It's possible to build virtually anything just with the built-in modules, however it's too high level and demands a lot of effort - some frameworks build an abstraction on top of the base modules to ease developers lifes (e.g `express` uses `http` module under the hood). Example under `./vanilla-api`, which is an super simple api using only `http` module and no frameworks (including the routes handling).

To start the example above, inside the vanilla-api directory just run `node src/index.js`.

_there are different standards and design patterns to adopt when designing apis like REST, graphql, RPC, protobuff, etc. As soon as you adopt one, you api is expected to work in a certain way._

### CommonJs vs ES Modules

Prior to ES 6, there was no native way of importing modules and other files in vanilla js. CommonJS introduced the require function so that node code could have one file (or module) importing the other via the `require` function - currently this is the default way.

To enable ES Modules, just add the line `"type": "module"` to the root of `package.json`.

## Express App

Installation `npm i express`.

Express can return virtually any type in a response - html, json, image, video, etc (basically any file or any data).

## Typescript and nodejs

To install typescript for node:

`npm i typescript ts-node @types/node -D`

- `typescript` is the actual transpiler that will convert typescript into javascript
- `ts-node` is a ts runner for node - to avoid having to transpile before execution.
- `@types/node` is just the types for the node runtime

Add the `tsconfig.json` file with the content:

```
{
    "compilerOptions": {
        "sourceMap": true,
        "outDir": "dist",
        "strict": true,
        "lib": ["ESNext"],
        "esModuleInterop": true
    }
}
```

**Manual transpilation:** to manually transpile a ts file into js, just run `npx tsc {file}.ts`. Then to run, simple execute `node {file}.js`.

**Run ts file directly:** simply run `npx ts-node {file}.ts`

## Prisma

It's an ORM which is DB agnostic and supports a selection of Relational and non-relational dbs. It also supports schemas definition, migration, seeding, etc.

Installation:

run `npm i prisma -D` and then `npx prisma init`.

Basically 2 files will be created:

1. `schema.prisma` with the default config (adjust as necessary). This is where the db definition will go
2. add an entry to `.env` to hold the db url (adjust accordingly as well)

_to spin up a postgres instance: `docker run -itd --name node_course_db --rm --network={if_container_communication_necessary} -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=node_course  postgres:17.2`_

_pro tip: install prisma extension on vscode_
