import { gql } from "@apollo/client";

export const ADD_HOTEL = gql(`
    mutation addHotel($name: String!, $location: String!, $price: String!, $image: String, $desc: String){
        addHotel(name: $name, location: $location, price: $price, image: $image, desc: $desc){
            name
            location
            price
            image
            description
        }
    }
`);

export const LOGIN = gql(`
    input LoginInput {
      email: String!
      password: String!
  }
    mutation login($input: LoginInput!){
    login(input: $input) {
      _id
      email
      firstName
      lastName
      isAdmin
      accessToken
      createdAt
    }
}
`)

export const REGISTER = gql(`
    input RegisterInput {
      email: String!
      password: String!
      firstName: String
      lastName: String
      admin: Boolean
  }
      
    mutation register($input: RegisterInput!){
    register(input: $input) {
      _id
      email
      firstName
      lastName
      isAdmin
      accessToken
      createdAt
    }
}
`)

export const emptyUser = {
  _id: "None",
  email: "None",
  isAdmin: false,
  accessToken: "None"
}

