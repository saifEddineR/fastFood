import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Foods from './pages/Foods';
import AboutUs from './pages/AboutUs';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProtectedRouteAdmin from './components/ProtectedRoute';
import ProtectedRouteUser from './components/ProtectedRouteUser';
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/foods' element={<Foods />} />
        <Route element={<ProtectedRouteUser />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route element={<ProtectedRouteAdmin />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
