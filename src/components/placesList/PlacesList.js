//@flow
import React from 'react';
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../shared/Loading'
import List from './List'
import css from './PlacesList.module.css';


type Location = {
  address: string,
  lat: number,
  lng: number,
  distance: number
}

export type Venue = {
  id: string,
  name: string,
  location: Location
}

type Props = {
  foundLocations: Array<Object>,
  searchQuery: string,
  lat: number,
  lng: number,
}

type State = {
  locations: Array<Venue>
}

const SEARCH_VENUES = gql`
  query SearchVenue($lat: Float!, $lng: Float!, $query: String!) {
  searchForVenue(lat: $lat, lng: $lng, query: $query) {
    id
    name
    location {
      address
      lat
      lng
    }
  }
}
`

class PlacesList extends React.Component<Props, State> {
  state = {
    locations: this.props.foundLocations
  }

  render() {
    const {locations} = this.state
    const {searchQuery, lat, lng} = this.props

    return (
      <section className={css.results}>
        <h2 className={css.subtitle}>Venues</h2>  
        <ul className={css.foundLocation}>
          {locations.length > 0 && searchQuery === ''
            ? (<List locations={locations}/>)
            : searchQuery !== '' ? (
              <Query
                query={SEARCH_VENUES}
                variables={{lat, lng, query: searchQuery}}
              >
                {({ loading, error, data }) => {
                  if (loading) return <Loading />
                  if (error) return `Error!: ${error}`;
                  const foundLocations = data.searchForVenue
                  
                  return foundLocations.length > 0 ? (
                    <List locations={foundLocations}/>
                  ) : (
                    <li className={css.emptySearchMessage}>Nothing found</li>
                  )
                }}
              </Query>   
            ) : (
              <li className={css.emptySearchMessage}>Nothing found</li>
            )
          }
        </ul>
      </section>
    );
  }  
};

export default PlacesList;
