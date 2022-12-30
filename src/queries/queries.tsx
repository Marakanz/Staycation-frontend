import { gql } from "@apollo/client";

export const GET_HOTELS = gql`
  query getHotels {
    hotels {
      id
      name
      location
      price
      image
      description
    }
  }
`;

export const GET_HOTEL = gql`
    query getHotel($id: ID!) {
      getHotel (id: $id) {
        id
        name
        location
        price
        image
        description
      }
    }
`



