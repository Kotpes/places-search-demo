//@flow

import React, { Component } from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from '@reach/router'
import Loading from '../shared/Loading'
import arrowLeft from '../../assets/arrow-left.svg'
import css from './PlaceOverview.module.css'

const GET_VENUE_DETAILS = gql`
  query GetVenueInfo($id: String!) {
    venue(id: $id) {
      id
      name
      location {
        address
        lat
        lng
      }
      contact {
        formattedPhone
        instagram
      }
      stats {
        tipCount
      }
      url
      price {
        tier
        message
        currency
      }
      rating
      photo {
        prefix
        suffix
      }
    }
  }
`

type Props = {
  id: string
}

export default class PlaceOverview extends Component<Props> {
  render() {
    const {id} = this.props
    
    return (
      <div className={css.container}>
        <Query
          query={GET_VENUE_DETAILS}
          variables={{id}}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return `Error!: ${error}`;
            const venue = data.venue

            console.log(venue);
            
            return (
              <div className={css.header}>
                <Link to="/"><img className={css.arrow} src={arrowLeft} alt="arrow left" /></Link>
                <section>
                  <h1>{venue.name}</h1>
                  <span className={css.contactInfo}>
                    {venue.location.address}, 
                    <a className={css.phone} href={`tel:${venue.contact.formattedPhone}`}>
                      {venue.contact.formattedPhone}
                    </a>
                  </span>
                </section>
                
              </div>              
            )
          }}
        </Query>
      </div>
    )
  }
}
