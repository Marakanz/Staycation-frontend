import { loginError, loginStart, loginSuccess } from "./userSlice";
import axios from "axios";
import { BASE_URL } from "../utilities/util";


export const LoginAction = async(dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await axios.post(`${BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data));
    } catch (error){
        dispatch(loginError());
    }
}