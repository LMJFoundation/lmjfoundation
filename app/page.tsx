"use client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '', type: '' });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showModal = (title: string, text: string, type: string = 'info') => {
    setModalContent({ title, text, type });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // FIXED: Donate now goes to payment page
  const handleDonate = () => {
    // Replace with your actual payment links when ready
    window.open('https://your-payment-link.com', '_blank');
    closeModal();
  };

  // FIXED: Volunteer pre-fills the contact form
  const handleVolunteerApply = () => {
    const messageField = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    if (messageField) {
      messageField.value = "I'm interested in volunteering for LMJ India Foundation. Please let me know about current opportunities.";
      messageField.focus();
      
      // Visual highlight
      messageField.style.borderColor = '#f97316';
      messageField.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
      setTimeout(() => {
        messageField.style.borderColor = '';
        messageField.style.boxShadow = '';
      }, 2000);
    }
    
    closeModal();
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    });

    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-inter bg-white text-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center animate-float overflow-hidden">
  <img
    src="/logo.png"
    alt="LMJ India Foundation Logo"
    className="w-full h-full object-contain"  // ← CHANGE TO object-contain
    onError={(e) => {
      e.currentTarget.style.display = 'none';
      e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-bold text-sm">LMJ</span>';
    }}
  />
</div>
              <span className="text-xl font-playfair font-bold text-gray-900">LMJ India Foundation</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-purple-600 transition">About</button>
              <button onClick={() => scrollToSection('programs')} className="text-gray-700 hover:text-purple-600 transition">Programs</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-purple-600 transition">Impact</button>
              <button onClick={() => showModal('Donate', 'Your donation helps empower communities across India. Every contribution makes a difference.', 'donate')} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">Donate</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 text-white pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="fade-in opacity-0 translate-y-8"
            >
              <h1 className="font-playfair text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Empowering <span className="text-orange-300">People.</span><br />
                Transforming <span className="text-orange-300">Communities.</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Building a just, inclusive, and sustainable India through education,
                healthcare, livelihood, and environmental action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('programs')}
                  className="bg-orange-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-600 transition hover-lift"
                >
                  Join Our Mission
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('about')}
                  className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-purple-600 transition hover-lift"
                >
                  Our Story
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="fade-in opacity-0 translate-y-8 relative"
            >
              <div className="bg-white/10 rounded-3xl p-2 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Community Empowerment" 
                  className="rounded-2xl w-full h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed fade-in opacity-0 translate-y-8">
              <p>
                The <strong className="text-purple-600">LMJ India Foundation</strong> is a pan-India nonprofit
                organization committed to advancing equity, opportunity,
                healthcare, livelihood, and sustainable development across
                communities.
              </p>
              <p>
                Founded in honor of the founder&apos;s parents—whose lives embodied
                compassion and service—LMJ draws inspiration from their values to
                guide every aspect of its work.
              </p>
              <p>
                We believe true social transformation begins with empowerment:
                equipping individuals with the tools, resources, and knowledge to
                lead lives of dignity and purpose.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 fade-in opacity-0 translate-y-8">
              <img 
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Education" 
                className="rounded-2xl h-48 w-full object-cover hover-lift"
              />
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Healthcare" 
                className="rounded-2xl h-48 w-full object-cover mt-8 hover-lift"
              />
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Environment" 
                className="rounded-2xl h-48 w-full object-cover hover-lift"
              />
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Women Empowerment" 
                className="rounded-2xl h-48 w-full object-cover mt-8 hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8 hover-lift border border-gray-100 fade-in opacity-0 translate-y-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">👑</span>
                </div>
                <h3 className="font-playfair text-3xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <blockquote className="text-xl italic text-gray-700 leading-relaxed border-l-4 border-purple-500 pl-6">
                &ldquo;A just and inclusive India where every woman, child, and community
                is empowered to live with dignity, health, cultural pride, and
                opportunity — building a sustainable and equitable nation.&rdquo;
              </blockquote>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8 hover-lift border border-gray-100 fade-in opacity-0 translate-y-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="font-playfair text-3xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                LMJ India Foundation works across India to promote{" "}
                <strong className="text-orange-600">social entrepreneurship</strong>, <strong className="text-orange-600">women&apos;s empowerment</strong>,{" "}
                <strong className="text-orange-600">education</strong>, <strong className="text-orange-600">healthcare</strong>,{" "}
                <strong className="text-orange-600">livelihood</strong>, <strong className="text-orange-600">culture preservation</strong>, and{" "}
                <strong className="text-orange-600">environmental awareness</strong> — building resilient,
                self-reliant communities through grassroots action and innovation.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push('/gallery')}
                className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition hover-lift"
              >
                Explore Our Journey →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Creating lasting impact through comprehensive social initiatives</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💼",
                title: "Social Entrepreneurship",
                description: "Empowering changemakers through mentorship, training, and funding to solve local challenges.",
                color: "from-purple-500 to-blue-500"
              },
              {
                icon: "👩‍💼",
                title: "Women Empowerment",
                description: "Enhancing leadership, skills, and economic independence for women and girls.",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: "📚",
                title: "Girl Child Education",
                description: "Providing quality education, scholarships, and mentorship in underserved regions.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: "🏥",
                title: "Healthcare & Wellness",
                description: "Organizing medical camps, health awareness programs, and rural healthcare outreach.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "🎨",
                title: "Livelihood & Culture",
                description: "Supporting artisans, reviving crafts, and sustaining traditional livelihoods.",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: "🌱",
                title: "Environmental Awareness",
                description: "Creating eco-clubs, tree-planting drives, and green education programs.",
                color: "from-teal-500 to-green-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group fade-in opacity-0 translate-y-8"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover-lift border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-4">How We Work</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our approach is rooted in deep community engagement and collaboration. We partner with local groups, schools, NGOs, and government bodies to co-design sustainable solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🤝", title: "Grassroots Engagement", description: "Listening and acting with local communities." },
              { icon: "🚀", title: "Capacity Building", description: "Investing in skills, leadership, and confidence." },
              { icon: "🌱", title: "Sustainability", description: "Environmentally sound, economically viable solutions." },
              { icon: "⚖️", title: "Equity & Inclusion", description: "Prioritizing marginalized groups, women, and youth." }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center fade-in opacity-0 translate-y-8"
              >
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover-lift">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-200 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Message - UPDATED with larger image */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="fade-in opacity-0 translate-y-8"
          >
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-8">Founder&apos;s Message</h2>
            
            <div className="flex justify-center mb-8">
              {/* Updated Founder Image - Larger and more prominent */}
              <div className="w-48 h-48 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-2xl">
                <img 
                  src="/founder.jpg" 
                  alt="Vandana Jha - Founder" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback if founder image not found
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-white text-4xl font-bold">VJ</span>';
                  }}
                />
              </div>
            </div>
            
            <blockquote className="text-2xl italic text-orange-300 leading-relaxed mb-8 border-l-4 border-orange-400 pl-6 mx-auto max-w-3xl">
              &ldquo;It gives me immense joy to welcome you to LMJ India Foundation — an endeavor born out of love, gratitude, and a deep commitment to uplift those who deserve equal opportunity and wellbeing.&rdquo;
            </blockquote>

            <div className="space-y-4 text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <p>
                Rooted in the values my parents instilled — compassion, service, and belief in the dignity of every life — LMJ is dedicated to empowering, educating, and enabling communities across India.
              </p>
              <p>
                I invite you to join hands with us — your belief and support will help shape a future where opportunity, health, and hope are realities for all.
              </p>
            </div>

            <p className="text-xl font-semibold text-orange-300 mb-8">— Vandana Jha</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('contact')}
              className="bg-orange-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-600 transition hover-lift"
            >
              Connect With Us
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Call to Action - REMOVED Partner With Us */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="fade-in opacity-0 translate-y-8"
          >
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-6">Together, We Can Shape a Sustainable Future.</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-12 leading-relaxed">
              Every contribution — time, skill, or donation — helps transform lives and preserve our shared heritage.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => showModal('Donate Now', 'Your donation helps us empower communities across India. Every contribution makes a difference.', 'donate')}
                className="bg-white text-green-700 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition hover-lift min-w-[180px]"
              >
                Donate Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => showModal('Volunteer', 'Join our team of dedicated volunteers and make a direct impact in communities across India.', 'volunteer')}
                className="bg-orange-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-400 transition hover-lift min-w-[180px]"
              >
                Volunteer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="fade-in opacity-0 translate-y-8">
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>contact@lmjindiafoundation.org</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>+91-9876543210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>LMJ India Foundation<br />123 Social Impact Street<br />New Delhi, India 110001</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in opacity-0 translate-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form 
                action="https://formspree.io/f/xanlzgyw" 
                method="POST"
                className="space-y-4"
              >
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows={4}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                ></textarea>
                <button 
                  type="submit"
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-8 fade-in opacity-0 translate-y-8">
            <div className="w-18 h-18 rounded-lg flex items-center justify-center mr-4 animate-float overflow-hidden">
  <img 
    src="/logo.png" 
    alt="LMJ India Foundation Logo" 
    className="w-full h-full object-contain"  // ← CHANGE TO object-contain
    onError={(e) => {
      e.currentTarget.style.display = 'none';
      e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-bold text-lg">LMJ</span>';
    }}
  />
</div>
            <span className="text-2xl font-playfair font-bold">LMJ India Foundation</span>
          </div>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto fade-in opacity-0 translate-y-8">
            Together, We Can Shape a Sustainable Future. Every contribution helps transform lives and preserve our shared heritage.
          </p>
          
          <div className="border-t border-gray-800 pt-8 fade-in opacity-0 translate-y-8">
            <p className="text-gray-500">&copy; LMJ India Foundation. All rights reserved. | Empowering Communities Across India</p>
          </div>
        </div>
      </footer>

      {/* Modal - REMOVED Partner option */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{modalContent.title}</h3>
            <p className="text-gray-600 mb-6">{modalContent.text}</p>
            <div className="flex gap-4">
              <button onClick={closeModal} className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition">Close</button>
              {modalContent.type === 'donate' && (
                <button onClick={handleDonate} className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">Donate Now</button>
              )}
              {modalContent.type === 'volunteer' && (
                <button onClick={handleVolunteerApply} className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">Apply Now</button>
              )}
              {modalContent.type === 'info' && (
                <button onClick={closeModal} className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">Learn More</button>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .hover-lift { transition: all 0.3s ease; }
        .hover-lift:hover { transform: translateY(-5px); }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
