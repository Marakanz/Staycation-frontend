import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Stepper from "../images/stepper.svg"
import { GET_HOTEL } from "../queries/hotelQueries";
import { EMPTY_USER } from "../mutations/userMutations";

interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  nights: number;
}

interface BookingData {
  checkIn: string;
  checkOut: string;
  checkInFormatted: string;
  checkOutFormatted: string;
  nights: number;
  pricePerNight: string;
  totalPrice: number;
  hotel?: {
    id: string;
    name: string;
    location: string;
    price: string;
    image?: string;
    description?: string;
  };
}

const Info = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  
  // Get booking details from SingleHotel page
  const bookingDetails: BookingData = location.state || {};
  
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    checkIn: bookingDetails.checkIn || '',
    checkOut: bookingDetails.checkOut || '',
    nights: bookingDetails.nights || 1
  });
  
  const [errors, setErrors] = useState<string[]>([]);
  const { isFetching, currentUser } = useSelector((state: RootState) => state.user);
  const { data, loading } = useQuery(GET_HOTEL, {
    variables: { id: id }
  });

  // Initialize form data with user info
  React.useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        fullName: currentUser.firstName && currentUser.lastName 
          ? `${currentUser.firstName} ${currentUser.lastName}` 
          : currentUser.email || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  // Update form data when booking details change
  React.useEffect(() => {
    if (bookingDetails.checkIn && bookingDetails.checkOut) {
      setFormData(prev => ({
        ...prev,
        checkIn: bookingDetails.checkIn,
        checkOut: bookingDetails.checkOut,
        nights: bookingDetails.nights || 1
      }));
    }
  }, [bookingDetails]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.fullName.trim()) {
      newErrors.push("Full name is required");
    }

    if (!formData.phone.trim()) {
      newErrors.push("Phone number is required");
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.push("Please enter a valid phone number");
    }

    if (!formData.email.trim()) {
      newErrors.push("Email is required");
    }

    if (!formData.checkIn || !formData.checkOut) {
      newErrors.push("Please select check-in and check-out dates");
    }

    if (formData.nights < 1) {
      newErrors.push("Please select at least 1 night");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleContinue = () => {
    if (!validateForm()) {
      return;
    }

    // Use booking details from SingleHotel page or fallback to current data
    const hotelPrice = bookingDetails.pricePerNight || data?.getHotel?.price || '0';
    const parsedHotelPrice = parseFloat(hotelPrice.toString().replace(/[^0-9.]/g, '')) || 0;
    const totalAmount = parsedHotelPrice * formData.nights;
    
    // Pass comprehensive booking data to payment page
    navigate(`/bookingInfo/${id}/payment`, {
      state: {
        hotel: bookingDetails.hotel || data?.getHotel,
        bookingForm: formData,
        totalAmount,
        nights: formData.nights,
        checkInFormatted: bookingDetails.checkInFormatted,
        checkOutFormatted: bookingDetails.checkOutFormatted,
        pricePerNight: hotelPrice
      }
    });
  };
  
  console.log('GraphQL Data:', data);
  
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <h1 className="text-2xl">Loading hotel details...</h1>
        </div>
      </div>
    );
  }

  if (!data?.getHotel && !bookingDetails.hotel) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Hotel not found</h1>
          <Link to="/hotels" className="btn">
            Browse Hotels
          </Link>
        </div>
      </div>
    );
  }

  // Use hotel data from booking details or GraphQL query
  const hotel = bookingDetails.hotel || data?.getHotel;
  const pricePerNight = bookingDetails.pricePerNight || hotel?.price || '0';
  
  // Safe price parsing with fallbacks
  const parsedPrice = parseFloat(pricePerNight.toString().replace(/[^0-9.]/g, '')) || 0;
  const validNights = formData.nights && formData.nights > 0 ? formData.nights : 1;
  const totalPrice = parsedPrice * validNights;

  const isAuthenticated = currentUser && 
    currentUser._id && 
    currentUser._id !== "" && 
    currentUser._id !== EMPTY_USER._id;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="md:w-4/6 my-16 px-4">
        <div className="flex justify-center mb-6">
          <img className="w-auto h-auto" src={Stepper} alt="Booking Progress" />
        </div>
        <div className="flex flex-col items-center mb-5">
          <h1 className="md:text-4xl text-2xl font-semibold mb-4">
            Booking Information
          </h1>
          <p className="md:text-base text-gray-400 text-center">
            Please fill up the blank fields below
          </p>
        </div>

        {/* Display booking dates if available */}
        {bookingDetails.checkInFormatted && bookingDetails.checkOutFormatted && (
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-teal-800">
              <span className="font-semibold">Selected Dates:</span> {' '}
              {bookingDetails.checkInFormatted} to {bookingDetails.checkOutFormatted}
              <span className="ml-2">({formData.nights} night{formData.nights > 1 ? 's' : ''})</span>
            </p>
          </div>
        )}

        {errors.length > 0 && (
          <div className="mb-6 mx-auto max-w-md">
            {errors.map((error, index) => (
              <div key={index} className="text-sm text-red-600 text-center mb-2 p-2 bg-red-100 rounded">
                {error}
              </div>
            ))}
          </div>
        )}

        <div className="md:flex">
          <div className="md:w-1/2 md:border-r py-5 flex justify-center px-4 border-gray-200">
            <div className="w-full max-w-sm">
              <img 
                src={hotel?.image} 
                className="w-full h-48 rounded-2xl mb-3 object-cover" 
                alt={hotel?.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300?text=Hotel+Image';
                }}
              />
              <div className="flex justify-between items-start">
                <div className="w-3/5">
                  <h2 className="text-base font-semibold">{hotel?.name}</h2>
                  <p className="text-gray-400 font-thin text-sm">
                    {hotel?.location}
                  </p>
                  {formData.checkIn && formData.checkOut && (
                    <div className="mt-3 text-xs text-gray-600 space-y-1">
                      <p><span className="font-medium">Check-in:</span> {bookingDetails.checkInFormatted || formData.checkIn}</p>
                      <p><span className="font-medium">Check-out:</span> {bookingDetails.checkOutFormatted || formData.checkOut}</p>
                      <p><span className="font-medium">Duration:</span> {formData.nights} night{formData.nights > 1 ? 's' : ''}</p>
                    </div>
                  )}
                </div>
                <div className="w-2/5 text-sm text-right">
                  <p className="font-semibold">${parsedPrice.toFixed(2)} per night</p>
                  {formData.nights > 0 && (
                    <div className="mt-2">
                      <p className="text-gray-600 text-xs">
                        ${parsedPrice.toFixed(2)} × {formData.nights} night{formData.nights > 1 ? 's' : ''}
                      </p>
                      <p className="text-teal-600 font-bold text-lg">
                        ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center px-4 py-5">
            <div className="w-full md:w-4/6">
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Full Name *</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  placeholder="Enter your full name"
                  type="text"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Phone Number *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  placeholder="Enter your phone number"
                  type="tel"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700">Email Address</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-200 rounded border cursor-not-allowed"
                  placeholder="Email"
                  type="email"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Date selection notice */}
              {!bookingDetails.checkIn && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Note:</span> Please go back to the hotel page to select your check-in and check-out dates.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center w-full mt-12">
          <button 
            onClick={handleContinue}
            className="btn md:w-5/12 mb-4"
            disabled={!formData.checkIn || !formData.checkOut}
          >
            Continue to Payment - ${totalPrice.toFixed(2)}
          </button>

          <Link to={`/hotels/${id}`}>
            <button className="cancel-btn md:w-5/12">
              Back to Hotel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;