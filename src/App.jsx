import React, { useState } from 'react';
import axios from 'axios';
import {
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPaperPlane,
  FaSpinner
} from 'react-icons/fa';
import { MdEmail, MdAccessTime, MdSecurity } from 'react-icons/md';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    batch: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const API_URL = 'https://mail-smtp-backend.vercel.app';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      // Send data to backend
      const response = await axios.post(`${API_URL}/send-email`, formData);

      if (response.data.success) {
        setIsSubmitting(false);
        setSubmitStatus('success');

        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          studentId: '',
          batch: '',
          subject: '',
          message: ''
        });


        setTimeout(() => {
          setSubmitStatus('');
        }, 3000);
      } else {
        throw new Error(response.data.message || 'Failed to send message');
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');

      // Set appropriate error message
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.message.includes('Network Error')) {
        setErrorMessage('Cannot connect to server. Please check if backend is running.');
      } else {
        setErrorMessage(error.message || 'Failed to send message. Please try again.');
      }

      console.error('Submission error:', error);

      // Clear error after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 ">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Student Portal</h1>
            <p className="text-blue-100 text-lg">Contact your teachers directly through this portal</p>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="container mx-auto px-4 py-8  ">
          <div className="mb-12 ">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Welcome to the Student Contact Portal</h2>
            <p className="text-gray-600 mb-6">
              This platform allows you to send messages directly to your instructors.
              Whether you have questions about assignments, need clarification on course material,
              or want to discuss academic progress, your teachers are here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MdEmail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Direct Communication</h3>
                <p className="text-gray-600">Send messages directly to your teacher's inbox with all necessary details.</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MdAccessTime className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Response</h3>
                <p className="text-gray-600">Teachers typically respond within 24-48 hours during weekdays.</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MdSecurity className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
                <p className="text-gray-600">Your information is secure and only shared with your instructor.</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                <h2 className="text-2xl md:text-3xl font-bold">Contact Your Teacher</h2>
                <p className="text-blue-100 mt-2">Fill out the form below to send a message to your instructor</p>
              </div>

              <div className="p-6 md:p-8  ">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Student ID Field */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="studentId">
                        Student ID *
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        id="studentId"
                        name="studentId"
                        type="text"
                        placeholder="e.g., 2222081036"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Batch Field */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="batch">
                        Batch *
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        id="batch"
                        name="batch"
                        type="text"
                        placeholder="57A"
                        value={formData.batch}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>




                  <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      name="subject"
                      type="text"
                      placeholder="Enter subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Message Field */}
                  <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                      Your Message *
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-[150px]"
                      id="message"
                      name="message"
                      placeholder="Please describe your question or concern in detail..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Status Messages */}
                  <div className="mb-6">
                    {submitStatus === 'success' && (
                      <div className="flex items-center text-green-600 font-medium p-3 bg-green-50 rounded-lg">
                        <FaCheckCircle className="w-5 h-5 mr-2" />
                        Message sent successfully! Your teacher will respond soon.
                      </div>
                    )}

                    {submitStatus === 'error' && errorMessage && (
                      <div className="flex items-center text-red-600 font-medium p-3 bg-red-50 rounded-lg">
                        <FaExclamationTriangle className="w-5 h-5 mr-2" />
                        {errorMessage}
                      </div>
                    )}

                    {submitStatus === 'submitting' && (
                      <div className="flex items-center text-blue-600 font-medium p-3 bg-blue-50 rounded-lg">
                        <FaSpinner className="animate-spin mr-2" />
                        Sending your message...
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <p>All information will be sent directly to your teacher.</p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-4 md:px-8 py-3 font-medium rounded-lg text-white transition flex items-center ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg'}`}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Student Contact Portal</h3>
                <p className="text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
              </div>

              <div className="text-center md:text-right">
                <p className="text-gray-400 mb-2">For technical support, contact:</p>
                <p className="text-blue-300 flex items-center justify-center md:justify-end">
                  <FaEnvelope className="mr-2" />
                  abraragmain75@gmail.com
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App