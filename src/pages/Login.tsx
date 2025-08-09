import { Link } from "react-router-dom"
import { loginError, loginStart, loginSuccess } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from '../redux/store'
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../mutations/hotelMutations";
import { emptyUser } from "../mutations/hotelMutations";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { isFetching, currentUser } = useSelector((state: RootState) => state);

    const [login, {data, loading}] = useMutation(LOGIN, {
        onError(error, clientOptions) {
            console.log(error.message);
            console.log(error.networkError);
            console.log(error.graphQLErrors);
          },
    })

    interface loginData {
        email: string
        password: string

    }
    

    const LoginAction = async(dispatch: any, user: loginData) => {
        dispatch(loginStart());
        try{
            await login({
                variables: {
                    email: user.email,
                    password: user.password
                }
            })
            console.log(data);
            if (data !== undefined) {
                dispatch(loginSuccess(data.login));
            }
        } catch (error){
            dispatch(loginError());
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
       const data2 = {
            email: email,
            password: password
       }
        await LoginAction(dispatch, data2);
        console.log(currentUser);
        console.log(emptyUser)
        // currentUser === emptyUser ?   navigate("/auth") : navigate("/");
    }

  return (
    <div>
        <div className='w-full register'>
            <div className='w-3/4 md:w-1/4 bg-gray-200 p-3'>
                <h1 className='text-2xl text-center font-medium'>Sign In</h1>
                <form className='flex mt-4 flex-col items-center'>
                    <input className='form-input' onChange={(e) => setEmail(e.target.value)}  type="email" placeholder='Email' />
                    <input className='form-input' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />

                    <button onClick={(e) => handleSubmit(e)} className={false ? "px-4 py-2 w-3/6 mt-4 bg-teal-600 text-white cursor-not-allowed" : "btn"}>SIGN IN</button>
                </form>
                <div className='flex justify-between items-center my-3'>
                    <p className='text-sm underline' id='#password'>Forgot password?</p>
                    <Link to="/register">
                        <p className='text-sm underline' id='#signup'>Sign up</p>
                    </Link>
                </div>
                {/* { error && <div className='text-sm text-red-600'> Something went wrong!!!</div>} */}
            </div>
        </div>
    </div>
  );
};

export default Login