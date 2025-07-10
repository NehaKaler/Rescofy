'use client'

import { useState } from 'react'
import { Heart, DollarSign, Users, MessageCircle, Send } from 'lucide-react'

export default function SupportPage() {
  const [donationAmount, setDonationAmount] = useState('')
  const [donationMessage, setDonationMessage] = useState('')
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    interests: ''
  })
  const [dogLoves, setDogLoves] = useState<{[key: number]: number}>({})
  const [dogMessages, setDogMessages] = useState<{[key: number]: string[]}>({})
  const [currentMessage, setCurrentMessage] = useState('')
  const [selectedDog, setSelectedDog] = useState<number | null>(null)

  const dogs = [
    { id: 1, name: 'Buddy', breed: 'Golden Retriever', age: 3, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop' },
    { id: 2, name: 'Luna', breed: 'Border Collie', age: 2, image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=300&fit=crop' },
    { id: 3, name: 'Max', breed: 'German Shepherd', age: 4, image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop' },
    { id: 4, name: 'Bella', breed: 'Labrador', age: 1, image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop' },
    { id: 5, name: 'Charlie', breed: 'Beagle', age: 5, image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=300&fit=crop' },
    { id: 6, name: 'Daisy', breed: 'Poodle', age: 2, image: 'https://images.unsplash.com/photo-1616190264687-b7ebf7aa703d?w=300&h=300&fit=crop' },
    { id: 7, name: 'Rocky', breed: 'Bulldog', age: 3, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop' },
    { id: 8, name: 'Molly', breed: 'Husky', age: 2, image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop' }
  ]

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for your donation of $${donationAmount}!`)
    setDonationAmount('')
    setDonationMessage('')
  }

  const handleVolunteer = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you ${volunteerForm.name}! We'll be in touch soon.`)
    setVolunteerForm({ name: '', email: '', phone: '', interests: '' })
  }

  const sendLove = (dogId: number) => {
    setDogLoves(prev => ({
      ...prev,
      [dogId]: (prev[dogId] || 0) + 1
    }))
  }

  const sendMessage = (dogId: number) => {
    if (currentMessage.trim()) {
      setDogMessages(prev => ({
        ...prev,
        [dogId]: [...(prev[dogId] || []), currentMessage.trim()]
      }))
      setCurrentMessage('')
      setSelectedDog(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Support Our Mission
          </h1>
          <p className="text-lg text-gray-600 text-center mt-2">
            Help us care for dogs in need through donations, volunteering, and spreading love
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Donate Section */}
        <section id="donate" className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Make a Donation</h2>
          </div>
          
          <form onSubmit={handleDonation} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="50"
                    min="1"
                    required
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[25, 50, 100, 250].map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount.toString())}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Leave a message of support..."
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
            >
              Donate Now
            </button>
          </form>
        </section>

        {/* Volunteer Section */}
        <section id="volunteer" className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Volunteer With Us</h2>
          </div>
          
          <form onSubmit={handleVolunteer} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Interest
                </label>
                <textarea
                  value={volunteerForm.interests}
                  onChange={(e) => setVolunteerForm({...volunteerForm, interests: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dog walking, training, events, fundraising..."
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Sign Up to Volunteer
            </button>
          </form>
        </section>

        {/* Send Love Section */}
        <section id="send-love" className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl font-bold text-gray-900">Send Love to Our Dogs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dogs.map(dog => (
              <div key={dog.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={dog.image}
                    alt={dog.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg">
                    <span className="text-sm font-semibold text-pink-600">
                      {dogLoves[dog.id] || 0} ❤️
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900">{dog.name}</h3>
                  <p className="text-gray-600">{dog.breed} • {dog.age} years old</p>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => sendLove(dog.id)}
                      className="flex-1 bg-pink-100 text-pink-700 py-2 px-4 rounded-lg hover:bg-pink-200 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      Send ❤️
                    </button>
                    
                    <button
                      onClick={() => setSelectedDog(dog.id)}
                      className="bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {dogMessages[dog.id] && dogMessages[dog.id].length > 0 && (
                    <div className="mt-3 space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">Messages:</h4>
                      {dogMessages[dog.id].slice(-2).map((message, index) => (
                        <p key={index} className="text-sm text-gray-600 bg-blue-50 p-2 rounded italic">
                          "{message}"
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Modal */}
          {selectedDog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Send a message to {dogs.find(d => d.id === selectedDog)?.name}
                </h3>
                
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Write a supportive message..."
                  maxLength={200}
                />
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => sendMessage(selectedDog)}
                    className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedDog(null)
                      setCurrentMessage('')
                    }}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}