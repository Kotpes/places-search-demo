## Set up
- Clone this repo, `cd` in and run `yarn` to install dependencies
- To get `flowtype` working with your IDE, you might need to have it installed globally `npm install flow-bin -g`

## Local setup
### Environmental variables
You'll need to provide following variables for **local** graphql server to work: `REACT_APP_SECRET_KEY` (foursqare `secret_key`), `REACT_APP_GOOGLE_API_KEY`(google's API key) and `REACT_APP_CLIENT_ID` (foursquare `client_id`). Just run `cp .env.example .env` and fill in missing variables
### Starting graphql server
GraphQL server uri is speified in client deinition in `App.js`, if you'd like to use local server instead:
- `cd` to `server` dir and run `yarn && yarn start` to start local GraphQL server
- replace `uri` in `App.js` with `http://localhost:4000`
### Starting front-end
To start the front-end, run `yarn start`, application will open in browser at `http://localhost:3000`
**Note**: Server is hosted on free account on https://now.sh it might take few second for instance to "spin up" on first time you use it (e.g. will take some time to fetch list of venues for the first time).

## Demo
Front-end is accessible on https://search-places-front.now.sh/.

Back-end grapql playground is accessible on https://place-search-graphql.now.sh/playground

**NOTE:** Foursquare key used by app's backend, is a test key and has daily limits of requests. When it's reached, app won't be able to show location's overview and will throw a graphql error.

### Development notes
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) to keep time spent on tooling minimal
- uses [Flow](https://flow.org/) for static type checking
- uses free tier Foursquare Places API
- uses [css modules](https://github.com/css-modules/css-modules) for styles encapsulation. Stylesheet file has to be named `*.module.css` to get parsed correctly.
- [react-loadable](https://github.com/jamiebuilds/react-loadable) is used for code splitting
- used `now.sh` service to host graphql server
- used `graphql-yoga` package to setup graphql server - pretty straight forward to setup
- used http://ip-api.com/json to get current user's location. It's far away from precise, but it's OK for this test project
- uses [react-google-maps](https://github.com/tomchentw/react-google-maps) so save time on google maps setup