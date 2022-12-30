import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { LoginAction } from '../redux/action';
import { useNavigate } from 'react-router';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { error, isFetching, currentUser } = useSelector(state => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        LoginAction(dispatch, data);
        currentUser ?  navigate("/") : navigate("/login");
    }

    return (
        <div>
            <div className='home register'>
                <div className='w-3/4 md:w-1/4 bg-gray-200 p-3'>
                    <h1 className='text-2xl text-center font-medium'>SIGN IN</h1>
                    <form className='flex mt-4 flex-col items-center'>
                        <input className='form-input' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                        <input className='form-input' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />

                        <button onClick={(e)=> handleSubmit(e)} className={isFetching ? "px-4 py-2 w-3/6 mt-4 bg-teal-600 text-white cursor-not-allowed" : "px-4 py-2 w-3/6 mt-4 bg-teal-600 text-white"}>SIGN IN</button>
                    </form>
                    <div className='flex justify-between items-center'>
                        <p className='text-sm underline my-4' href='#password'>Forgot password?</p>
                        <Link to="/signup">
                            <p className='text-sm underline' href='#signup'>Sign up</p>
                        </Link>
                    </div>
                    { error && <div className='text-sm text-red-600'> Something went wrong!!!</div>}
                </div>
            </div>
        </div>
    )
}

export default Login