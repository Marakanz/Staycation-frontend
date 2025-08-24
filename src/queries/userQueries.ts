import { gql } from "@apollo/client";

// Type definitions
export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

export interface User {
  _id: string;
  email: string;
  isAdmin?: boolean;
  accessToken?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  googleId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      _id
      email
      isAdmin
      accessToken
      firstName
      lastName
      image
      googleId
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      email
      isAdmin
      accessToken
      firstName
      lastName
      image
      googleId
      createdAt
      updatedAt
    }
  }
`;

export const GET_AUTH_STATUS = gql`
  query getAuthStatus {
    getAuthStatus {
      success
      message
      user {
        _id
        email
        isAdmin
        accessToken
        firstName
        lastName
        image
        googleId
        createdAt
        updatedAt
      }
      token
    }
  }
`;