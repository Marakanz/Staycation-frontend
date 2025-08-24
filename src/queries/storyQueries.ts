import { gql } from "@apollo/client";

export const GET_STORIES = gql`
  query getStories {
    stories {
      id
      name
      title
      body
    }
  }
`;

export const GET_STORY = gql`
  query getStory($id: ID!) {
    getStory(id: $id) {
      id
      name
      title
      body
    }
  }
`;