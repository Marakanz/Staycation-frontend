// UserBookings.tsx - Fixed to always fetch fresh data
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { RootState } from '../redux/store';
import { GET_USER_BOOKINGS } from '../queries/bookingQueries';
import { DELETE_BOOKING } from '../mutations/bookingMutations';

// Type definitions
interface Hotel {
  id: string;
  name: string;
  location: string;
  price: string;
  image?: string;
  description?: string;
  features?: string[];
}

interface SingleBooking {
  hotel?: Hotel;
  nights?: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId?: string;
  booking?: SingleBooking;
}

const UserBookings = React.memo(() => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);

  // SOLUTION: Force fresh data on every visit
  const { data, loading, error, refetch } = useQuery(GET_USER_BOOKINGS, {
    variables: { userId: currentUser?._id },
    skip: !currentUser?._id,
    errorPolicy: 'all',
    // These options force fresh data from server
    fetchPolicy: 'cache-and-network', // Try cache first, but always fetch from network
    nextFetchPolicy: 'cache-first', // After first fetch, can use cache-first for subsequent queries
    notifyOnNetworkStatusChange: true // Show loading states during network requests
  });

  // Force refetch when component mounts or user changes
  useEffect(() => {
    if (currentUser?._id && refetch) {
      refetch();
    }
  }, [currentUser?._id, refetch]);

  // Delete booking mutation with optimistic UI updates
  const [deleteBooking] = useMutation(DELETE_BOOKING, {
    onCompleted: () => {
      setDeletingBookingId(null);
      // Force refetch to get fresh data
      refetch();
    },
    onError: (error) => {
      console.error('Error deleting booking:', error);
      setDeletingBookingId(null);
      alert('Failed to cancel booking. Please try again.');
    },
    // Update cache optimistically
    update: (cache, { data: deleteResult }) => {
      if (deleteResult?.deleteBooking) {
        const existingBookings = cache.readQuery({
          query: GET_USER_BOOKINGS,
          variables: { userId: currentUser?._id }
        }) as { getUserBookings: Booking[] } | null;

        if (existingBookings) {
          cache.writeQuery({
            query: GET_USER_BOOKINGS,
            variables: { userId: currentUser?._id },
            data: {
              getUserBookings: existingBookings.getUserBookings.filter(
                booking => booking.id !== deleteResult.deleteBooking.id
              )
            }
          });
        }
      }
    }
  });

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setDeletingBookingId(bookingId);
      try {
        await deleteBooking({
          variables: { id: bookingId }
        });
      } catch (error) {
        console.error('Error cancelling booking:', error);
        setDeletingBookingId(null);
      }
    }
  };

  // Manual refresh function
  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error('Error refreshing bookings:', error);
    }
  };

  // Calculate total amount from price and nights
  const calculateTotal = (price: string, nights: string) => {
    const priceNum = parseFloat(price) || 0;
    const nightsNum = parseInt(nights) || 1;
    return priceNum * nightsNum;
  };

  // Get booking status color
  const getStatusColor = (status: string = 'confirmed') => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading state
  if (loading && !data) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="py-6 flex justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <h2 className="text-xl">Loading your bookings...</h2>
        </div>
      </motion.div>
    );
  }

  // Error state
  if (error && !data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="py-6"
      >
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>Error loading bookings: {error.message}</p>
          <button 
            onClick={handleRefresh}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  const bookings: Booking[] = data?.getUserBookings || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-6"
    >
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Welcome back, {currentUser?.firstName || currentUser?.email}
          </p>
        </div>
        
        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          <svg 
            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <svg 
              className="mx-auto h-24 w-24 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-500 mb-6">Start exploring our hotels and make your first booking!</p>
          <Link to="/hotels">
            <button className="btn">Browse Hotels</button>
          </Link>
        </div>
      ) : (
        <>
          {/* Show loading indicator during background refresh */}
          {loading && data && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Updating bookings...
              </p>
            </div>
          )}

          <div className="space-y-6">
            {bookings.map((booking) => {
              const hotel = booking.booking?.hotel;
              const nights = booking.booking?.nights || '1';
              const totalAmount = hotel?.price ? calculateTotal(hotel.price, nights) : 0;
              const status = 'confirmed';
              
              return (
                <div 
                  key={booking.id} 
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 md:h-full">
                      <img 
                        src={hotel?.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                        alt={hotel?.name || 'Hotel'}
                        className="w-full h-32 md:h-full object-cover object-center"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{hotel?.name || 'Hotel Name'}</h3>
                          <p className="text-gray-600 text-sm">{hotel?.location || 'Location'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-600">Guest Name</p>
                          <p className="font-medium">{booking.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Contact</p>
                          <p className="font-medium">{booking.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Nights</p>
                          <p className="font-medium">{nights} night{parseInt(nights) > 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total</p>
                          <p className="font-medium text-teal-600">${totalAmount}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{booking.email}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Price per night: ${hotel?.price || '0'}
                        </p>
                        <div className="flex space-x-2">
                          {hotel?.id && (
                            <Link to={`/hotels/${hotel.id}`}>
                              <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                View Hotel
                              </button>
                            </Link>
                          )}
                          <button 
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={deletingBookingId === booking.id}
                            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingBookingId === booking.id ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cancelling...
                              </span>
                            ) : (
                              'Cancel Booking'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-12 text-center">
        <Link to="/hotels">
          <button className="btn">Book Another Stay</button>
        </Link>
      </div>
    </motion.div>
  );
});

UserBookings.displayName = 'UserBookings';

export default UserBookings;