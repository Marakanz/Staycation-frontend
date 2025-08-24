import { gql } from "@apollo/client";

// Auth mutations
export const LOGIN = gql`
  mutation login($input: LoginInput!) {
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
`;

export const REGISTER = gql`
  mutation register($input: RegisterInput!) {
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
`;

// Alternative individual parameter versions
export const REGISTER_USER = gql`
  mutation registerUser($email: String!, $password: String!, $admin: Boolean) {
    registerUser(email: $email, password: $password, admin: $admin) {
      _id
      email
      firstName
      lastName
      isAdmin
      accessToken
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      email
      firstName
      lastName
      isAdmin
      accessToken
      createdAt
    }
  }
`;

// Google Auth
export const GOOGLE_AUTH = gql`
  mutation googleAuth($tokenId: String!) {
    googleAuth(tokenId: $tokenId) {
      success
      message
      user {
        _id
        email
        firstName
        lastName
        isAdmin
        accessToken
        createdAt
      }
      token
    }
  }
`;

// Admin operations
export const SET_USER_ADMIN = gql`
  mutation setUserAdmin($userId: ID!, $isAdmin: Boolean!) {
    setUserAdmin(userId: $userId, isAdmin: $isAdmin) {
      _id
      email
      firstName
      lastName
      isAdmin
      accessToken
      createdAt
    }
  }
`;

// User management
export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $email: String, $password: String) {
    updateUser(id: $id, email: $email, password: $password) {
      _id
      email
      firstName
      lastName
      isAdmin
      accessToken
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// Type definitions for better type safety
export interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  accessToken: string;
  createdAt?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  admin?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

export const EMPTY_USER: User = {
  _id: "",
  email: "",
  isAdmin: false,
  accessToken: "",
};