import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import type { RootState } from "../redux/store";
import { ADD_BOOKING } from "../mutations/bookingMutations";
import Stepper from "../images/stepper.svg";

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface BookingState {
  hotel: {
    id: string;
    name: string;
    location: string;
    price: string;
    image?: string;
    description?: string;
  };
  bookingForm: {
    fullName: string;
    phone: string;
    email: string;
    checkIn: string;
    checkOut: string;
    nights: number;
  };
  totalAmount: number;
  nights: number;
}

const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hotelId } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.user);

  // Get booking details from Info page
  const bookingState: BookingState = location.state;

  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Add booking mutation
  const [addBooking] = useMutation(ADD_BOOKING, {
    onCompleted: (data) => {
      setIsProcessing(false);
      navigate(`/bookingInfo/${hotelId}/completed`, {
        state: {
          booking: data.addBooking,
          hotel: bookingState.hotel,
          totalAmount: bookingState.totalAmount
        }
      });
    },
    onError: (error) => {
      setIsProcessing(false);
      setErrors([`Booking failed: ${error.message}`]);
    }
  });

  // Redirect if no booking data
  useEffect(() => {
    if (!bookingState) {
      navigate(`/hotels/${hotelId}`);
    }
  }, [bookingState, navigate, hotelId]);

  // Initialize card holder name with user's full name
  useEffect(() => {
    if (bookingState?.bookingForm?.fullName) {
      setPaymentData(prev => ({
        ...prev,
        cardHolderName: bookingState.bookingForm.fullName
      }));
    }
  }, [bookingState]);

  const validatePaymentForm = (): boolean => {
    const newErrors: string[] = [];

    // Card validation
    if (!paymentData.cardNumber.replace(/\s/g, '')) {
      newErrors.push("Card number is required");
    } else if (!/^\d{13,19}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
      newErrors.push("Please enter a valid card number");
    }

    if (!paymentData.expiryDate) {
      newErrors.push("Expiry date is required");
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.push("Please enter expiry date in MM/YY format");
    }

    if (!paymentData.cvv) {
      newErrors.push("CVV is required");
    } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
      newErrors.push("Please enter a valid CVV");
    }

    if (!paymentData.cardHolderName.trim()) {
      newErrors.push("Card holder name is required");
    }

    // Billing address validation
    if (!paymentData.billingAddress.street.trim()) {
      newErrors.push("Billing address is required");
    }

    if (!paymentData.billingAddress.city.trim()) {
      newErrors.push("City is required");
    }

    if (!paymentData.billingAddress.zipCode.trim()) {
      newErrors.push("ZIP code is required");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.includes('billing.')) {
      const field = name.split('.')[1];
      setPaymentData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    } else {
      let formattedValue = value;

      // Format card number with spaces
      if (name === 'cardNumber') {
        formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
        if (formattedValue.length > 19) return;
      }

      // Format expiry date
      if (name === 'expiryDate') {
        formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
        if (formattedValue.length > 5) return;
      }

      // Limit CVV to 4 digits
      if (name === 'cvv') {
        formattedValue = value.replace(/\D/g, '');
        if (formattedValue.length > 4) return;
      }

      setPaymentData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmitBooking = async () => {
    if (!validatePaymentForm()) {
      return;
    }

    if (!bookingState) {
      setErrors(["Booking information not found. Please start over."]);
      return;
    }

    setIsProcessing(true);

    try {
      // Create booking with the mutation
      await addBooking({
        variables: {
          name: bookingState.bookingForm.fullName,
          email: bookingState.bookingForm.email,
          phone: bookingState.bookingForm.phone,
          userId: currentUser?._id,
          booking: {
            hotel: {
              id: bookingState.hotel.id,
              name: bookingState.hotel.name,
              location: bookingState.hotel.location,
              price: bookingState.hotel.price,
              image: bookingState.hotel.image,
              description: bookingState.hotel.description
            },
            nights: bookingState.nights.toString()
          }
        }
      });
    } catch (error) {
      setIsProcessing(false);
      console.error('Booking error:', error);
    }
  };

  if (!bookingState) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Booking information not found</h1>
          <Link to="/hotels" className="btn">
            Browse Hotels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex justify-center items-center"
    >
      <div className="md:w-4/6 w-full my-16 px-4">
        <div className="flex justify-center mb-6">
          <img className="w-auto h-auto" src={Stepper} alt="Payment Step" />
        </div>
        
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-semibold mb-4">Payment</h1>
          <p className="text-gray-600 text-center">Complete your booking by providing payment details</p>
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
          <div className="md:flex items-center gap-6">
            <div className="md:w-32 mb-4 md:mb-0">
              <img 
                src={bookingState.hotel.image} 
                alt={bookingState.hotel.name}
                className="w-full h-20 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{bookingState.hotel.name}</h4>
              <p className="text-gray-600 text-sm">{bookingState.hotel.location}</p>
              <p className="text-sm mt-1">
                Guest: {bookingState.bookingForm.fullName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{bookingState.nights} night{bookingState.nights > 1 ? 's' : ''}</p>
              <p className="text-lg font-semibold text-teal-600">${bookingState.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-6">
            {errors.map((error, index) => (
              <div key={index} className="text-sm text-red-600 bg-red-100 p-3 rounded mb-2">
                {error}
              </div>
            ))}
          </div>
        )}

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-6">Payment Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card Details */}
            <div>
              <h4 className="font-medium mb-4">Card Details</h4>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Card Number *</label>
                <input
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  placeholder="1234 5678 9012 3456"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Expiry Date *</label>
                  <input
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    placeholder="MM/YY"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">CVV *</label>
                  <input
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    placeholder="123"
                    type="text"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Card Holder Name *</label>
                <input
                  name="cardHolderName"
                  value={paymentData.cardHolderName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <h4 className="font-medium mb-4">Billing Address</h4>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Street Address *</label>
                <input
                  name="billing.street"
                  value={paymentData.billingAddress.street}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  placeholder="123 Main Street"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">City *</label>
                  <input
                    name="billing.city"
                    value={paymentData.billingAddress.city}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    placeholder="New York"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
                  <input
                    name="billing.state"
                    value={paymentData.billingAddress.state}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    placeholder="NY"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">ZIP Code *</label>
                  <input
                    name="billing.zipCode"
                    value={paymentData.billingAddress.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    placeholder="10001"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Country</label>
                  <select
                    name="billing.country"
                    value={paymentData.billingAddress.country}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center w-full">
          <button 
            onClick={handleSubmitBooking}
            disabled={isProcessing}
            className="btn md:w-5/12 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              `Complete Booking - $${bookingState.totalAmount.toFixed(2)}`
            )}
          </button>

          <Link className="cancel-btn md:w-2/12 justify-items-center" to={`/bookingInfo/${hotelId}`}>
            <button className="text-center">
              Back
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Payments;