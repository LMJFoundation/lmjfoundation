// app/gallery/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // List of images in your public/gallery folder
  useEffect(() => {
    // Add your actual image file names here from public/gallery/
    const galleryImages = [
      "/gallery/image1.jpg",
      "/gallery/image2.jpg", 
      "/gallery/image3.jpg",
      "/gallery/image4.jpg",
      "/gallery/image5.jpg",
      "/gallery/image6.jpg",
    ];
    
    setImages(galleryImages);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-inter">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
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
              <span className="font-playfair text-xl font-bold text-gray-900">LMJ India Foundation</span>
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-medium transition hover-lift px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-playfair text-5xl lg:text-7xl font-bold mb-6">
              Our Journey in <span className="text-orange-300">Pictures</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Explore the moments that define our mission. Every image tells a story of 
              empowerment, community, and transformation.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {images.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="relative group cursor-pointer fade-in opacity-0 translate-y-8"
                onClick={() => setSelectedImage(src)}
              >
                <div className="aspect-square overflow-hidden rounded-3xl bg-gray-100 border border-gray-200 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-end p-6">
                  <span className="text-white font-medium text-lg">
                    Image {index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Counter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 fade-in opacity-0 translate-y-8"
          >
            <div className="inline-block bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl px-8 py-4">
              <p className="text-lg text-gray-700">
                Showing <span className="font-bold text-purple-600 text-xl">{images.length}</span> images
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 border-t border-orange-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="fade-in opacity-0 translate-y-8"
          >
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">
              Want to See More?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Stay tuned for more updates from our ongoing initiatives and community work.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all hover-lift shadow-lg"
            >
              <span>←</span>
              <span>Return to Home</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
          
          <p className="text-gray-400 max-w-2xl mx-auto fade-in opacity-0 translate-y-8">
            Together, We Can Shape a Sustainable Future.
          </p>
          
          <div className="border-t border-gray-800 pt-8 mt-8 fade-in opacity-0 translate-y-8">
            <p className="text-gray-500">&copy; LMJ India Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl z-10 hover:scale-110 transition bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
          <div className="max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .hover-lift { transition: all 0.3s ease; }
        .hover-lift:hover { transform: translateY(-3px); }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        .fade-in {
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
      `}</style>
    </div>
  );
}
