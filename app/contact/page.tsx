'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert(`Thank you ${formData.name}! Your message has been sent. We'll get back to you soon.`)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@pawsrescue.org', 'volunteer@pawsrescue.org'],
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Hope Street', 'Rescue City, RC 12345'],
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat-Sun: 10:00 AM - 4:00 PM'],
      color: 'text-orange-600'
    }
  ]

  const faqData = [
    {
      question: 'How can I adopt a dog?',
      answer: 'Visit our adoption page to browse available dogs, fill out an application, and schedule a meet-and-greet. Our adoption process typically takes 3-5 business days.'
    },
    {
      question: 'What should I bring when visiting?',
      answer: 'Bring a valid ID, proof of address, and if you have other pets, bring their vaccination records. We also recommend bringing family members who will interact with the dog.'
    },
    {
      question: 'Do you accept donations?',
      answer: 'Yes! We accept monetary donations, dog food, toys, blankets, and cleaning supplies. Check our support page for a full list of needed items.'
    },
    {
      question: 'Can I volunteer if I have no experience?',
      answer: 'Absolutely! We provide training for all volunteers. Whether you want to help with dog walking, events, or administrative tasks, we have opportunities for everyone.'
    },
    {
      question: 'What if I found a stray dog?',
      answer: 'Contact us immediately at our emergency line. We can guide you through the process and help determine if the dog is microchipped or reported missing.'
    },
    {
      question: 'Do you provide emergency care?',
      answer: 'We are not an emergency veterinary clinic, but we can provide referrals to local emergency vets and may assist with medical costs for dogs in our care.'
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 text-center mt-2">
            We're here to help and would love to hear from you
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <info.icon className={`w-8 h-8 ${info.color}`} />
                <h3 className="text-xl font-bold text-gray-900">{info.title}</h3>
              </div>
              <div className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="adoption">Adoption Inquiry</option>
                  <option value="volunteer">Volunteer Interest</option>
                  <option value="donation">Donation Question</option>
                  <option value="lost-found">Lost & Found</option>
                  <option value="general">General Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Need immediate help?</strong> Call our emergency line at{' '}
                <span className="font-semibold">+1 (555) 999-0000</span> for urgent matters.
              </p>
            </div>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            {/* Embedded Map */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-purple-600" />
                Visit Us
              </h3>
              
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.398920869!2d-74.0059413!3d40.7127837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  <strong>Parking:</strong> Free parking available on-site
                </p>
                <p className="text-gray-700">
                  <strong>Public Transit:</strong> Bus lines 12, 34, and 56 stop nearby
                </p>
                <p className="text-gray-700">
                  <strong>Accessibility:</strong> Wheelchair accessible entrance and facilities
                </p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">Emergency Contact</h3>
              <p className="text-red-100 mb-3">
                For urgent matters involving injured or distressed animals
              </p>
              <div className="text-2xl font-bold">+1 (555) 999-0000</div>
              <p className="text-sm text-red-100 mt-2">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't see your question?{' '}
              <a href="#contact-form" className="text-blue-600 hover:text-blue-700 font-medium">
                Send us a message
              </a>{' '}
              and we'll get back to you!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}