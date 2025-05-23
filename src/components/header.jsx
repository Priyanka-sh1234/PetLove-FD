// src/components/Header.jsx
import React, { useState } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { useNavigate, Link } from 'react-router-dom';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();


  // Define the menu for the Login section
  const loginMenu = (
    <Menu
      className="!bg-gradient-to-br from-white via-amber-100 to-yellow-200 w-44 rounded-xl shadow-lg p-2"
    >
      <Menu.Item
        className="!font-semibold !text-gray-800 hover:!text-yellow-600 transition-all duration-200 px-3 py-2 rounded-md hover:bg-yellow-100"
        onClick={() => navigate('/PetOwnerLoginForm')}
      >
        Pet Parent Login
      </Menu.Item>
      <Menu.Item
        className="!font-semibold !text-gray-800 hover:!text-yellow-600 transition-all duration-200 px-3 py-2 rounded-md hover:bg-yellow-100"
        onClick={() => navigate('/ClinicLoginForm')}
      >
        Clinics Login
      </Menu.Item>
    </Menu>

  );

  // Define the menu for the Register section
  const registerMenu = (
    <Menu className="!bg-gradient-to-br from-white via-amber-100 to-yellow-200 w-44 rounded-xl shadow-lg p-2 mb-3">
      <Menu.Item
        className="!font-semibold !text-gray-800 hover:!text-yellow-600 transition-all duration-200 px-3 py-2 rounded-md hover:bg-yellow-100"
        onClick={() => navigate('/Parentregister')}>
        Pet Parent Register
      </Menu.Item>
      <Menu.Item
        className="!font-semibold !text-gray-800 hover:!text-yellow-600 transition-all duration-200 px-3 py-2 rounded-md hover:bg-yellow-100"
         onClick={() => navigate('/clinicRegister')}>
         Clinics Register
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-lg">
      <nav className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}

        <div className="flex items-center space-x-3">
          <img
            src="/Logo2.PNG"
            alt="Logo"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-yellow-400 shadow-md"
          />
          <div className="text-white text-3xl md:text-4xl font-bold tracking-wide hover:text-yellow-400 transition duration-300 cursor-pointer">
            <span className="text-yellow-300">Pet</span>Love
          </div>
        </div>

        {/* Center: Navigation Links */}

        <div className="hidden md:flex items-center space-x-10">
          <Link to="/" className="text-white hover:text-yellow-300 text-lg font-medium transition duration-300">Home</Link>
          <Link to="/clinics" className="text-white hover:text-yellow-300 text-lg font-medium transition duration-300">Clinics</Link>
          <Link to="/contact" className="text-white hover:text-yellow-300 text-lg font-medium transition duration-300">Contact</Link>
          <Dropdown overlay={registerMenu} trigger={['click']}>
            <button className="text-white hover:text-yellow-300 text-lg font-medium transition duration-300">Register</button>
          </Dropdown>
        </div>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Dropdown overlay={loginMenu} trigger={['click']}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              Login
            </button>
          </Dropdown>
          <button
            onClick={() => navigate('/profile')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Profile
          </button>
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
          <button onClick={() => navigate('/')} className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Home</button>
          <button onClick={() => navigate('/clinics')} className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Clinics</button>
          <button onClick={() => navigate('/contact')} className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Contact</button>
          <Dropdown overlay={registerMenu} trigger={['click']}>
            <button className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Register</button>
          </Dropdown>
          <Dropdown overlay={loginMenu} trigger={['click']}>
            <button className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Login</button>
          </Dropdown>
          <button onClick={() => navigate('/profile')} className="w-full text-white py-2 text-left hover:text-yellow-400 transition">Profile</button>
        </div>
      )}
    </header>

  );
};

export default Header;
