import { gql } from "@apollo/client";

export const GET_BOOKINGS = gql`
  query getBookings {
    bookings {
      id
      name
      email
      phone
      userId
      booking {
        hotel {
          id
          name
          location
          price
          image
          description
          features
        }
        nights
      }
    }
  }
`;

export const GET_BOOKING = gql`
  query getBooking($id: ID!) {
    getBooking(id: $id) {
      id
      name
      email
      phone
      userId
      booking {
        hotel {
          id
          name
          location
          price
          image
          description
          features
        }
        nights
      }
    }
  }
`;

export const GET_USER_BOOKINGS = gql`
  query getUserBookings($userId: ID!) {
    getUserBookings(userId: $userId) {
      id
      name
      email
      phone
      userId
      booking {
        hotel {
          id
          name
          location
          price
          image
          description
          features
        }
        nights
      }
    }
  }
`;