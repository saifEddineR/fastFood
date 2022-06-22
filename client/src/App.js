import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import MainLayout from './layout/MainLayout';
import { ThemeProvider } from '@mui/material/styles';
import themes from './themes';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './slices/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);
  return (
    <ThemeProvider theme={themes(customization)}>
      <div className='App'>
        {pathname !== '/free' && pathname !== '/free/dashboard/default' && <Navbar />}
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
            <Route path='/free' element={<MainLayout />}>
              <Route path='' element={<Dashboard />} />
              <Route path='dashboard/default' element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
