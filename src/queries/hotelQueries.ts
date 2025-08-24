import { gql } from "@apollo/client";
    // hotels: [Hotel!]!
    // getHotel(id: ID!): Hotel!
    
  //   type Hotel {
  //   id: ID
  //   name: String
  //   location: String
  //   price: String
  //   image: String
  //   description: String
  //   features: [String]
  // }

  // input inputHotel {
  //   id: ID
  //   name: String
  //   location: String
  //   price: String
  //   image: String
  //   description: String
  //   features: [String]
  // }
   
    

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



