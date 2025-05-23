import React, { useEffect, useState } from 'react';
import ClinicHeader from '../components/ClinicNav';
import Footer from '../components/Footer';
import { baseURL } from '../../config';
import instance from '../../axios.instance';

function ClinicReportsSent() {
    const clinicEmail = localStorage.getItem("ClinicEmail");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const clinicEmail = localStorage.getItem("ClinicEmail");  
                if (clinicEmail) {
                    const response = await instance.get(`${baseURL}/api/auth/getReportsByClinic`, {
                        params: { clinicEmail }
                    });
                    setReports(response.data.data); 
                } else {
                    setError("No clinic email found in localStorage.");
                }
            } catch (err) {
                setError("Failed to load reports.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [clinicEmail]);

    return (
        <>
            <ClinicHeader />
            <section className="py-10 bg-gradient-to-r from-yellow-100 via-gray-100 to-yellow-200 min-h-screen">
                <h2 className="text-4xl font-bold text-blue-950 text-center mb-8">
                    Reports Sent by Your Clinic
                </h2>

                {loading ? (
                    <p className="text-center text-gray-700">Loading reports...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : !reports || reports.length === 0 ? (
                    <p className="text-center text-gray-600">No reports available.</p>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-4">
                        {reports.map((report, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-500">
                                <h3 className="text-xl font-semibold text-blue-800">{report.petName}</h3>
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
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </>
    );
}

export default ClinicReportsSent;
