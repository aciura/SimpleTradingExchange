# NodeJs Simple Trading Exchange api server

Project is using:

- Express Js Server
- TypeScript
- [Debug](https://github.com/visionmedia/debug#readme) for console logs

APi server is starting up on localhost:4000

UI web app using this api server is in [/react-ui](https://github.com/aciura/SimpleTradingExchange/tree/main/react-ui).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server.

For displaying order service messages it's using WINDOWS command `set DEBUG=orders`,
on LINUX machine please change it to "DEBUG=orders,app && tsc && node ./dist/app.js".
Somehow setting ENV with `cross-env` does not work for me on Windows with Debug library.

Open [http://localhost:4000](http://localhost:4000) to view server status in the browser.

### `npm test`

Launches the tests.

### `npm run debug`

Runs the server in debug mode (with all logs).
