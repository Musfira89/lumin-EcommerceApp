import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Home} from './Components/Home';
import Login from './Auth/Login';
import Signup from './Auth/Signup';


function App() {

  return (
    <Router>
       <Routes>
          {/* Landing Page Routes */}
          <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
       </Routes>
    </Router>
   

          
  )
}

export default App
