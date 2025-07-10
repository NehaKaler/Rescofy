// Landing Page 
// UI sections need to be imported from components folder 

// pages/index.tsx or app/page.tsx (depending on your Next.js version)
'use client'; // Add this if using Next.js 13+ App Router

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Home, Gift, Shield, Users, Search, MapPin, Mail, Phone, Facebook, Twitter, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

// Types
interface SuccessStory {
  id: number;
  dogName: string;
  image: string;
  story: string;
  family: string;
  age?: string;
  breed?: string;
}

interface HelpCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface NavItem {
  label: string;
  href: string;
  onClick?: () => void;
}

const LandingPage: React.FC = () => {
  const [currentStory, setCurrentStory] = useState<number>(0);
  const [zipCode, setZipCode] = useState<string>('');
  
  // Success stories data
  const successStories: SuccessStory[] = [
    {
      id: 1,
      dogName: "Max",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      story: "Max found his forever home with the Johnson family. He now enjoys long walks and playing with their kids.",
      family: "The Johnson Family",
      age: "3 years old",
      breed: "Golden Retriever Mix"
    },
    {
      id: 2,
      dogName: "Bella",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop",
      story: "Bella was rescued from difficult conditions and now thrives in her loving home with Sarah and Tom.",
      family: "Sarah & Tom",
      age: "2 years old",
      breed: "Border Collie Mix"
    },
    {
      id: 3,
      dogName: "Rocky",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop",
      story: "Rocky overcame his fear of people and found a patient family who helped him heal and trust again.",
      family: "The Martinez Family",
      age: "5 years old",
      breed: "German Shepherd Mix"
    }
  ];

  // Help cards data
  const helpCards: HelpCard[] = [
    {
      icon: <Home className="w-8 h-8 text-white" />,
      title: "Adopt",
      description: "Give a dog a forever home and gain a loyal companion for life. Browse our available dogs and find your perfect match."
    },
    {
      icon: <Gift className="w-8 h-8 text-white" />,
      title: "Donate",
      description: "Support our mission with a financial contribution. Every donation helps us provide food, medical care, and shelter for dogs in need."
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Report Abuse",
      description: "Help us protect dogs from harm by reporting suspected abuse or neglect. Your vigilance can save a life."
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Volunteer",
      description: "Join our team of dedicated volunteers. Help with walking, feeding, training, and socializing dogs while they wait for their forever homes."
    }
  ];

  // Navigation scroll handler
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Carousel navigation
  const nextStory = (): void => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = (): void => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  // Handle form submissions
  const handleFindShelters = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Finding shelters for:', zipCode);
    // Add your shelter search logic here
  };

  const handleUseLocation = (): void => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location:', position.coords.latitude, position.coords.longitude);
          // Add your location-based search logic here
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleDonate = (): void => {
    // Add donation logic here
    console.log('Redirect to donation page');
  };

  const handleTakeAction = (): void => {
    // Add take action logic here
    console.log('Take action clicked');
  };

  return (
    <div className="min-h-screen bg-[#FDF2DF] text-[#3D3D3D]">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#F48A36] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#5A3825]">Adopto</span>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-[#5A3825] hover:text-[#F48A36] transition-colors duration-200"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('adopt')} 
                className="text-[#5A3825] hover:text-[#F48A36] transition-colors duration-200"
              >
                Adopt
              </button>
              <button 
                onClick={() => scrollToSection('donate')} 
                className="text-[#5A3825] hover:text-[#F48A36] transition-colors duration-200"
              >
                Donate
              </button>
              <button 
                onClick={() => scrollToSection('report')} 
                className="text-[#5A3825] hover:text-[#F48A36] transition-colors duration-200"
              >
                Report
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-[#5A3825] hover:text-[#F48A36] transition-colors duration-200"
              >
                Contact
              </button>
            </div>

            {/* Donate Now Button */}
            <button 
              onClick={handleDonate}
              className="bg-[#F48A36] text-white px-6 py-2 rounded-full hover:bg-[#E5793A] transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Donate Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920&h=1080&fit=crop"
            alt="Dog in grass"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Every Dog Deserves a Home, a Family, and Love
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have found their perfect companion through Adopto. 
            Make a difference in a dog's life today.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('adopt')}
              className="bg-[#F48A36] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#E5793A] transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              View Dogs
            </button>
            <button 
              onClick={() => scrollToSection('donate')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-200 transform hover:scale-105 border-2 border-white/50"
            >
              Donate
            </button>
          </div>
        </div>
      </section>

      {/* How You Can Help Section */}
      <section id="adopt" className="py-20 bg-[#FDF2DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#5A3825] mb-4">How You Can Help</h2>
            <p className="text-lg text-[#999999] max-w-2xl mx-auto">
              There are many ways to make a difference in the lives of dogs in need. 
              Choose the way that works best for you.
            </p>
          </div>

          {/* Help Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCards.map((card, index) => (
              <div 
                key={index}
                className="bg-[#F6E8D7] rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-[#F48A36] rounded-full flex items-center justify-center mx-auto mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#5A3825] mb-3">{card.title}</h3>
                <p className="text-[#999999] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#5A3825] mb-4">Success Stories</h2>
            <p className="text-lg text-[#999999] max-w-2xl mx-auto">
              These heartwarming stories show the incredible impact of adoption. 
              Each dog found their perfect family and a second chance at happiness.
            </p>
          </div>

          {/* Stories Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-[#F6E8D7] rounded-xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Story Image */}
                <div className="order-2 md:order-1">
                  <div className="relative w-full h-64 md:h-80">
                    <Image
                      src={successStories[currentStory].image}
                      alt={successStories[currentStory].dogName}
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                {/* Story Content */}
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-[#5A3825] mb-4">
                    {successStories[currentStory].dogName}&apos;s Story
                  </h3>
                  <p className="text-[#999999] text-lg leading-relaxed mb-6">
                    {successStories[currentStory].story}
                  </p>
                  <p className="text-[#F48A36] font-semibold text-lg">
                    - {successStories[currentStory].family}
                  </p>
                  {successStories[currentStory].age && (
                    <p className="text-[#999999] text-sm mt-2">
                      {successStories[currentStory].age} • {successStories[currentStory].breed}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <button 
              onClick={prevStory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-6 h-6 text-[#5A3825]" />
            </button>
            
            <button 
              onClick={nextStory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
              aria-label="Next story"
            >
              <ChevronRight className="w-6 h-6 text-[#5A3825]" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentStory ? 'bg-[#F48A36]' : 'bg-[#999999]'
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find a Shelter Section */}
      <section id="report" className="py-20 bg-[#FDF2DF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#5A3825] mb-4">Find a Shelter Near You</h2>
          <p className="text-lg text-[#999999] mb-12 max-w-2xl mx-auto">
            Locate nearby shelters and rescue organizations in your area. 
            Find the perfect place to meet your future furry friend.
          </p>

          {/* Search Form */}
          <form onSubmit={handleFindShelters} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input 
                  type="text" 
                  placeholder="Enter your ZIP code or city"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-full border-2 border-[#F6E8D7] focus:border-[#F48A36] focus:outline-none text-lg"
                />
              </div>
              <button 
                type="submit"
                className="bg-[#F48A36] text-white px-8 py-4 rounded-full hover:bg-[#E5793A] transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Find Shelters
              </button>
            </div>
          </form>
          
          <button 
            onClick={handleUseLocation}
            className="mt-6 text-[#F48A36] hover:text-[#E5793A] transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
          >
            <MapPin className="w-4 h-4" />
            Use my current location
          </button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="donate" className="py-20 bg-[#5A3825] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Every action you take, whether it&apos;s adopting, donating, or volunteering, 
            creates a ripple effect of love and hope. Join our mission to ensure 
            every dog finds the loving home they deserve.
          </p>
          <button 
            onClick={handleTakeAction}
            className="bg-[#F48A36] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#E5793A] transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Take Action Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#3D3D3D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Column */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-[#F48A36] rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Adopto</span>
              </div>
              <p className="text-[#999999] leading-relaxed">
                Connecting loving families with dogs in need since 2020. 
                Our mission is to ensure every dog finds their forever home.
              </p>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3 text-[#999999]">
                <li>
                  <a href="#" className="hover:text-[#F48A36] transition-colors duration-200">
                    Adoption Process
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F48A36] transition-colors duration-200">
                    Dog Care Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F48A36] transition-colors duration-200">
                    Training Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F48A36] transition-colors duration-200">
                    Volunteer Program
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-[#999999]">
                <li>
                  <a href="#" className="hover:text-[#F48A36] transition-colors duration-200">
                    Available Dogs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F48A36] transition-colors duration-200">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F48A36] transition-colors duration-200">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F48A36] transition-colors duration-200">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-[#999999]">
                  <Mail className="w-5 h-5" />
                  <span>hello@adopto.org</span>
                </div>
                <div className="flex items-center space-x-3 text-[#999999]">
                  <Phone className="w-5 h-5" />
                  <span>(555) 123-4567</span>
                </div>
                
                {/* Social Media Icons */}
                <div className="flex space-x-4 pt-4">
                  <a 
                    href="#" 
                    className="text-[#999999] hover:text-[#F48A36] transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="#" 
                    className="text-[#999999] hover:text-[#F48A36] transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a 
                    href="#" 
                    className="text-[#999999] hover:text-[#F48A36] transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#999999]/20 mt-12 pt-8 text-center text-[#999999]">
            <p>&copy; 2025 Adopto. All rights reserved. Made with ❤️ for dogs in need.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;