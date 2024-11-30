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

run `npm i prisma -D` and then `npx prisma init`. _ps this is the prisma CLI not the ORM / SDK. ORM installed below in the migrations step_

Basically 2 files will be created:

1. `schema.prisma` with the default config (adjust as necessary). This is where the db definition will go (model/entities, etc)
2. add an entry to `.env` to hold the db url (adjust accordingly as well)

_to spin up a postgres instance: `docker run -itd --name node_course_db --rm --network={if_container_communication_necessary} -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=node_course  postgres:17.2`_

_to run a container with postgres client, `docker run -it --rm --network={network_name} postgres:17.2 bash` then `psql {connection details}`_

_pro tip: install prisma extension on vscode_

_npx prisma studio - visual db client_

### Models

Models is what hibernate calls entities. It's basically the object mapping to the database.

When defining the relationship between objects, it's possible to define one side of the relationship and run the command `npx prisma format` to have it creating the other side (e.g in a one to many relationship)

_by default all attributes are mandatory_

### Migrations

The SDK / ORM part of prisma is actually a separate module. To install it, run `npm i @prisma/client`.

To apply the initially defined schema (and every subsequent change) to the DB and generate the SDK, run `npx prisma migrate dev --name init` - ps the db url environment variable has to be properly set to the up and running db.

The `name` flag is a suffix to help identify what this migration is about.

_to reset a db: `npx prisma migrate reset`_

_prisma generates the client that will be used in the code based on the schema_

## Routes and Handlers

When using express it's possible to define the app or routers. The main difference is that the app is the whole application while routers is a way of subdividing the app into smaller chunks which have their own configs (e.g public vs private endpoints).

When creating routers, you have to attach them to the actual app.

```javascript
...
    app.use('/api', router)
..
```

The `use` function allows you to apply global configuration to a given path (or even whole app).

_ps matching endpoints will always have the first that registered to execute_

## Middleware

In a nutshell, it's a list of functions that have the ability to run before (or after) the handlers - it sits between the router and the handler (example of usages: log the requests, error handling, authentication, augment the request and response, etc). _like aspects in java_

```javascript
const myMiddleware = (req, res, next) => {
  // do something here.... it can even break the chain and respond to the client or connect to the db, etc
  next();
};

// attach it:

app.get('/api/sth', myMiddleware, anotherMiddleware, ..., handler)
// or
app.get('/api/sth', [myMiddleware, anotherMiddleware, ...], handler)
```

Ps: It's not necessary to pass a mount path for the `use` function: `app.use(morgan('dev'))`. <- this applies to everything that comes to the app.

### Useful third party middlewares

1. morgan: it's a middleware that logs requests - `npm i morgan`
2. express.json(): enables receiving json from the clients
3. express.urlencoded({extended: true}): enables use of query and params as maps.
4. cors: `npm i cors`

### Middlewares with custom params

It's just a matter of creating a function that returns a function:

```javascript
const customLogger = (message) => (req, res, next) => {
  console.log(`Custom message!! ${message}`);
  next();
};

app.use(customLogger("Parameterised message!!"));
```

## Input validation

API shoud never trust clients and users. While it's possible to manually validate inputs, it's tedious and error prone. One of the available options for this is `express-validator` - `npm i express-validator`.

With `express-validator`, you write validators so that when the request hits the controller / handler, it can be assumed that the data is in the expected format.

`express-validator` works as a middleware (or a schema when it gets more complicated), were it validates the input based on the configs set up, but it doesn't make any decision about what to do, but instead leave it for the developer to decide:

```javascript
router.put("/...", body("name").isString(), (req, res) => {
  // enforces the request body to have a body attribute
  const errors = validationResult(req); // enabled the developers to get the validation result

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  }
});
```

## Thunder Client

It's a http client embedded in vscode.

## JWT

There are libs to ease working with JWTs (issue and read). `npm i jsonwebtoken bcrypt dotenv`

_ps: by default, nothing in the environment variable file (.env) gets automatically loaded into server - it has to be loaded manually - that is what dotenv is for_

```javascript
import * as dotenv from "dotenv";
dotenv.config();

// ...

process.env.SOMETHING;
```

_ps1: bcrypt will be used to hash the users's passwords_

_ps2: jsonwebtoken will be used to issue jwt tokens_

## Error handling

When errors are raised in node and not caught, it break the application, causing it to stop.

For synchronous hanlders and middlewares, Express catches unhandled exceptions thrown by them, preventing the application from crashing out of the box. It also render a default error page.

**However express doesn't know (nor has a way of knowing) how to handle asynchronous errors - this is how JS works, async things are happening in the future, in a different call stack**

### Custom error handler

#### Synchronous

It's a simple middleware with an extra argument, which is the exception itself. The only difference is where it's placed - which has to be after all the routes since it has to catch any eventual thrown exception (if it is registered before, it wouldnt be able to do so).

```javascript
app.get('/', async (req, res) => {
    throw new Error("something bad happened")
})

// ...

app.use(((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // logic

    console.log(err);

    res.json({message: 'oops there was an error'})
}) as express.ErrorRequestHandler)

```

