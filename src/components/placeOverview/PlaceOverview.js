//@flow

import React, { Component } from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from '@reach/router'
import Loading from '../shared/Loading'
import Map from '../map/Map'
import arrowLeft from '../../assets/arrow-left.svg'
import css from './PlaceOverview.module.css'
import globe from '../../assets/globe.svg'
import phone from '../../assets/phone.svg'
import instagram from '../../assets/instagram.svg'

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

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || ''
const mapURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=places`
const mapContainer = {
  height: `100%`,
  borderRadius: `5px`,
  border: `1px solid #ddd`,
  boxShadow: `0 3px 10px rgba(40,40,40,.1)`
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
            // const {prefix, suffix} = venue.photo
            const {contact, url, location} = venue

            console.log(venue);
            
            return (
              <React.Fragment>
                <section className={css.header}>
                  <Link to="/"><img className={css.arrow} src={arrowLeft} alt="arrow left" /></Link>
                  <section>
                    <h1 className={css.venueName}>{venue.name}</h1>
                    <span className={css.venueAddress}>
                      <span>{location.address}</span>               
                    </span>
                  </section>
                  {venue.rating &&
                    <section className={css.ratingContainer}>
                      <span className={css.rating}>
                        {venue.rating}
                      </span>
                    </section>
                  }                
                </section> 
                <section className={css.contacts}>
                  {contact.formattedPhone &&
                    <div className={css.phone}>
                      <a href={`tel:${contact.formattedPhone}`}>
                        <img className={css.contactIcon} src={phone} alt="Phone icon"/>
                      </a>
                    </div>
                  }
                  {url &&
                    <div className={css.url}>
                      <a href={url}>
                        <img className={css.contactIcon} src={globe} alt="Website icon"/>
                      </a>
                    </div>
                  }
                  {contact.instagram &&
                    <div className={css.instagram}>
                      <a href={`https://instagram.com/${contact.instagram}`}>
                        <img className={css.contactIcon} src={instagram} alt="Instagram icon"/>
                      </a>
                    </div>
                  }
                </section>
                <Map 
                  isMarkerShown
                  disableDefaultUI
                  googleMapURL={mapURL}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={mapContainer} />}
                  loadingElement={<div>...Loading</div>}
                  lat={location.lat}
                  lng={location.lng}
                />
              </React.Fragment>         
            )
          }}
        </Query>
      </div>
    )
  }
}
