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
    mutation login($email: String!, $password: String!) {
      login (email: $email, password: $password) {
        _id
        email
        isAdmin
        accessToken
      }
    }
`)

export const REGISTER = gql(`
    mutation register($email: String!, $password: String!, $isAdmin: Boolean!) {
      register (email: $email, password: $password,admin: $isAdmin) {
        email
        isAdmin
        accessToken
      }
    }
`)