Like regular middlewares, error handlers can do everything, asynchronous processing, access db, etc, which makes it a perfect place to add instrumentation, error logging, error reporting, etc.

#### Asynchronous

To trigger error handlers for asynchronous code, it's necessary to handle it ourselves so that we can "notify" express about exceptions that will eventually be raised.

To do so, just add a next argument to the handler (similarly to middlewares) and instead of throwing the exception, pass it to the next (previously there was nothing after the handler, now there's the error handler).

```javascript
app.get('/', async (req, res, next) => {
    setTimeout(() => {
        next(new Error("something bad happened"))
    }, 1)
})

// ...

app.use(((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // logic

    console.log(err);

    res.json({message: 'oops there was an error'})
}) as express.ErrorRequestHandler)
```

**Custom errors:**

```javascript
class CustomError extends Error {
  // ...
}
```

#### Errors outside express handlers (on node level)

In such a situations, there is nothing that can be done on express level. The only way around it and to prevent the server from crashing is subscribing to an event on process level: `process.on()`.

_the process in node is an object has a lot of things that is OS related_

Especially the asynchronous code it's not possible to know what happened as it was... asynchronous. But it's better than letting the app crash. You may want some high level handling like this at the entrypoint of the express app creation.

```javascript
// sync
process.on("uncaughtException", () => {
  // logic
  console.log("error raised during sync processing");
});

// async
process.on("unhandledRejection", () => {
  // logic
  console.log("error raised during async processing");
});

setTimeout(() => {
  throw new Error("oops");
}, 300);

throw new Error("oh no");
```

_ps: the subscription has to happen before any potential error happens_

**The approach above has nothing to do with express but everything to do with node!**

## Environment Variables

_Env variable gets injected into the app when it's running. They are accessed via the process object/variable (`process.env.VAR_NAME`) < env vars are provided by the host machine/platform._

_dotenv is one of the options to inject environment variables locally from the `.env` file (otherwise we'd have to do so via the local OS). In a hosting platform, the platform itself will take care of it_

`NODE_ENV` is one of the most important env variables in node. It's a convention and tons of libs and frameworks rely on it on order to determine how to function. Common values are `development` (which happens to usually be the default value), `testing` and `production` - e.g React relies on it to determine if it should issue some warnings and errors.

### Environment creation - configuration driven code

`lodash` is a utility package that used to be more relevant in the past, when many of the features that it provides weren't built into javascript directly. There are still some useful provided features though, like the `merge`, which will be used for this example of how to build a configuration driven app.

`npm i lodash.merge`

_See commit for more details on how to set it up and have a dynamic app._

Running in a different mode: `STAGE=testing npm run dev`.

## Performance

Blocking code is extremely dangerous in express (and node in general) because unlike javascript running on a browser, users share the server resources and node is single threaded. One CPU intensive request will block all the subsequent ones.

When writing javascript the goal should always be to write non-blocking code (specially cpu intensive logics). To to so, there are 2 ways:

1. make the code `async` so that it's scheduled to be done later and it'll be done in a separate stack. It allows javascript to continue serving more requests.

example:

```javascript
bcrypt.compare(x, y);

// vs

bcrypt.compareSync(x, y);
```

Another good example is the interactions with file system: `fs.readFileSync('./file')` vs `fs.readFile('./file')`:

```javascript
const fs = require("fs/promises");
const path = require("path");

const read = async () => {
  const result = fs.readFile(path.join(__dirname, "package.json"), "utf-8");
  return result;
};

console.log("this is not blocked");
read().then((f) => console.log("now I have the file!", f));
console.log("this is also not blocked");

// vs

const fs = require("fs");
const path = require("path");

const result = fs.readFileSync(path.join(__dirname, "package.json"), "utf-8");
console.log("now I have the file!", result);
console.log("this is blocked");
```

2. use a child process (which is similar to a web worker in the browser) - however there is a limitation on the number of child processes that can be spun up.

Child processes should only be used when you are in control of when it's created (e.g on a cronjob task vs user requests via an api).

## Tests

For an express app, a good duo for tests is `jest` and `supertest`. The first is a testing framework while the second is a tool to ease integration tests.
`ts-jest` is a lib that allows tests to be written in typescript.

Set up:

1. `npm i supertest @types/supertest jest @types/jest ts-jest`
2. `npx ts-jest config:init`

To run, simply execute `npx jest`.

For integration tests, we can import the express app and delegate the server start to supertest.

## Deployment setup

In order to deploy the api live, it's important to build the project and convert the typescript files into javascript file
(during development ts-node was doing this on the fly - tho technically possible to run it in prod, effectively it's inefficient due to overhead).

To do so, just run the command `npx tsc -p tsconfig.json` and then run the application pointing to the transpiled file `node dist/index.js`
(or speed up this process by creating scripts in the `package.json` file).

### Deploying to a hosting provider (render)

To deploy to render, the api must be on github. Then click on `new` -> `web service` (which means anything that needs a port) -> connect the github repository -> fill in the form (attention to the `build command` and `start command` inputs) -> create

After the creation, set the environment variables (db url, ports, etc).
