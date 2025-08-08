import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  BookOpen, 
  Award, 
  DollarSign,
  CheckCircle,
  X,
  Loader2
} from 'lucide-react';
import { useCourses } from '../hooks/useCourses';

const CoursesSection = () => {
  const { courses, loading, error } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    experience: '',
    paymentMethod: 'stripe'
  });

  const handleRegistration = (course) => {
    setSelectedCourse(course);
    setShowRegistration(true);
  };

  const handleInputChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    // Here you would integrate with actual payment processing
    alert(`Registration submitted for ${selectedCourse.title}! Payment processing would be handled here.`);
    setShowRegistration(false);
    setSelectedCourse(null);
    setRegistrationData({
      name: '',
      email: '',
      phone: '',
      company: '',
      experience: '',
      paymentMethod: 'stripe'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Loading state
  if (loading) {
    return (
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-indigo-600 mb-4" />
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Error loading courses</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Training Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your career with our comprehensive AI training programs designed by industry experts
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Course data optimized for performance - Excel converted to JSON during build
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden kognavion-card-hover"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">${course.price}</div>
                    <div className="text-sm text-gray-500 line-through">${course.originalPrice}</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-6">{course.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                    {formatDate(course.startDate)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-indigo-600" />
                    {course.students} students
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    {course.rating} rating
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Course Highlights:</h4>
                  <ul className="space-y-1">
                    {course.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRegistration(course)}
                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && !showRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h2>
                    <p className="text-gray-600">Instructor: {selectedCourse.instructor}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Course Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-medium">{selectedCourse.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Format:</span>
                        <span className="font-medium">{selectedCourse.format}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-medium">{formatDate(selectedCourse.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-bold text-indigo-600">${selectedCourse.price}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Course Highlights</h3>
                    <ul className="space-y-2">
                      {selectedCourse.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Curriculum</h3>
                    <ul className="space-y-3">
                      {selectedCourse.curriculum.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRegistration(selectedCourse)}
                    className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Register for ${selectedCourse.price}</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Registration Modal */}
        {showRegistration && selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Registration</h2>
                    <p className="text-gray-600">{selectedCourse.title}</p>
                  </div>
                  <button
                    onClick={() => setShowRegistration(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmitRegistration} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={registrationData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={registrationData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={registrationData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="+1 (224) 804-5937"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={registrationData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      name="experience"
                      value={registrationData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (2-5 years)</option>
                      <option value="advanced">Advanced (5+ years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="stripe"
                          checked={registrationData.paymentMethod === 'stripe'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">Credit Card</div>
                          <div className="text-sm text-gray-500">Visa, Mastercard, Amex</div>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={registrationData.paymentMethod === 'paypal'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-gray-500">Pay with PayPal</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Course Price:</span>
                      <span className="font-medium">${selectedCourse.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Processing Fee:</span>
                      <span className="font-medium">$25</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total:</span>
                        <span className="text-lg font-bold text-indigo-600">${selectedCourse.price + 25}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowRegistration(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Complete Registration</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;

