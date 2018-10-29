//@flow

import * as React from 'react'
import {Link} from '@reach/router'
import type {Venue} from './PlacesList'

type Locations = {
  locations: Array<Venue>
}

const List = ({locations}: Locations) => {
  return locations.map(location => {    
    const {id, name} = location
    
    return (
      <li key={id}>
        <Link to={`places/${id}`}>{name}</Link>
      </li>   
    )
  })
}


export default List