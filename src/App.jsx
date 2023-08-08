import './index.css';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';



function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route index element={<SignUp />} />
        <Route path='sign-in' element={<SignIn />} />

      </Routes>

    </>
  )
}

export default App
