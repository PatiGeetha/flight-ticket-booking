import React, { useState } from 'react';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase";
import { Routes, Route, Link } from 'react-router-dom';
import { PlaneTakeoff, Github } from 'lucide-react';
import FlightSearch from './components/FlightSearch';
import FlightResults from './components/FlightResults';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
      console.log("Successfully logged in:", result.user.displayName);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <PlaneTakeoff size={28} />
            </div>
            <span>Aero<span className="text-gradient">Book</span></span>
          </Link>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-outline">My Bookings</button>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 500 }}>Hi, {user.displayName?.split(' ')[0]}</span>
                <button className="btn btn-primary" onClick={handleLogout}>Sign Out</button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleGoogleSignIn}>Sign In</button>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content container">
        <Routes>
          <Route path="/" element={<FlightSearch />} />
          <Route path="/results" element={<FlightResults />} />
          <Route path="/book/:flightId" element={<BookingForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
