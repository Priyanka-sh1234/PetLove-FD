// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import {GoogleOAuthProvider} from "@react-oauth/google"
import ProtectedRoute from '../src/components/ProtectedRoute.jsx'; 




import './pages/index.css'

// import App from './pages/App.jsx'

import Home from './pages/Home.jsx'

import Loginform from './pages/Login.jsx'

import ParentRegisterForm from './pages/Parentregister.jsx'

import Contact from './pages/contact.jsx'

import Clinics from './pages/clinics.jsx'

import Profile from './pages/Profile.jsx'

import PetOwnerLoginForm from './pages/PetOwnerLogin.jsx'

import ClinicLoginForm from './pages/clinicLoginForm.jsx'

import ParentHomePage from './pages/ParentHomePage.jsx'

import ParentContact from './pages/Parentcontact.jsx'

import ParentProfile from './pages/ParentProfile.jsx';

import FindClinics from './pages/ParentClinics.jsx'

import ClinicRegisterForm from './pages/clinicRegister.jsx'

import ClinicHomePage from './pages/ClinicHomePage.jsx'

import CheckAppointments from './pages/checkAppointments.jsx'

import AddReports from './pages/addreports.jsx'

import ClinicContact from './pages/cliniccontact.jsx'

import BookClinic from './pages/BookClinic.jsx';

import PageNotFound from './pages/NotFound.jsx';

import ClinicProfilePage from './pages/clinicProfile.jsx';

import MiddlewareExample from './pages/middlewareExample..jsx';

import ParentBookClinic from './pages/ParentBookClinic.jsx';

import ParentFindClinics from './pages/ParentClinics.jsx';

import AddClinic from './pages/AddClinicsExample.jsx';

import PetParentAppointments from './pages/petAppointments.jsx';

import Yourpetreports from './pages/Yourpetreports.jsx';
import Revision from './pages/Revision.jsx';
import ClinicReportsSent from './pages/ClinicReportsSent.jsx';






const GoogleClinicWrapper= ()=>{
  return(
    <GoogleOAuthProvider clientId='410732524953-neg202sc9fjogiaail00nkqiif05ggj1.apps.googleusercontent.com'>
        <ClinicRegisterForm />
    </GoogleOAuthProvider>
  )
}


const GoogleClinicLoginWrapper =() =>{
  return(
    <GoogleOAuthProvider clientId='410732524953-neg202sc9fjogiaail00nkqiif05ggj1.apps.googleusercontent.com'>
      <ClinicLoginForm />
    </GoogleOAuthProvider>
  )
}


const GooglePrentLoginWrapper =()=>{
  return(
    <GoogleOAuthProvider clientId='410732524953-neg202sc9fjogiaail00nkqiif05ggj1.apps.googleusercontent.com'>
      <PetOwnerLoginForm />
    </GoogleOAuthProvider>
  )
}


const GoogleParentWrapper= ()=>{
  return(
    <GoogleOAuthProvider clientId='410732524953-neg202sc9fjogiaail00nkqiif05ggj1.apps.googleusercontent.com'>
        <ParentRegisterForm />
    </GoogleOAuthProvider>
  )
}

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <Routes>

    <Route path='/' element={<Home />} />
    <Route path="/login" element={<Loginform />} />
    <Route path='/clinicLoginForm' element={<GoogleClinicLoginWrapper />} />
    <Route path='/petOwnerLoginForm' element={<GooglePrentLoginWrapper />} />
    <Route path='/Parentregister' element={<GoogleParentWrapper />} />
    <Route path='/clinicregister' element={<GoogleClinicWrapper />} />
    <Route path='/clinics' element={<Clinics/>} />
    <Route path='/contact' element={<Contact />} />

    
    <Route path='/ParentHomePage' element={
      <ProtectedRoute><ParentHomePage /></ProtectedRoute>
    }/>

    <Route path='/profile' element={<Profile />} />

    <Route path='/clinics' element={
      <ProtectedRoute><Clinics /></ProtectedRoute>
    } />

    <Route path='/ParentBookClinic' element={
      <ProtectedRoute><ParentBookClinic /></ProtectedRoute>
    } />

    <Route path='/Parentfindclinics' element={
      <ProtectedRoute><ParentFindClinics /></ProtectedRoute>
    } />

    <Route path='/ClinicHomePage' element={
      <ProtectedRoute><ClinicHomePage /></ProtectedRoute>
    } />

    <Route path='/addReports' element={
      <ProtectedRoute><AddReports /></ProtectedRoute>
    } />

    <Route path='/checkAppointments' element={
      <ProtectedRoute><CheckAppointments /></ProtectedRoute>
    } />

    <Route path='/PetParentAppointments' element={
      <ProtectedRoute><PetParentAppointments /></ProtectedRoute>
    } />

    <Route path='/Yourpetreports' element={
      <ProtectedRoute><Yourpetreports /></ProtectedRoute>
    } />

<Route path='/clinicAddedReports' element={
      <ProtectedRoute><ClinicReportsSent /></ProtectedRoute>
    } />

    <Route path='/parentContact' element={
      <ProtectedRoute><ParentContact /></ProtectedRoute>
    } />

    <Route path='/parentProfile' element={
      <ProtectedRoute><ParentProfile /></ProtectedRoute>
    } />

    <Route path='/findClinics' element={
      <ProtectedRoute><FindClinics /></ProtectedRoute>
    } />

    <Route path='/Clinicprofile' element={
      <ProtectedRoute><ClinicProfilePage /></ProtectedRoute>
    } />

    <Route path='/ClinicContact' element={
      <ProtectedRoute><ClinicContact /></ProtectedRoute>
    } />

    <Route path='/BookClinic' element={
      <ProtectedRoute><BookClinic /></ProtectedRoute>
    } />

    <Route path='/MiddlewareExample' element={
      <ProtectedRoute><MiddlewareExample /></ProtectedRoute>
    } />

    <Route path='/Addclinics' element={
      <ProtectedRoute><AddClinic /></ProtectedRoute>
    } />

    <Route path='/revision' element={
      <ProtectedRoute><Revision /></ProtectedRoute>
    } />

    
    <Route path='*' element={<PageNotFound />} />

  </Routes>
</BrowserRouter>
 

)
