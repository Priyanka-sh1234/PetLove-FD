 // <BrowserRouter>
  //   <Routes>
      
  //     <Route path='/' element={<Home />} />  

  //     <Route path="/login" element={<Loginform />} />
      
  //     <Route path='/clinicLoginForm' element={<GoogleClinicLoginWrapper />} />
      
  //     <Route path='/petOwnerLoginForm' element={<GooglePrentLoginWrapper />} />

  //     <Route path='/Parentregister' element={<GoogleParentWrapper />} />

  //     {/* Register sign in */}
  //     <Route path='/Parentregister' element={<ParentRegisterForm />}/>

  //     <Route path='/contact' element={<Contact />} />

  //     <Route path='/clinics' element={<Clinics/>} />

  //     <Route path='/profile' element={<Profile/>} />

  //     <Route path='/petOwnerLoginForm' element={<PetOwnerLoginForm />} />

  //     <Route path='/ParentBookClinic' element={<ParentBookClinic/>} />

  //     <Route path='/Parentfindclinics' element={<ParentFindClinics />} />

  //     <Route path='/clinicLoginForm' element={<ClinicLoginForm />} />

  //     <Route path='/ParentHomePage' element={<ParentHomePage />} />

  //     <Route path='/parentContact' element={<ParentContact />} />

  //     <Route path='/parentProfile' element={<ParentProfile />} />

  //     <Route path='/findClinics' element={<FindClinics />} />
      
  //     <Route path='/clinicregister' element={<GoogleClinicWrapper />} />  

  //     <Route path='/clinicregister' element={<ClinicRegisterForm />}/>

  //     <Route path='/Clinicprofile' element={<ClinicProfilePage />} />

  //     <Route path='/ClinicHomePage' element={<ClinicHomePage />} />

  //     <Route path='/checkAppointments' element={<CheckAppointments />} />

  //     <Route path='/addReports' element={<AddReports />} />

  //     <Route path="/PetParentAppointments" element={<PetParentAppointments />} />

  //     <Route path='/ClinicContact' element={<ClinicContact />} />

  //     <Route path='/BookClinic' element={<BookClinic />} />

  //     <Route path='/Yourpetreports' element={<Yourpetreports/>} />

  //     <Route path='*' element={<PageNotFound />} />

  //     <Route path='/MiddlewareExample' element={<MiddlewareExample />} />

  //     <Route path='/Addclinics' element={<AddClinic />} />

  //     <Route path="/revision" element={<Revision />} />

  //   </Routes>
  // </BrowserRouter>




  

//  // Sample data for clinics
//  const allClinics = [
//     {
//         id: 1,
//         name: "Happy Paws Clinic",
//         location: "Downtown",
//         rating: 4.5,
//         image: "https://img.freepik.com/free-photo/modern-business-center_1127-3157.jpg?ga=GA1.1.2004871835.1738248311",
//         type: "Veterinary Care",
//     },
//     {
//         id: 2,
//         name: "VetCare Clinic",
//         location: "Uptown",
//         rating: 4.8,
//         image: "https://img.freepik.com/free-photo/picture-modern-skyscrapers-with-blue-windows-parking-area-blue-sky_181624-7105.jpg?ga=GA1.1.2004871835.1738248311g",
//         type: "Emergency Care",
//     },
//     {
//         id: 3,
//         name: "Healthy Pets Clinic",
//         location: "Suburbs",
//         rating: 4.0,
//         image: "https://img.freepik.com/free-photo/building-with-gardens-ground-floor_1122-2170.jpg?ga=GA1.1.2004871835.1738248311",
//         type: "Pet Care",
//     },
//     {
//         id: 4,
//         name: "City Vet Clinic",
//         location: "Downtown",
//         rating: 4.3,
//         image: "https://img.freepik.com/free-photo/modern-hospital-building_1134-101.jpg?ga=GA1.1.2004871835.1738248311",
//         type: "Veterinary Care",
//     },
//     {
//         id: 5,
//         name: "Animal Wellness Center",
//         location: "Eastside",
//         rating: 4.7,
//         image: "https://img.freepik.com/free-photo/modern-hospital-building-with-blue-glass-windows_1134-298.jpg?ga=GA1.1.2004871835.1738248311",
//         type: "Veterinary Care",
//     },
//     {
//         id: 6,
//         name: "Pet Health Clinic",
//         location: "West End",
//         rating: 4.9,
//         image: "https://img.freepik.com/free-photo/modern-hospital-building_1134-209.jpg?ga=GA1.1.2004871835.1738248311",
//         type: "Pet Care",
//     },
//     {
//         id: 7,
//         name: "Animal Emergency Care",
//         location: "Midtown",
//         rating: 4.6,
//         image: "https://img.freepik.com/free-photo/health-clinic-hospital-building_1134-210.jpg?ga=GA1.1.2004871835.1738248311",
//         type: "Emergency Care",
//     },
//     {
//         id: 8,
//         name: "Paws & Claws Veterinary Clinic",
//         location: "Northside",
//         rating: 4.4,
//         image: "https://img.freepik.com/free-photo/modern-clinic-building_1134-271.jpg?ga=GA1.1.2004871835.1738248311",
//         type: "Veterinary Care",
//     },
//     {
//         id: 9,
//         name: "CareVet Clinic",
//         location: "Southside",
//         rating: 4.2,
//         image: "https://img.freepik.com/free-photo/modern-clinic_1134-150.jpg?ga=GA1.1.2004871835.1738248311",
//         type: "Veterinary Care",
//     },
//     {
//         id: 10,
//         name: "Companion Animal Clinic",
//         location: "East End",
//         rating: 4.5,
//         image: "https://img.freepik.com/free-photo/health-clinic_1134-305.jpg?ga=GA1.1.2004871835.1738248311",
//         type: "Pet Care",
//     },
// ];


