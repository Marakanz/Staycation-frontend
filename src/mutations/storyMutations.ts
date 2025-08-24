import { gql } from "@apollo/client";

// Type definitions
export interface Story {
  id: string;
  name: string;
  title: string;
  body: string;
}

export const ADD_STORY = gql`
  mutation addStory($name: String!, $title: String!, $body: String!) {
    addStory(name: $name, title: $title, body: $body) {
      id
      name
      title
      body
    }
  }
`;

export const UPDATE_STORY = gql`
  mutation updateStory($id: ID!, $name: String, $title: String, $body: String) {
    updateStory(id: $id, name: $name, title: $title, body: $body) {
      id
      name
      title
      body
    }
  }
`;

export const DELETE_STORY = gql`
  mutation deleteStory($id: ID!) {
    deleteStory(id: $id)
  }
`;