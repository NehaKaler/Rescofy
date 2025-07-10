'use client'

import { useState } from 'react'
import { Heart, Shield, Home, Truck, CreditCard, Calendar, Star, Users, Award, Phone, Mail, MapPin } from 'lucide-react'

interface DonationFormData {
  name: string
  email: string
  amount: string
  customAmount: string
  paymentMethod: string
  donationType: 'one-time' | 'monthly'
}

interface ImpactStat {
  number: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface Testimonial {
  name: string
  text: string
  dogName: string
  rating: number
}

export default function DonatePage() {
  const [formData, setFormData] = useState<DonationFormData>({
    name: '',
    email: '',
    amount: '',
    customAmount: '',
    paymentMethod: 'card',
    donationType: 'one-time'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const presetAmounts = [
    { value: '100', label: '₹100', description: 'Feeds 1 dog for a week' },
    { value: '500', label: '₹500', description: 'Vaccination for 2 dogs' },
    { value: '1000', label: '₹1000', description: 'Emergency medical care' },
    { value: 'custom', label: 'Custom', description: 'Enter your amount' }
  ]

  const impactStats: ImpactStat[] = [
    { number: '120+', label: 'Dogs rescued last month', icon: Heart },
    { number: '850+', label: 'Successful adoptions', icon: Home },
    { number: '2,500+', label: 'Medical treatments', icon: Shield },
    { number: '50+', label: 'Partner shelters', icon: Users }
  ]

  const testimonials: Testimonial[] = [
    {
      name: 'Priya Sharma',
      text: 'Thanks to this platform, I adopted Bruno who was rescued from the streets. He\'s now healthy and brings so much joy to our family.',
      dogName: 'Bruno',
      rating: 5
    },
    {
      name: 'Raj Patel',
      text: 'I\'ve been donating monthly for 2 years. Seeing the rescue updates and knowing I\'m helping save lives makes it all worthwhile.',
      dogName: 'Multiple rescues',
      rating: 5
    },
    {
      name: 'Anita Reddy',
      text: 'The transparency in how donations are used is incredible. I can see exactly how my contribution helped with medical bills.',
      dogName: 'Moti',
      rating: 5
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAmountSelect = (amount: string) => {
    setFormData(prev => ({
      ...prev,
      amount,
      customAmount: amount === 'custom' ? prev.customAmount : ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setShowThankYou(true)
  }

  const getFinalAmount = () => {
    return formData.amount === 'custom' ? formData.customAmount : formData.amount
  }

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-2xl p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-green-600 fill-current" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Being a Lifeline! 🐾
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your generous {formData.donationType} donation of ₹{getFinalAmount()} will directly help rescue and care for dogs in need.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <strong>What happens next:</strong> You'll receive a confirmation email with your donation receipt. 
              We'll also send you updates on how your contribution is making a difference.
            </p>
          </div>
          
          <div className="text-center space-y-2 text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              help@rescuepaws.org
            </p>
            <p className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </p>
          </div>
          
          <button
            onClick={() => setShowThankYou(false)}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=600&fit=crop"
            alt="Rescued dog"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Be Their <span className="text-orange-600">Lifeline</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Every donation rescues a life, heals a heart, and brings hope to dogs who need it most.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Emergency Medical Care</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
              <Home className="w-5 h-5 text-blue-500" />
              <span>Safe Shelter</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
              <Truck className="w-5 h-5 text-green-500" />
              <span>Rescue Operations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your Impact in Numbers
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Your Donation Matters
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Medical Care</h3>
                    <p className="text-gray-600">
                      Injured and sick dogs need immediate medical attention. Your donation covers surgeries, 
                      medications, and ongoing treatment for rescued animals.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe Shelter & Food</h3>
                    <p className="text-gray-600">
                      Every dog deserves a warm, safe place to recover. We provide temporary shelters, 
                      nutritious food, and clean water while they wait for their forever homes.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Rescue Operations</h3>
                    <p className="text-gray-600">
                      Our rescue teams work around the clock to save dogs from dangerous situations. 
                      Transportation, equipment, and coordination all require funding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=300&h=300&fit=crop"
                alt="Rescued dog receiving care"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop"
                alt="Happy rescued dog"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Make a Donation
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Donation Type Toggle */}
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, donationType: 'one-time' }))}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      formData.donationType === 'one-time'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, donationType: 'monthly' }))}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      formData.donationType === 'monthly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Monthly
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Choose Amount
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => handleAmountSelect(preset.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.amount === preset.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg font-bold text-gray-900">{preset.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{preset.description}</div>
                    </button>
                  ))}
                </div>
                
                {formData.amount === 'custom' && (
                  <div className="mt-4">
                    <input
                      type="number"
                      name="customAmount"
                      value={formData.customAmount}
                      onChange={handleInputChange}
                      placeholder="Enter custom amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className={`p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Credit/Debit Card</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                    className={`p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
                    <span>UPI</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'netbanking' }))}
                    className={`p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${
                      formData.paymentMethod === 'netbanking'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-5 h-5 bg-blue-500 rounded"></div>
                    <span>Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.amount || !formData.name || !formData.email}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    Donate ₹{getFinalAmount()} {formData.donationType === 'monthly' ? '/month' : ''}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Stories from Our Community
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">Helped: {testimonial.dogName}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RescuePaws</h3>
              <p className="text-gray-300 mb-4">
                Dedicated to rescuing, rehabilitating, and rehoming dogs in need across India.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  help@rescuepaws.org
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Mumbai, India
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Transparency</h4>
              <div className="space-y-2 text-gray-300">
                <p>• All donations are tax-deductible</p>
                <p>• Monthly impact reports</p>
                <p>• 80G certification available</p>
                <p>• Audit reports published</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Recognition</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  NGO of the Year 2023
                </p>
                <p>• Registered under Section 12A</p>
                <p>• FCRA approved</p>
                <p>• 4.8/5 rating from donors</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RescuePaws. All rights reserved. Made with ❤️ for our four-legged friends.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}