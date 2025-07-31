import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Brain, 
  Rocket, 
  Users, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin,
  Menu,
  X,
  ArrowRight,
  Zap,
  Target,
  BookOpen,
  Code,
  Lightbulb,
  Star
} from 'lucide-react';
import './App.css';
import CoursesSection from './components/CoursesSection';

// Import assets
import heroImage from './assets/2l5op9sNwR99.jpg';
import consultingIllustration from './assets/abstract_ai_illustration_1.png';
import developmentIllustration from './assets/abstract_ai_illustration_2.png';
import upskillingIllustration from './assets/abstract_ai_illustration_3.png';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Particle animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
  }));

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="kognavion-scroll-indicator"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold kognavion-text-gradient">Kognavion</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-indigo-600 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('courses')} className="text-gray-700 hover:text-indigo-600 transition-colors">
                Courses
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-indigo-600 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('team')} className="text-gray-700 hover:text-indigo-600 transition-colors">
                Team
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-indigo-600 transition-colors">
                Contact
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-2 space-y-2">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-gray-700">
                Services
              </button>
              <button onClick={() => scrollToSection('courses')} className="block w-full text-left py-2 text-gray-700">
                Courses
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-gray-700">
                About
              </button>
              <button onClick={() => scrollToSection('team')} className="block w-full text-left py-2 text-gray-700">
                Team
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-700">
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="kognavion-particle bg-indigo-200"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="kognavion-hero-title font-bold text-gray-900 mb-6">
              Transforming Businesses with{' '}
              <span className="kognavion-text-gradient">Intelligent AI Solutions</span>
            </h1>
            <p className="kognavion-hero-subtitle text-gray-600 mb-8 max-w-3xl mx-auto">
              From consulting to development to upskilling - we're your complete AI transformation partner
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('services')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center space-x-2 kognavion-glow"
            >
              <span>Start Your AI Journey</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Consulting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg kognavion-card-hover"
            >
              <div className="mb-6">
                <img src={consultingIllustration} alt="AI Consulting" className="w-full h-48 object-cover rounded-lg" />
              </div>
              <Target className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic AI Consulting</h3>
              <p className="text-gray-600 mb-6">
                Navigate the complex AI landscape with confidence. Our expert consultants help you identify opportunities, 
                develop strategies, and implement AI solutions that drive real business value.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Strategic AI roadmap development</li>
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Technology assessment and selection</li>
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Risk mitigation and compliance</li>
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />ROI optimization</li>
              </ul>
            </motion.div>

            {/* AI Product Development */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg kognavion-card-hover"
            >
              <div className="mb-6">
                <img src={developmentIllustration} alt="AI Product Development" className="w-full h-48 object-cover rounded-lg" />
              </div>
              <Code className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom AI Product Development</h3>
              <p className="text-gray-600 mb-6">
                Bring your AI vision to life with our end-to-end product development services. We design, develop, 
                and deploy cutting-edge AI products that solve real-world problems.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Full-stack AI development</li>
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Scalable architecture design</li>
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />User-centric product design</li>
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Continuous optimization</li>
              </ul>
            </motion.div>

            {/* AI Upskilling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg kognavion-card-hover"
            >
              <div className="mb-6">
                <img src={upskillingIllustration} alt="AI Upskilling" className="w-full h-48 object-cover rounded-lg" />
              </div>
              <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Upskilling & Training</h3>
              <p className="text-gray-600 mb-6">
                Empower your team with the knowledge and skills needed to thrive in an AI-driven world. 
                Our comprehensive training programs cover everything from AI fundamentals to advanced implementation.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Customized training programs</li>
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Hands-on learning experiences</li>
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Industry-specific curricula</li>
                <li className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Ongoing support and mentorship</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <CoursesSection />

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Pioneering the Future of AI</h2>
              <p className="text-lg text-gray-600 mb-6">
                Kognavion AI Labs Private Limited stands at the intersection of innovation and practical application. 
                Founded with a vision to democratize AI technology, we bridge the gap between cutting-edge research 
                and real-world business solutions.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our mission is to empower organizations of all sizes to harness the transformative power of 
                artificial intelligence, driving growth, efficiency, and innovation across industries.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">100+</div>
                  <div className="text-gray-600">Professionals Trained</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img src={heroImage} alt="AI Innovation" className="rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* cognavia.ai Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Zap className="h-16 w-16 mx-auto mb-6 text-cyan-400" />
            <h2 className="text-4xl font-bold mb-6">Introducing cognavia.ai</h2>
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">The Future of Agentic AI</h3>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              cognavia.ai represents our specialized focus on Agentic AI - intelligent systems that can act 
              autonomously to achieve specific goals. This revolutionary approach to AI goes beyond traditional 
              automation, creating systems that can think, learn, and adapt in real-time to deliver unprecedented business value.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-600 transition-colors inline-flex items-center space-x-2"
            >
              <span>Explore cognavia.ai</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds behind Kognavion's innovative AI solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Girish Kumar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center kognavion-card-hover"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">GK</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Girish Kumar</h3>
              <p className="text-indigo-600 font-semibold mb-4">CEO & Founder</p>
              <p className="text-gray-600">
                Visionary leader with extensive experience in AI strategy and business transformation. 
                Girish founded Kognavion with the mission to make AI accessible and impactful for businesses worldwide.
              </p>
            </motion.div>

            {/* Prasad A Nair */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center kognavion-card-hover"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">PN</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Prasad A Nair</h3>
              <p className="text-indigo-600 font-semibold mb-4">Technical Director</p>
              <p className="text-gray-600">
                Technical expert with deep expertise in AI architecture and implementation. 
                Prasad leads our technical teams in delivering robust, scalable AI solutions that exceed client expectations.
              </p>
            </motion.div>

            {/* Neha G */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center kognavion-card-hover"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">NG</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Neha G</h3>
              <p className="text-indigo-600 font-semibold mb-4">AI & Robotics</p>
              <p className="text-gray-600">
                Specialist in AI and robotics with a passion for creating intelligent systems that enhance human capabilities. 
                Neha drives innovation in our most advanced AI projects.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your business with AI? Let's start the conversation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-indigo-600" />
                  <span className="text-gray-600">info@kognavion.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-indigo-600" />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                  <span className="text-gray-600">AI Innovation Hub, Tech City</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tell us about your AI needs..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-indigo-400" />
                <span className="text-2xl font-bold">Kognavion</span>
              </div>
              <p className="text-gray-400">
                Transforming businesses with intelligent AI solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Consulting</li>
                <li>Product Development</li>
                <li>AI Upskilling</li>
                <li>Training Courses</li>
                <li>cognavia.ai</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>GitHub</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kognavion AI Labs Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

