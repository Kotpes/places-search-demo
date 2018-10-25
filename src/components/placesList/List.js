//@flow

import * as React from 'react'
import {Link} from '@reach/router'
import type {Venue} from './PlacesList'
import css from './PlacesList.module.css'

type Locations = {
  locations: Array<Venue>
}
const getDistance = (distance: number) => {
  if (distance < 500) {
    return `${distance} meters`
  } else {
    return `${distance / 1000} km`
  }
}
const List = ({locations}: Locations) => {
  return locations.map(location => {    
    const {id, name, location: {distance}} = location
    return (
      <li key={id}>
        <Link to={`places/${id}`}>{name}</Link>
        <span className={css.distance}>{getDistance(distance)}</span>
      </li>   
    )
  })
}


export default List