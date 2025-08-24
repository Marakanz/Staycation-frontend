import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER, RegisterInput } from "../mutations/userMutations";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [registerMutation, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      console.log("Registration successful:", data);
      // Redirect to login page after successful registration
      navigate("/user", { 
        state: { 
          message: "Registration successful! Please sign in." 
        }
      });
    },
    onError: (error) => {
      console.error("Registration error:", error);
      setErrors([error.message || "Registration failed"]);
    },
  });

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.email.trim()) {
      newErrors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push("Please enter a valid email address");
    }

    if (!formData.password) {
      newErrors.push("Password is required");
    } else if (formData.password.length < 6) {
      newErrors.push("Password must be at least 6 characters long");
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push("Passwords do not match");
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
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const registerInput: RegisterInput = {
      email: formData.email.trim(),
      password: formData.password,
      firstName: formData.firstName.trim() || undefined,
      lastName: formData.lastName.trim() || undefined,
      admin: false,
    };

    try {
      await registerMutation({
        variables: {
          input: registerInput
        },
      });
    } catch (error) {
      // Error is handled by onError callback
    }
  };

  return (
    <div className="w-full register">
      <div className="w-4/5 md:w-2/5 bg-gray-200 p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center font-medium mb-6">CREATE AN ACCOUNT</h1>
        
        {errors.length > 0 && (
          <div className="mb-4">
            {errors.map((error, index) => (
              <div key={index} className="text-sm text-red-600 text-center mb-2 p-2 bg-red-100 rounded">
                {error}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex mt-5 flex-col items-center">
          <div className="w-full flex flex-col md:flex-row gap-2">
            <input
              className="form-input flex-1"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              type="text"
              placeholder="First Name (optional)"
              disabled={loading}
            />
            <input
              className="form-input flex-1"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              type="text"
              placeholder="Last Name (optional)"
              disabled={loading}
            />
          </div>

          <input
            className="form-input"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            placeholder="Email"
            required
            disabled={loading}
          />

          <div className="relative w-full">
            <input
              className="form-input"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-600"
              disabled={loading}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            className="form-input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
            disabled={loading}
          />

          <p className="my-5 text-sm text-center">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 w-4/6 text-white rounded transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/user" className="underline text-teal-600 hover:text-teal-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;