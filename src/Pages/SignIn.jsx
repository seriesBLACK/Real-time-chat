import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import Cookies from "universal-cookie";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
    const cookie = new Cookies();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const naviagte = useNavigate();


    const { email, password } = formData;
    function onChange(event) {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    };


    async function onSubmit(e) {
        e.preventDefault();
        try {
            const userInfo = await signInWithEmailAndPassword(auth, email, password);
            if (userInfo) {
                cookie.set('auth-token', userInfo.user.refreshToken)
                naviagte('/');
            };

        } catch (error) {
            console.log(error)

        };

    };


    const signUpWithGoogle = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider);
            cookie.set('auth-token', result.user.refreshToken);
            naviagte('/');
        } catch (error) {
            console.log(error)
        };
    };


    return (
        <div className='signUpContainer'>
            <form className='signUpForm' onSubmit={onSubmit} >
                <input type="email" placeholder='enter an email ' id='email' value={email} onChange={onChange} />
                <div className="passwordHolder">

                    <input value={password} onChange={onChange} type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' className="password" />
                    <AiFillEye onClick={() => { setShowPassword(!showPassword) }} className="AiFillEye" />
                </div>

                <button className='signInbtn' type="submit">Sign in</button>
                <p>or</p>
                <button type='button' className='googleBtn' onClick={signUpWithGoogle}><FcGoogle className="googleIcon" /> Sign in with google </button>



            </form>
        </div>
    )
}
