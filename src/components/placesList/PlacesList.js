//@flow
import React from 'react';
import { Link } from '@reach/router';
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import css from './PlacesList.module.css';

type Props = {
  foundLocations: Array < Object >
}

const List = ({locations}) => {
  return locations.map(location => {
    const {id, name} = location
    return (
      <li key={id}>
        <Link to={`places/${id}`}>{name}</Link>
      </li>
    )
  })
}

const GET_SUGGESTED_PLACES = gql`
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


const lat =  60.176175
const lng = 24.922370


const PlacesList = (props : Props) => {
  return (
    <Query
      query={GET_SUGGESTED_PLACES}
      variables={{lat, lng, limit: 10}}
    >
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        console.log(data);
        const foundLocations = data.suggestedVenues
        

        return (
          <section className={css.results}>
            <h2 className={css.subtitle}>This is list of search result</h2>

            <ul className={css.foundLocation}>
              {foundLocations.length > 0
                ? (<List locations={foundLocations}/>)
                : (
                  <li className={css.emptySearchMessage}>Nothing found</li>
                )}
            </ul>
          </section>
        );
      }}
    </Query>
  );
};

export default PlacesList;
