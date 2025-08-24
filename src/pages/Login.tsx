import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { loginError, loginStart, loginSuccess } from "../redux/userSlice";
import { LOGIN, LoginInput, EMPTY_USER } from "../mutations/userMutations";
import type { RootState } from '../redux/store';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { isFetching, currentUser, error, errorMessage } = useSelector(
    (state: RootState) => state.user
  );

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      dispatch(loginSuccess(data.login));
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
      dispatch(loginError(error.message || "Login failed"));
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser && currentUser._id && currentUser._id !== "") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      dispatch(loginError("Please fill in all fields"));
      return;
    }

    dispatch(loginStart());

    const loginInput: LoginInput = {
      email: email.trim(),
      password: password,
    };

    try {
      await loginMutation({
        variables: {
          input: loginInput
        },
      });
    } catch (error) {
      // Error is handled by onError callback
    }
  };

  const isLoading = isFetching || loading;

  return (
    <div className="w-full register">
      <div className="w-3/4 md:w-1/4 bg-gray-200 p-3 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center font-medium mb-6">Sign In</h1>
        
        {error && errorMessage && (
          <div className="text-sm text-red-600 text-center mb-4 p-2 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex mt-4 flex-col items-center">
          <input
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
            required
            disabled={isLoading}
          />
          
          <div className="relative w-full">
            <input
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-600"
              disabled={isLoading}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 w-3/6 mt-4 text-white rounded transition-colors ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        <div className="flex justify-between items-center my-3">
          <p className="text-sm underline cursor-pointer" onClick={() => console.log("Forgot password clicked")}>
            Forgot password?
          </p>
          <Link to="/user/register">
            <p className="text-sm underline">Sign up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;