import { gql } from "@apollo/client";

// Complete the remaining hotel mutations

// Type definitions
export interface SingleBookingInput {
  hotel?: {
    id?: string;
    name?: string;
    location?: string;
    price?: string;
    image?: string;
    description?: string;
    features?: string[];
  };
  nights?: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId?: string;
  booking?: {
    hotel?: {
      id?: string;
      name?: string;
      location?: string;
      price?: string;
      image?: string;
      description?: string;
      features?: string[];
    };
    nights?: string;
  };
}

export const ADD_BOOKING = gql`
  mutation addBooking($name: String!, $email: String!, $phone: String!, $userId: String, $booking: singleBookingInput) {
    addBooking(name: $name, email: $email, phone: $phone, userId: $userId, booking: $booking) {
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

export const UPDATE_BOOKING = gql`
  mutation updateBooking($id: ID!, $name: String, $email: String, $phone: String, $userId: String, $booking: singleBookingInput) {
    updateBooking(id: $id, name: $name, email: $email, phone: $phone, userId: $userId, booking: $booking) {
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

export const DELETE_BOOKING = gql`
  mutation deleteBooking($id: ID!) {
    deleteBooking(id: $id)
  }
`;