// // State to store the search term and filtered clinics
// const [searchTerm, setSearchTerm] = useState("");
// const [filteredClinics, setFilteredClinics] = useState(allClinics);

// // Handle Search Input Change
// const handleSearch = (value) => {
//     setSearchTerm(value);
//     // Filter clinics based on the locality entered
//     const filtered = allClinics.filter(clinic =>
//         clinic.location.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredClinics(filtered);
// };






            // {/* Search By Your Locality */}
            // <section className="py-16 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 flex flex-col items-center justify-center">
            //     <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-yellow-700 px-5 py-5 drop-shadow-xl">
            //         Search By Your Locality
            //     </h2>
            //     <Space direction="vertical" className='mt-8 w-200'>
            //         <Search
            //             placeholder="Enter locality"
            //             enterButton="Search"
            //             size="large"
            //             value={searchTerm}
            //             onChange={(e) => handleSearch(e.target.value)}
            //         />
            //     </Space>
            // </section>




            // {/* Clinics Search Results Section */}
            // <section className="py-16 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200">
            //     <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-yellow-700 px-5 py-5 drop-shadow-xl">
            //         Search Results
            //     </h2>
            //     <div className="flex flex-wrap justify-center gap-8 mt-10">
            //         {/* Render filtered clinics in a new section */}
            //         {filteredClinics.length > 0 ? (
            //             filteredClinics.map((clinic) => (
            //                 <Card key={clinic.id} className="w-80 shadow-xl rounded-xl overflow-hidden border-2 border-gray-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500 transition-all duration-300 ease-in-out">
            //                     <img
            //                         alt={clinic.name}
            //                         src={clinic.image}
            //                         className="w-full h-64 object-cover rounded-t-xl"
            //                     />
            //                     <div className="p-4">
            //                         <Meta
            //                             title={clinic.name}
            //                             description={`Location: ${clinic.location}`}
            //                         />
            //                         <Rate className="mt-2" allowHalf defaultValue={clinic.rating} />
            //                         <div className="flex items-center space-x-2 mt-4">
            //                             {clinic.type === "Veterinary Care" && <FaHeart className="text-red-500" />}
            //                             {clinic.type === "Emergency Care" && <FaHospital className="text-blue-500" />}
            //                             {clinic.type === "Pet Care" && <FaPaw className="text-green-500" />}
            //                             <span className="text-gray-700">{clinic.type}</span>
            //                         </div>
            //                         <button
            //                             onClick={ handleBooking} 
            //                             className="mt-4 w-full bg-gray-800 text-white hover:rounded-bl-3xl hover:rounded-tr-3xl hover:rounded-tl-none hover:rounded-br-none focus:ring-4 focus:ring-yellow-300 transition-all rounded-lg py-3 flex items-center justify-center space-x-2 hover:shadow-lg"
            //                         >
            //                             <span>Book Now</span>
            //                             <FaArrowRight className="ml-2" />
            //                         </button>
            //                     </div>
            //                 </Card>
            //             ))
            //         ) : (
            //             <div className="w-full text-center text-xl text-gray-700">
            //                 No clinics found for the entered locality.
            //             </div>
            //         )}
            //     </div>
            // </section>