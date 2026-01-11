"use client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '', type: '' });
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    location: '',
    message: ''
  });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
      );
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showModal = (title: string, text: string, type: string = 'info') => {
    setModalContent({ title, text, type });
    setIsModalOpen(true);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleDonate = () => {
    setModalContent({
      title: 'Support Our Mission',
      text: 'Thank you for choosing to support LMJ India Foundation. You can make a direct transfer using the details below. Please use your name as a reference for tracking.',
      type: 'donate'
    });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleVolunteerApply = () => {
    // Use requestAnimationFrame for better timing on mobile
    requestAnimationFrame(() => {
      // First close the modal
      closeModal();
      
      // Scroll to contact section
      scrollToSection('contact');
      
      // Small delay to ensure DOM is ready (especially on mobile)
      setTimeout(() => {
        const messageField = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
        if (messageField) {
          messageField.value = "I'm interested in volunteering for LMJ India Foundation. Please let me know about current opportunities.";
          
          // Focus on mobile needs special handling
          if (isMobile) {
            // On mobile, wait a bit before focusing to avoid keyboard issues
            setTimeout(() => {
              messageField.focus();
              // Scroll into view properly on mobile
              messageField.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
              });
            }, 300);
          } else {
            messageField.focus();
          }
          
          // Visual feedback
          messageField.style.transition = 'all 0.3s ease';
          messageField.style.borderColor = '#f97316';
          messageField.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
          
          setTimeout(() => {
            messageField.style.borderColor = '';
            messageField.style.boxShadow = '';
          }, 2000);
        } else {
          // Fallback if message field not found
          console.log('Message field not found');
        }
      }, 500); // Increased delay for mobile
    });
  };

  const handleMemberApply = () => {
    setIsMemberModalOpen(true);
    document.body.style.overflow = 'hidden';
    closeModal();
  };

  const closeMemberModal = () => {
    setIsMemberModalOpen(false);
    document.body.style.overflow = 'auto';
    setMemberForm({
      name: '',
      email: '',
      phone: '',
      profession: '',
      location: '',
      message: ''
    });
  };

  const handleMemberFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMemberForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitMemberForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xanlzgyw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...memberForm,
          subject: 'New Membership Application - LMJ India Foundation',
          type: 'membership'
        }),
      });

      if (response.ok) {
        alert('Thank you for your membership application! We will review it and get back to you soon.');
        closeMemberModal();
      } else {
        alert('There was an error submitting your application. Please try again or contact us directly.');
      }
    } catch (error) {
      alert('There was an error submitting your application. Please try again or contact us directly.');
    }
  };

  // Handle mobile-specific member button click
  const handleBecomeMemberClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isMobile) {
      // On mobile, open member modal directly
      setIsMemberModalOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      // On desktop, show info modal first
      showModal('Become a Member', 'Join LMJ India Foundation as a member and be part of our growing community of changemakers. Your membership supports our initiatives and gives you exclusive updates.', 'member');
    }
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

  // Split members into two categories
  const members = [
    "Kalyani"
  ];

  // Young ChangeMakers - Ashutosh Jha first, then others
  const youngChangeMakers = [
    "Ashutosh Jha",
    "Srishti Pandey",
    "Sara Siddiqui",
    "Mohammad Arman",
    "Ashish Gangwal",
    "Chandni",
    "Rohit Rathore"
  ];

  return (
    <div className="font-inter bg-white text-gray-800">
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center animate-float overflow-hidden">
                <img
                  src="/logo.png"
                  alt="LMJ India Foundation Logo"
                  className="w-full h-full object-contain"
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
              <button onClick={() => scrollToSection('founder')} className="text-gray-700 hover:text-purple-600 transition">Founder</button>
              <button onClick={() => scrollToSection('patrons')} className="text-gray-700 hover:text-purple-600 transition">Patrons</button>
              <button onClick={() => scrollToSection('members')} className="text-gray-700 hover:text-purple-600 transition">Members</button>
              <button onClick={() => router.push('/gallery')} className="text-gray-700 hover:text-purple-600 transition">Gallery</button>
              <button onClick={() => showModal('Donate', 'Your donation helps empower communities across India. Every contribution makes a difference.', 'donate')} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">Donate</button>
            </div>
          </div>
        </div>
      </nav>

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
                  src="/hero-image.jpg" 
                  alt="Community Empowerment" 
                  className="rounded-2xl w-full h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
                Founded in honor of <strong>Lakshmishwar Jha</strong> and <strong>Manjula Jha</strong> - the founder's parents whose lives embodied
                compassion and service-LMJ draws inspiration from their values to
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
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
                <strong className="text-orange-600">social entrepreneurship</strong>, <strong className="text-orange-600">women's empowerment</strong>,{" "}
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

      <section id="founder" className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-4">Our Founder</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="fade-in opacity-0 translate-y-8"
            >
              <div className="flex justify-center mb-8">
                <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-2xl">
                  <img 
                    src="/founder.jpg" 
                    alt="Vandana Jha - Founder" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span class="text-white text-4xl font-bold">VJ</span>';
                    }}
                  />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-2 text-center">Vandana Jha</h3>
              <p className="text-xl text-orange-300 text-center mb-8">Founder, LMJ India Foundation</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="fade-in opacity-0 translate-y-8"
            >
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-xl italic text-orange-300 border-l-4 border-orange-400 pl-6 py-2">
                  "It gives me immense joy to welcome you to LMJ India Foundation — an endeavor born out of love, gratitude, and a deep commitment to uplift those who deserve equal opportunity and wellbeing."
                </p>
                
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <p className="mb-4">
                    <strong className="text-orange-300">🎓 A Fulbright scholar and lifelong torchbearer of learning 🎯</strong>
                  </p>
                  <p className="mb-4">
                    With over two decades devoted to education, leadership, and social impact,
                    my work is guided by compassion, commitment to social transformation,
                    protecting the vulnerable, and preserving nature and our shared cultural heritage.
                  </p>
                  <p>
                    Rooted in the values my parents instilled — compassion, service, and belief in the dignity of every life — LMJ is dedicated to empowering, educating, and enabling communities across India.
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 bg-white/5 rounded-xl p-4">
                  <div className="text-3xl">🎓</div>
                  <div>
                    <p className="font-semibold text-orange-300">Fulbright Scholar</p>
                    <p className="text-sm text-gray-300">Over two decades in education & social impact</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 bg-white/5 rounded-xl p-4">
                  <div className="text-3xl">❤️</div>
                  <div>
                    <p className="font-semibold text-orange-300">Core Values</p>
                    <p className="text-sm text-gray-300">Compassion, Social Transformation, Cultural Preservation</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="patrons" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Patrons</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-500 mx-auto"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">Guiding our mission with wisdom and experience</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* First Patron - VN Dalmia */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8 hover-lift border border-gray-100 fade-in opacity-0 translate-y-8"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center overflow-hidden border-4 border-gray-100 shadow-lg mx-auto">
                    <img 
                      src="/patron.jpg" 
                      alt="Vidyanidhi Dalmia - Patron" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-white text-3xl font-bold">VD</span>';
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Vidyanidhi Dalmia</h3>
                  <p className="text-lg text-purple-600 mb-4">(aka VN Dalmia)</p>
                  <p className="text-lg font-semibold text-gray-900 mb-4">Chairman, Dalmia Continental | Knight Commander</p>
                  
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Chairman of Dalmia Continental (DC) and formerly led other Dalmia companies in cement, biscuits, tourism, and more. At DC, he introduced olive oil to India and later divested its leading brands, Leonardo (to Cargill in 2014) and Hudson (to Bunge in 2018).
                    </p>
                    <p className="text-gray-700">
                      He currently serves as an Independent Director and Advisor to several firms. A recipient of an Italian knighthood in the rank of Knight Commander, VN holds an MBA from the University of Virginia's Darden School of Business, where he also served on its Board of Trustees.
                    </p>
                    <p className="text-gray-700">
                      He is the Founder President of the Indian Olive Association and passionate about music, art, photography, reading and fitness.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Second Patron - Prakash Chandra Jha WITH EXACT MESSAGE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8 hover-lift border border-gray-100 fade-in opacity-0 translate-y-8"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden border-4 border-gray-100 shadow-lg mx-auto">
                    <img 
                      src="/prakash-jha.jpg" 
                      alt="Prakash Chandra Jha - Patron" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-white text-3xl font-bold">PJ</span>';
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Prakash Chandra Jha</h3>
                  <p className="text-lg text-purple-600 mb-4">Former Chairman, CBIC | Advisor, FICCI</p>
                  
                  <div className="space-y-4 text-gray-700">
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-gray-800 leading-relaxed">
                        I am Prakash Chandra Jha from Madhubani, Bihar, former Chairman of the Central Board of Indirect Taxes & Customs, and currently Advisor at FICCI. I had the privilege of knowing Pandit Shri Lakshmeeshwar Jha for nearly four decades. I was always deeply impressed by his profound knowledge of the Vedas and timeless wisdom in our ancient scriptures. His contributions to the correct interpretation of the Vedas, including his books in Hindi to share our heritage with the masses, are invaluable—especially today, as we draw inspiration from our past for national development. His absence leaves a personal void, and I pray for eternal peace for his noble soul.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* UPDATED MEMBERS SECTION - SPLIT INTO TWO CATEGORIES */}
      <section id="members" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* SECTION 1: MEMBERS */}
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Members</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-500 mx-auto"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Our members are committed changemakers who actively support and guide LMJ India Foundation's initiatives. 
              Together, we collaborate to create sustainable impact in communities across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {members.map((member, index) => (
              <motion.div
                key={member}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="fade-in opacity-0 translate-y-8"
              >
                <div className="bg-white rounded-2xl p-6 shadow-md hover-lift border border-gray-100 text-center group h-full flex flex-col items-center justify-center min-h-[120px]">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                    {member}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <span>🌟</span>
                    <span className="text-sm">Active Member</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SECTION 2: YOUNG CHANGEMAKERS */}
          <div className="text-center mb-12 fade-in opacity-0 translate-y-8">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Young ChangeMakers</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-rose-500 mx-auto"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Our Young ChangeMakers are passionate, socially conscious individuals who support LMJ India Foundation's initiatives through collaboration, leadership, and action—driving sustainable impact, empowering communities, and fostering inclusive development across India.
            </p>
          </div>

          {/* All Young ChangeMakers in a single grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youngChangeMakers.map((changeMaker, index) => (
              <motion.div
                key={changeMaker}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="fade-in opacity-0 translate-y-8"
              >
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-md hover-lift border border-amber-100 text-center group h-full flex flex-col items-center justify-center min-h-[120px]">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition">
                    {changeMaker}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-amber-600">
                    <span>✨</span>
                    <span className="text-sm font-medium">Young ChangeMaker</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              { icon: "🤝", title: "Civic Engagement", description: "Listening and acting with local communities." },
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
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover-lift h-full min-h-[180px] flex flex-col items-center justify-center">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-blue-200 text-sm px-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  showModal('Donate Now', 'Your donation helps us empower communities across India. Every contribution makes a difference.', 'donate');
                }}
                className="bg-white text-green-700 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition hover-lift min-w-[180px]"
              >
                Donate Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBecomeMemberClick}
                className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold px-8 py-4 rounded-full hover:from-amber-600 hover:to-yellow-700 transition hover-lift min-w-[180px] shadow-lg"
              >
                Become a Member
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  showModal('Volunteer', 'Join our team of dedicated volunteers and make a direct impact in communities across India.', 'volunteer');
                }}
                className="bg-orange-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-400 transition hover-lift min-w-[180px]"
              >
                Volunteer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="fade-in opacity-0 translate-y-8">
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>vandana.jha@lmjindia.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>+91-9999106050</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>LMJ India Foundation<br />A 120 Defence Colony<br />New Delhi, India 110024</p>
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
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg"
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg"
                />
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows={4}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg"
                ></textarea>
                <button 
                  type="submit"
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition w-full text-lg font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-8 fade-in opacity-0 translate-y-8">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mr-4 animate-float overflow-hidden">
              <img 
                src="/logo.png" 
                alt="LMJ India Foundation Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-bold text-sm">LMJ</span>';
                }}
              />
            </div>
            <span className="text-2xl font-playfair font-bold">LMJ India Foundation</span>
          </div>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto fade-in opacity-0 translate-y-8">
            Together, We Can Shape a Sustainable Future. Every contribution helps transform lives and preserve our shared heritage.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8 fade-in opacity-0 translate-y-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition">About</button>
            <button onClick={() => scrollToSection('founder')} className="text-gray-400 hover:text-white transition">Founder</button>
            <button onClick={() => scrollToSection('patrons')} className="text-gray-400 hover:text-white transition">Patrons</button>
            <button onClick={() => scrollToSection('members')} className="text-gray-400 hover:text-white transition">Members</button>
            <button onClick={() => scrollToSection('programs')} className="text-gray-400 hover:text-white transition">Programs</button>
            <button onClick={() => router.push('/gallery')} className="text-gray-400 hover:text-white transition">Gallery</button>
          </div>
          
          <div className="border-t border-gray-800 pt-8 fade-in opacity-0 translate-y-8">
            <p className="text-gray-500">&copy; LMJ India Foundation. All rights reserved. | Empowering Communities Across India</p>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
          onClick={(e) => {
            // Only close if clicking the backdrop (not modal content)
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{modalContent.title}</h3>
            <p className="text-gray-600 mb-6">{modalContent.text}</p>

            {/* Payment Details Section (only for 'donate' type) */}
            {modalContent.type === 'donate' && (
              <div className="space-y-6 mb-8">
                {/* UPI ID Section */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">UPI Payment</h4>
                      <p className="text-gray-600 text-sm">Use this ID in any UPI app</p>
                    </div>
                    <div className="text-3xl">📱</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">UPI ID</p>
                        <p className="font-mono font-bold text-lg text-gray-900">lmjindia@ybl</p>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('lmjindia@ybl');
                          alert('UPI ID copied to clipboard!');
                        }}
                        className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition text-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bank Details Section */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Bank Transfer</h4>
                      <p className="text-gray-600 text-sm">NEFT / RTGS / IMPS</p>
                    </div>
                    <div className="text-3xl">🏦</div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-500">Account Name</p>
                      <p className="font-semibold text-gray-900">Lakshmishwar Manjula Jha Foundation</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Account Number</p>
                      <p className="font-mono font-bold text-gray-900">50200108839761</p>
                    </div>
                    <div>
                      <p className="text-gray-500">IFSC Code</p>
                      <p className="font-mono font-bold text-gray-900">HDFC0004113</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Bank & Branch</p>
                      <p className="font-semibold text-gray-900">HDFC Bank, Defence Colony, New Delhi</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const details = `Account Name: Lakshmishwar Manjula Jha Foundation\nAccount No: 50200108839761\nIFSC: HDFC0004113\nBank: HDFC Bank, Defence Colony, New Delhi`;
                      navigator.clipboard.writeText(details);
                      alert('Bank details copied to clipboard!');
                    }}
                    className="w-full mt-4 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    Copy All Bank Details
                  </button>
                </div>

                {/* Security Message */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r">
                  <p className="text-sm text-gray-800 font-semibold mb-1">⚠️ Very Important Security Check</p>
                  <p className="text-xs text-gray-700">
                    After entering the UPI ID or bank details, please verify that the payee name is <strong className="text-gray-900">LAKHMISHWAR MANJULA JHA FOUNDATION</strong> before confirming payment.
                    <br />
                    <strong>WE WILL NEVER ASK</strong> for your UPI PIN, ATM PIN, CVV, or OTP for receiving donations.
                  </p>
                </div>
              </div>
            )}

            {/* Modal action buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              {modalContent.type === 'member' && (
                <button 
                  onClick={() => {
                    handleMemberApply();
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition font-semibold"
                >
                  Apply for Membership
                </button>
              )}
              {modalContent.type === 'volunteer' && (
                <button 
                  onClick={handleVolunteerApply}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  Volunteer Now
                </button>
              )}
              <button 
                onClick={closeModal}
                className={`${modalContent.type === 'member' || modalContent.type === 'volunteer' ? 'flex-1' : 'w-full'} bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isMemberModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
          onClick={(e) => {
            // Only close if clicking the backdrop (not modal content)
            if (e.target === e.currentTarget) {
              closeMemberModal();
            }
          }}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Become a Member</h3>
            <p className="text-gray-600 mb-6">Join our community of changemakers. Fill out the form below and we'll get back to you soon.</p>
            
            <form onSubmit={submitMemberForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={memberForm.name}
                  onChange={handleMemberFormChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={memberForm.email}
                  onChange={handleMemberFormChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={memberForm.phone}
                  onChange={handleMemberFormChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                <input 
                  type="text" 
                  name="profession"
                  value={memberForm.profession}
                  onChange={handleMemberFormChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                  placeholder="What do you do?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={memberForm.location}
                  onChange={handleMemberFormChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                  placeholder="Where are you located?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to become a member? *</label>
                <textarea 
                  name="message"
                  value={memberForm.message}
                  onChange={handleMemberFormChange}
                  required
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                  placeholder="Tell us about your motivation to join LMJ India Foundation..."
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={closeMemberModal}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition font-semibold"
                >
                  Submit Application
                </button>
              </div>
            </form>
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
        
        /* Mobile-specific fixes */
        @media (max-width: 768px) {
          button, input, textarea, select {
            min-height: 44px; /* Minimum touch target size */
          }
          
          input, textarea {
            font-size: 16px !important; /* Prevents iOS zoom */
          }
          
          .modal-content {
            max-height: 80vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
          }
        }
        
        /* Prevent blue highlight on tap for mobile */
        button, a {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}
