import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux';
import PublicRoute from './components/PublicRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UpdateProfile from './pages/UpdateProfile';
import Loader from './components/Loader';
import ListingPage from './pages/ListingPage';
import UserVideos from './pages/UserVideos';

function App() {
  // const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      <Loader />
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listing-page"
          element={
            <ProtectedRoute>
              <ListingPage />
            </ProtectedRoute>
          }
        />
      <Route 
        path="/:userName"
        element={
          <ProtectedRoute>
            <UserVideos />
          </ProtectedRoute>
        } />
      </Routes>

    </BrowserRouter>
  )
}

export default App
