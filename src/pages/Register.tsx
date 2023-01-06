import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { REGISTER } from "../mutations/hotelMutations";
import { useNavigate } from 'react-router';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const [register, { data, loading }] = useMutation(REGISTER, {
    onError(error, clientOptions) {
      console.log(error.message);
      console.log(error.networkError);
      console.log(error.graphQLErrors);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await register({
      variables: {
        email,
        password,
        isAdmin: false,
      },
    });
    console.log(data);
    data ? navigate("/auth") : console.log("Error try again");
  };
  return (
    <div className="w-full register">
      <div className="w-4/5 md:w-2/5 bg-gray-200 p-5">
        <h1 className="text-2xl text-center font-medium">CREATE AN ACCOUNT</h1>
        <form className="flex mt-5 flex-col items-center">
          <input
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            className="form-input"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1 className="my-5 text-sm">
            {" "}
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </h1>
          <button 
          className="px-4 py-2 w-4/6 bg-teal-600 text-white"
          onClick={(e) => handleSubmit(e)}
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
