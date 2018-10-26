## Set up
- Clone this repo, `cd` in and run `yarn` to install dependencies
- To get `flowtype` working with your IDE, you might need to have it installed globally `npm install flow-bin -g`

## Run up
### Environmental variables
You'll need to provide following variables for local graphql server to work: `REACT_APP_SECRET_KEY` (foursqare `secret_key`), `REACT_APP_GOOGLE_API_KEY`(google's API key) and `REACT_APP_CLIENT_ID` (foursquare `client_id`). Just run `cp .env.example .env` and fill in missing variables
### Starting graphql server
GraphQL server uri is speified in client deinition in `App.js`, if you'd like to use local server instead:
- `cd` to `server` dir and run `yarn && yarn start` to start local GraphQL server
- replace `uri` in `App.js` with `http://localhost:4000`
### Starting front-end
To start the front-end, run `yarn start`, application will open in browser at `http://localhost:3000`
Note: If you do use server hosted on now.sh and launch app for the first time, it'll take few second for instance to "spin up" (will take some time to fetch list of venues).

### Development notes
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) to keep time spent on tooling minimal
- uses free tier Foursquare Places API
- I'm using [css modules](https://github.com/css-modules/css-modules) fro styles encapsulation. Stylesheet file has to be named `*.module.css` to get parsed correctly.
- [react-loadable](https://github.com/jamiebuilds/react-loadable) is used for code splitting
- used `now.sh` service to host graphql server
- used `graphql-yoga` package to setup graphql server - pretty straight forward to setup
- using http://ip-api.com/json to get current user's location. It's far away from precise, but it's OK for this test project


