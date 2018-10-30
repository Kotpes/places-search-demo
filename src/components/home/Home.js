//@flow
import React, { Component } from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Search from '../search/Search'
import PlacesList from '../placesList/PlacesList'
import Loading from '../shared/Loading'
import css from './Home.module.css'

type State = {
  lat: number,
  lng: number,
  searchQuery: string,
}


export const GET_SUGGESTED_PLACES = gql`
  query GetSuggestedVenues($lat: Float!, $lng: Float!, $limit: Int) {
    suggestedVenues(lat: $lat, lng: $lng, limit: $limit) {
      id
      name
      location {
        distance
        address
        lat
        lng
      }
    }
  }
`;

class Home extends Component<{}, State> {
  
  state = {
    lat: 60.1957,
    lng: 24.9622,
    searchQuery: ''
  }

  componentDidMount() {
    this.fetchUserLocation()
  }

  fetchUserLocation = async() => {
    const locationApiURL = process.env.REACT_APP_GOOGLE_API_KEY ? `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_API_KEY}` : ''
    const res = await fetch(locationApiURL, {method: 'POST'})
    const locationObject = await res.json()
    const location = locationObject.location
    
    this.setState({
      lat: location.lat,
      lng: location.lng
    })   
  }

  onSearch = (value: string) => {
    const venueName = value.toLowerCase()
    this.setState({searchQuery: venueName})
  
  }

  render() {
    const {lat, lng, searchQuery} = this.state
    const props = {lat, lng, searchQuery}

    return (
      <div className={css.app}>
        <h1 className={css.title}>Search for a place</h1>
        <Search onChange={(value) => this.onSearch(value)} />
        <Query
          query={GET_SUGGESTED_PLACES}
          variables={{lat, lng, limit: 10}}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return `Error!: ${error}`
            const foundLocations = data.suggestedVenues
            
            return (
              <PlacesList foundLocations={foundLocations} {...props} />
            );
          }}
        </Query>           
      </div>
    );
  }
}

export default Home;
