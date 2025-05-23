import React, { useEffect, useState } from "react";
import ParentHeader from "../components/parentNav";
import Footer from "../components/Footer";
import { baseURL } from "../../config";
import instance from "../../axios.instance";
import { motion } from "framer-motion"; // Import Framer Motion

function Yourpetreports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const parentEmail = localStorage.getItem("UserEmail");  // Get the email

                if (parentEmail) {
                    const response = await instance.get(`${baseURL}/api/auth/YourPetReports/${parentEmail}`);
                    setReports(response.data.reports);
                } else {
                    setError("No user email found in localStorage.");
                }
            }
            catch (err) {
                setError("Failed to load reports.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    return (
        <>
            <ParentHeader />
            <section className="py-10 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 min-h-screen">
                <h2 className="text-4xl font-bold text-blue-950 text-center mb-8">
                    Your Pet Reports
                </h2>

                {loading ? (
                    <p className="text-center text-gray-700">Loading reports...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : !reports || reports.length === 0 ? (
                    <p className="text-center text-gray-600">No reports available.</p>
                ) : (
                    <motion.div
                        className="max-w-4xl mx-auto space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        {reports.map((report, index) => (
                            <motion.div
                                key={index}
                                className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-500"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * index, duration: 0.3 }}
                            >
                                <h3 className="text-xl font-semibold text-blue-800">
                                    {report.parentName || "Unnamed Parent"}
                                </h3>

                                <h3 className="text-xl font-semibold text-pink-800">
                                    Report By: {report.clinicName || "Unnamed Clinic"}
                                </h3>
                                <p className="text-gray-700 mt-2">{report.reportText || "No report text."}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Date: {report.date ? new Date(report.date).toLocaleDateString() : "N/A"} at {report.Timings || "N/A"}
                                </p>

                                {report.reportFile && (
                                    <a
                                        href={`${baseURL}/UPLOAD/reports/${report.reportFile}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-3 text-blue-600 hover:underline font-medium"
                                    >
                                        📄 View Report File
                                    </a>
                                )}

                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>
            <Footer />
        </>
    );
}

export default Yourpetreports;
