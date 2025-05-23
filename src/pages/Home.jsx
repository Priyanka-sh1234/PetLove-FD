import './App.css';
import Header from '../components/header.jsx';
import Footer from '../components/Footer.jsx';
import ChatBot from '../components/Chatbot.jsx';
import React from 'react';
import { Button, Card, Carousel, Rate } from 'antd';
import { PawPrint, HeartPulse, Stethoscope } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const { Meta } = Card;

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="overflow-x-hidden">
                <Header />

                {/* Carousel Section */}
                <section className="relative w-full h-[550px] md:h-[650px] overflow-hidden shadow-xl">
                    <Carousel autoplay effect="fade-1" className="w-full h-full">
                        <div>
                            <img
                                src="https://t3.ftcdn.net/jpg/10/26/28/52/360_F_1026285214_hctNYuX6jyLkBu5fC3SvRsOLhhhhqkgm.jpg"
                                alt="banner image 1"
                                className="w-full h-[550px] md:h-[650px] object-cover brightness-[.5]"
                            />
                        </div>
                        <div>
                            <img
                                src="https://media.istockphoto.com/id/1168286284/photo/vet-with-dog-and-cat-puppy-and-kitten-at-doctor.jpg?s=612x612&w=0&k=20&c=3vNb8iaWYVGMgFQN8ZRZcLKiK4VLAUFXzKU1uOU42as="
                                alt="banner image 2"
                                className="w-full h-[550px] md:h-[650px] object-cover brightness-[.5]"
                            />
                        </div>
                        <div>
                            <img
                                src="https://media.istockphoto.com/id/1353103116/photo/veterinarian-examining-cute-pug-dog-and-cat-in-clinic-closeup-vaccination-day.jpg?s=612x612&w=0&k=20&c=rVYhuc25uTbejkXgkfgfOwGLpTmNJ_zGafejYKgqer0="
                                alt="banner image 3"
                                className="w-full h-[550px] md:h-[650px] object-cover brightness-[.5]"
                            />
                        </div>
                    </Carousel>

                    {/* Overlay content */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center px-6 md:px-16 text-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="p-6 md:p-10 max-w-full space-y-6">
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-snug">
                                Find the Best Pet Clinics Near You
                            </h1>
                            <p className="text-lg md:text-2xl font-medium text-white">
                                Book appointments, manage health records, and more!
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/clinics')}
                                className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-7 rounded-full transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-1"
                            >
                                Find a Clinic
                            </motion.button>
                        </div>
                    </motion.div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 text-center bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200">
                    <h2 className="text-5xl font-bold text-blue-950 mb-7">How It Works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
                        {[{
                            title: 'Find Clinics',
                            img: 'https://tuggeranongvet.com.au/wp-content/uploads/sites/57/2023/09/tuggeranong-vet-home-header-dog-cat-LR-1024x934.png',
                            desc: 'Search for the nearest clinics in your area and check their services.'
                        }, {
                            title: 'Book Appointments',
                            img: 'https://www.wavetec.com/wp-content/uploads/2021/01/appt-online.png',
                            desc: 'Choose your desired clinic and book an appointment quickly and easily.'
                        }, {
                            title: 'Manage Records',
                            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy35y5SeU1sm788-VblBj6rwRQsF_Phjqwfw&s',
                            desc: 'Track and manage your pet\'s health records online at any time.'
                        }].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Card className="shadow-md rounded-xl transform transition-all duration-300 hover:scale-110">
                                    <img src={item.img} alt={item.title} className="max-h-50 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-gradient-to-l from-gray-900 to-gray-700 bg-clip-text">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg text-emerald-950 leading-relaxed mt-2">{item.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Pet Health Tips Section */}
                <section className="bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-bold text-blue-900 mb-4">Pet Health Tips</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Keep your furry friends happy and thriving with these essential wellness tips.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-20">
                        {[
                            { icon: <PawPrint className="w-10 h-10 text-yellow-600" />, title: 'Healthy Diet', color: 'pink', desc: 'A balanced diet keeps your pet energetic and strong. Tailor food choices by age and breed.' },
                            { icon: <HeartPulse className="w-10 h-10 text-green-600" />, title: 'Daily Exercise', color: 'green', desc: 'Physical activity improves your pet’s physical and mental health. Make playtime a priority!' },
                            { icon: <Stethoscope className="w-10 h-10 text-purple-600" />, title: 'Vet Checkups', color: 'purple', desc: 'Regular visits help detect issues early. Keep vaccinations and exams up-to-date.' }
                        ].map((tip, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className={`bg-${tip.color}-100 border-l-8 border-${tip.color}-500 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                            >
                                <div className="flex justify-center mb-4">{tip.icon}</div>
                                <h3 className={`text-2xl font-bold text-${tip.color}-800 mb-3 text-center`}>{tip.title}</h3>
                                <p className="text-gray-700 text-center">{tip.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Photo Gallery Section */}
                                    <section className="bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 py-20">
                                        <div className="text-center mb-12">
                                            <h2 className="text-5xl font-bold text-blue-900 mb-4">Pet Photo Gallery</h2>
                                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                                Adorable moments of happy pets captured in our partner clinics.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-16">
                                            {[
                                                'https://thumbs.dreamstime.com/b/banner-pets-dog-cat-smiling-happy-expression-closed-eyes-isolated-blue-colored-background-367009053.jpg',
                                                'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb',
                                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtNkWruPudV9g5Ep3pVU3X5IhlMMCv9cO8ptfUqg1FihY04fyjtzO3NWSdL1KwTC1U2B0&usqp=CAU',
                                                'https://media.istockphoto.com/id/1041987488/photo/cute-dog-put-his-face-on-his-knees-to-the-man-and-smiling-from-the-hands-scratching-her-ear.jpg?s=612x612&w=0&k=20&c=NKGf8nmXVdksmNS0Ay696cVPNSIfCJJ1yu_y9jFGBsM=',
                                                'https://thumbs.dreamstime.com/b/large-group-pets-together-front-view-isolated-white-background-124051211.jpg',
                                                'https://thumbs.dreamstime.com/b/cats-dogs-peeking-over-white-edge-web-promotional-banner-pet-shop-vet-clinic-background-cute-pets-325674604.jpg',
                                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-jHaW5zNowLMuqfkQpuoAVn_HHEMumz_tA&s',
                                                'https://media.istockphoto.com/id/1397843652/photo/shot-of-a-young-family-sitting-on-the-living-room-floor-with-their-dog.jpg?s=612x612&w=0&k=20&c=BGc6ni6nCioLHknTO5Z_N3K9csC_GhmGZywaepTtGFA='
                                            ].map((src, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ scale: 1.05 }}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.4 }}
                                                    viewport={{ once: true }}
                                                    className="rounded-xl overflow-hidden shadow-md"
                                                >
                                                    <img
                                                        src={src}
                                                        alt={`Pet ${i + 1}`}
                                                        className="w-full h-56 object-cover hover:brightness-110 transition-all duration-300"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </section>
                

                {/* FAQ Section */}
                <section className="py-10 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 text-center">
                    <h2 className="text-4xl font-bold text-blue-950 mb-10">Frequently Asked Questions</h2>
                    <div className="max-w-4xl mx-auto text-left space-y-6 px-6">
                        {[
                            {
                                q: "How do I book an appointment?",
                                a: "Simply click on 'Find a Clinic' and choose a clinic near you. You can book directly from there.",
                                color: "blue"
                            },
                            {
                                q: "Can I manage more than one pet?",
                                a: "Absolutely! You can add multiple pets to your profile and manage each one’s records individually.",
                                color: "pink"
                            },
                            {
                                q: "Are the clinics verified?",
                                a: "Yes, we only list licensed and verified clinics to ensure top-quality care.",
                                color: "green"
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`bg-${faq.color}-100 border-l-4 border-${faq.color}-500 p-6 rounded-xl shadow`}
                            >
                                <h4 className={`text-xl font-semibold text-${faq.color}-900`}>{faq.q}</h4>
                                <p className={`text-${faq.color}-800 mt-2`}>{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="text-center py-20 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200">
                    <h2 className="text-5xl font-bold text-blue-950 py-10">What Pet Owners Say</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-12">
                        {[
                            {
                                name: "Sarah T.",
                                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4g-3ZH_1TjfN-zOuCRru2LrfrGtPbwaCsQ&s",
                                feedback: "PetLove helped me find the perfect clinic for my dog. The booking process was so easy!",
                                role: "Pet Owner"
                            },
                            {
                                name: "John D.",
                                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlgVUiuTQbmj_jO_W1nmX8bzbXS2DDxMStn8FdSPyK7SSAKVnHXZjTx9764JdwzGSWd84&usqp=CAU",
                                feedback: "My cat’s health records are now easily accessible online. I can’t imagine it any other way!",
                                role: "Pet Owner"
                            },
                            {
                                name: "Emily W.",
                                img: "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg",
                                feedback: "The clinics here are top-notch! The process is smooth, and my pet is well taken care of.",
                                role: "Pet Owner"
                            },
                            {
                                name: "Aarohi Sharma",
                                img: "https://randomuser.me/api/portraits/women/44.jpg",
                                feedback: "Finding the right care for my dog used to be stressful—this platform made it so easy and trustworthy!",
                                role: "Dog Parent, Pune"
                            }
                        ].map((testi, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Card className="w-90 px-10 shadow-xl rounded-xl transform hover:scale-105 hover:shadow-blue-950 transition-all duration-300">
                                    <div className="flex justify-center mb-4">
                                        <img src={testi.img} alt="Client" className="w-24 h-24 rounded-full border-4 border-yellow-500" />
                                    </div>
                                    <p className="italic text-lg text-gray-800 mb-4">"{testi.feedback}"</p>
                                    <Meta title={testi.name} description={testi.role} />
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-15 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 text-center">
                    <h2 className="text-5xl font-bold text-blue-950 py-5">Ready to Take Care of Your Pet?</h2>
                    <p className="text-xl text-gray-800 mb-6">Join us today and connect with the best clinics near you!</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 py-4 px-5 transition-all duration-800"
                        onClick={() => navigate('/clinics')}
                    >
                        Get Started
                    </motion.button>
                </section>
                        <ChatBot />
                <Footer />
            </div>
        </>
    );
}

export default Home;
