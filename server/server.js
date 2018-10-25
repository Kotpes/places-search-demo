const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config()

const baseURL = process.env.REACT_APP_API_URL
const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret = process.env.REACT_APP_SECRET_KEY


const typeDefs = `
  type Query {
    searchForVenue(query: String!, lat: Float!, lng: Float!, limit: Int = 5): [Venue]
    suggestedVenues(lat: Float!, lng: Float!, limit: Int = 5): [Venue]
    venue(id: String!): CompleteVenue
  }

  type Venue {
    id: ID!
    name: String!
    location: Location!
  }

  type CompleteVenue {
    id: ID!
    name: String!
    location: Location!
    contact: Contact  
    stats: Stats
    url: String
    price: Price
    rating: Float
    photo: Photo
  }

  type Photo {
    prefix: String!
    suffix: String!
  }

  type Price {
    tier: Int!
    message: String!
    currency: String!
  }

  type Stats {
    tipCount: Int!
  }

  type Contact {
    formattedPhone: String
    instagram: String
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
    venue: async(parent, args) => {
      const {id} = args
      const requestUrl = `${baseURL}/venues/${id}?client_id=${client_id}&client_secret=${client_secret}&v=20180323`
      
      const res = await fetch(requestUrl)
      const json = await res.json()
      const response = json.response.venue
      //Picking first venue photo and merging it with venue
      const photo = response.photos.groups[1].items[0]
      const venue = {
        ...response,
        photo
      }
      
      return venue
    }
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