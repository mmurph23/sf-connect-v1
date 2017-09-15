# Using `create-react-app` with React Router + Express.js

**:warning: This is outdated, please refer to the official and new [react-router docs](https://reacttraining.com/react-router/)**

See : https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d

## Development

Clone this repository:

```sh
git clone https://github.com/mrpatiwi/routed-react.git
cd routed-react
```

Install dependencies:

```sh
npm install
```

Start the project at [`http://localhost:3000`](http://localhost:3000).

```sh
npm start
```

## Running with Docker

Be sure to install Docker and start a Docker-machine if necessary.

Let's create an image named `routed-react`:

```sh
docker build -t routed-react .
```

Finally, start a container named `routed-react-instance` at port `80`.

```sh
docker run -p 80:9000 --name routed-react-instance routed-react
```

## Testing

```sh
npm test
```

//applyMiddleware
http://redux.js.org/docs/api/applyMiddleware.html

//redux thunk
https://github.com/gaearon/redux-thunk

//redux dev tools
https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0

//jsx conditional rendering
http://devnacho.com/2016/02/15/different-ways-to-add-if-else-statements-in-JSX/


//jsforce resources
https://github.com/jsforce/jsforce/issues/242
https://github.com/jsforce/jsforce/issues/660
https://github.com/jsforce/jsforce/issues/196
https://github.com/jsforce/jsforce/issues


//alternate to js force?
https://www.npmjs.com/package/node-salesforce

//good example repository
https://github.com/gbockus/jsForceInAction


//how to server react client from express backend
https://www.codeproject.com/Articles/1191715/Create-React-App-with-Express-in-Production
