import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Cookies from "universal-cookie";
import "../css files/signUp.css";
import { auth, provider, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { useState } from "react";



export default function Oath(props) {
    const cookie = new Cookies();
    const { setIsAuth } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });


    const { name, email, password } = formData;
    function onChange(event) {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    };



    const signUpWithGoogle = async (e) => {
        e.preventDefault();
        try {

            const result = await signInWithPopup(auth, provider);
            cookie.set('auth-token', result.user.refreshToken);
            console.log('setIsAuth(true);')
            setIsAuth(true);
        } catch (error) {
            console.log(error)
        }
    };



    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredatial = createUserWithEmailAndPassword(auth, email, password);
            const user = (await userCredatial).user;
            cookie.set('auth-token', user.refreshToken);
            setIsAuth(true);
            updateProfile(auth.currentUser, {
                displayName: name,
            });
            await setDoc(doc(db, "users", user.uid), formData)
            console.log("sign-up");
        } catch (error) {
            console.error(error)
        }
    };


    return (
        <div className='signUpContainer'>
            <h2>Sign up to enter a family friendly chat app </h2>
            <form className='signUpForm' onSubmit={onSubmit} >
                <input type="text" id='name' placeholder='Enter a Nick-name' value={name} onChange={onChange} />
                <input type="email" placeholder='enter an email ' id='email' value={email} onChange={onChange} />
                <div className="passwordHolder">

                    <input value={password} onChange={onChange} type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' className="password" />
                    <AiFillEye onClick={() => { setShowPassword(!showPassword) }} className="AiFillEye" />
                </div>

                <button className='signInbtn' type="submit">Sign up</button>
                <p>or</p>
                <button type='button' className='googleBtn' onClick={signUpWithGoogle}><FcGoogle className="googleIcon" /> Sign up with google </button>
                <p>Already have an account ?

                    <Link to='sign-in' className="signLink">
                        <span > Sign in</span>
                    </Link>
                </p>

            </form>
        </div>

    )
}
