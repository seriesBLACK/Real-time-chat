import Cookies from "universal-cookie";
import { useState } from 'react';
import Oath from '../components/Oath';
import Home from "./Home";

export default function SignUp() {

  const cookie = new Cookies();
  const [isAuth, setIsAuth] = useState(cookie.get('auth-token'));

  if (!isAuth) {
    return (
      <>
        <Oath setIsAuth={setIsAuth} />
      </>
    )
  }
  return (
    <>
      <Home />
    </>
  )
}
