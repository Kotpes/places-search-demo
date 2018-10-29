import React from 'react'
import TestRenderer from 'react-test-renderer'
import {MockedProvider} from 'react-apollo/test-utils'
import PlaceOverview, {GET_VENUE_DETAILS} from './PlaceOverview'
import Loading from '../shared/Loading'

const mocks = [
  {
    request: {
      query: GET_VENUE_DETAILS,
      variables: {
        id: "4e6910b01f6eb06ee893521c"
      }
    },
    result: {
      data: {
        venue: {
          id: "4e6910b01f6eb06ee893521c",
          name: "Hoshito",
          location: {
            address: "Arkadiankatu 21",
            lat: 60.171347,
            lng: 24.926682,
            __typename: "Location"
          },
          contact: {
            formattedPhone: "+358 50 4325063",
            instagram: null,
            __typename: "Contact"
          },
          stats: {
            tipCount: 20,
            __typename: "Stats"
          },
          url: "http://www.hoshito.fi",
          price: {
            tier: 2,
            message: "Moderate",
            currency: "€",
            __typename: "Price"
          },
          rating: 8.5,
          photo: {
            prefi: "https://fastly.4sqi.net/img/general/",
            suffix: "/927816_3ZxtjU4G6JFSXTZ2Tm7JmPsPH48IeUywiL3NVOiQBD4.jpg",
            __typenam: "Photo"
          },
          __typename: "CompleteVenue"
        }
      },
    },
  },
];


it(`Renders with loading state`, () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PlaceOverview />
    </MockedProvider>
  )
  expect(component.root.findByType(Loading)).toBeDefined()  
})