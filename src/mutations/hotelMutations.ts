import { gql } from "@apollo/client";

// Type definitions
export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: string;
  image?: string;
  description?: string;
  features?: string[];
}

export const ADD_HOTEL = gql`
  mutation addHotel($name: String!, $location: String!, $price: String!, $image: String, $description: String, $features: [String]) {
    addHotel(name: $name, location: $location, price: $price, image: $image, description: $description, features: $features) {
      id
      name
      location
      price
      image
      description
      features
    }
  }
`;

export const UPDATE_HOTEL = gql`
  mutation updateHotel($id: ID!, $name: String, $location: String, $price: String, $image: String, $description: String, $features: [String]) {
    updateHotel(id: $id, name: $name, location: $location, price: $price, image: $image, description: $description, features: $features) {
      id
      name
      location
      price
      image
      description
      features
    }
  }
`;

export const DELETE_HOTEL = gql`
  mutation deleteHotel($id: ID!) {
    deleteHotel(id: $id)
  }
`;