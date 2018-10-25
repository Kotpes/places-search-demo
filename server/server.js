const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
require('dotenv').config()


const baseURL = process.env.REACT_APP_API_URL
const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret = process.env.REACT_APP_SECRET_KEY

const typeDefs = `
  type Query {
    searchForVenue(query: String!, lat: Float!, lng: Float!, limit: Int = 5): [Venue]
    suggestedVenues(lat: Float!, lng: Float!, limit: Int = 5): [Venue]
  }

  type Venue {
    id: ID!
    name: String!
    location: Location!
  }

  type Location {
    address: String
    lat: Float!
    lng: Float!
    distance: Int!
  }
`

const resolvers = {
  Query: {
    suggestedVenues: async(parent, args) => {
      const {lat, lng, limit} = args
      const requestUrl = `${baseURL}/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&ll=${lat}, ${lng}&intent=browse&limit=${limit}&section=trending`
      const res = await fetch(requestUrl)
      const json = await res.json()
      const venues = json.response.groups[0].items

      //Return normalized venue data
      return venues.map(item => item.venue)
    },
    searchForVenue: async(parent, args) => {
      const {query, lat, lng, limit} = args
      const requestUrl = `${baseURL}/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=20180323&ll=${lat}, ${lng}&query=${query}&intent=browse&limit=${limit}&radius=10000`
      const res = await fetch(requestUrl)
      const json = await res.json()
      const venues = json.response.venues
      return venues
    },
  },
}

const options = {
  endpoint: '/graphql',
  playground: '/playground',
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(options, () => console.log(`Server is running`))