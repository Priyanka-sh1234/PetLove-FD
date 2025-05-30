import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ClipboardCheck, LogOut, User } from 'lucide-react';

const ClinicHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("ClinicName"));
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    toast('LogOut Successful!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Zoom,
    });
    setTimeout(() => navigate('/'), 4000);
  };

  return (
    <>
      <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-lg">
        <nav className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-yellow-400 shadow-md"
            />
            <div
              onClick={() => navigate('/clinicHomePage')}
              className="text-white text-3xl md:text-4xl font-bold tracking-wide hover:text-yellow-400 transition duration-300 cursor-pointer"
            >
              <span className="text-yellow-300">Pet</span>Love
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            <button onClick={() => navigate('/clinicHomePage')} className="text-white hover:text-yellow-300 text-lg font-medium transition duration-300">Home</button>
            <button onClick={() => navigate('/checkAppointments')} className="text-white hover:text-yellow-300 text-lg font-medium transition duration-300">Appointments</button>
            <button onClick={() => navigate('/addReports')} className="text-white hover:text-yellow-300 text-lg font-medium transition duration-300">Add Reports</button>
            <button onClick={() => navigate('/clinicContact')} className="text-white hover:text-yellow-300 text-lg font-medium transition duration-300">Contact</button>
          </div>

          {/* Profile Button */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-white text-lg">Welcome, <span className="text-yellow-400">{user}</span></span>
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Profile
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 bg-gradient-to-br from-white via-amber-100 to-yellow-200 w-48 rounded-xl shadow-lg p-2 z-50">
                <button
                  onClick={() => navigate('/Clinicprofile')}
                  className="w-full text-left px-4 py-2 rounded-md text-gray-800 hover:text-yellow-600 hover:bg-yellow-100 font-semibold transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <User />
                    <span>Show Profile</span>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/clinicAddedReports')}
                  className="w-full text-left px-4 py-2 rounded-md text-gray-800 hover:text-yellow-600 hover:bg-yellow-100 font-semibold transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <ClipboardCheck />
                    <span>Reports Sent</span>
                  </div>
                </button>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 rounded-md text-gray-800 hover:text-yellow-600 hover:bg-yellow-100 font-semibold transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut />
                    <span>Log Out</span>
                  </div>
                </button>
              </div>
              
              )}
            </div>
          </div>

          {/* Hamburger Icon (Mobile) */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl focus:outline-none">
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900 px-4 pb-4 space-y-2 animate-slide-down">
            <button onClick={() => navigate('/clinicHomePage')} className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Home</button>
            <button onClick={() => navigate('/checkAppointments')} className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Appointments</button>
            <button onClick={() => navigate('/addReports')} className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Add Reports</button>
            <button onClick={() => navigate('/clinicContact')} className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Contact</button>

            {/* Mobile Profile */}
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Profile</button>
            {profileMenuOpen && (
              <div className="bg-gradient-to-br from-white via-amber-100 to-yellow-200 rounded-xl shadow-lg p-2 mt-2 space-y-1">
                <button
                  onClick={() => navigate('/Clinicprofile')}
                  className="w-full text-left px-4 py-2 rounded-md text-gray-800 hover:text-yellow-600 hover:bg-yellow-100 font-semibold transition-all"
                >
                Show Profile
                </button>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 rounded-md text-gray-800 hover:text-yellow-600 hover:bg-yellow-100 font-semibold transition-all"
                >
                Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      <ToastContainer />
    </>
  );
};

export default ClinicHeader;
