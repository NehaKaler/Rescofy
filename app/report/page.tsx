'use client';

import { useState, useEffect, FormEvent, ChangeEvent, DragEvent, JSX } from 'react';
import { MapPin, Upload, AlertCircle, CheckCircle, Camera, FileVideo, Phone, Mail } from 'lucide-react';

interface FormData {
  description: string;
  address: string;
  name: string;
  email: string;
  files: File[];
}

interface Location {
  lat: number;
  lng: number;
}

interface Shelter {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export default function ReportPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    description: '',
    address: '',
    name: '',
    email: '',
    files: []
  });
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [connectedShelter, setConnectedShelter] = useState<Shelter | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Simulate shelter database
  const shelters: Shelter[] = [
    { id: 1, name: 'City Animal Protection Services', phone: '(555) 123-4567', email: 'emergency@cityaps.org' },
    { id: 2, name: 'Humane Society Emergency Response', phone: '(555) 987-6543', email: 'report@humanesociety.org' },
    { id: 3, name: 'Animal Control & Welfare Department', phone: '(555) 456-7890', email: 'intake@animalcontrol.gov' }
  ];

  useEffect(() => {
    // Auto-detect location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Simulate reverse geocoding
          setFormData(prev => ({
            ...prev,
            address: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          }));
        },
        (error: GeolocationPositionError) => {
          setLocationError('Location access denied. Please enter address manually.');
        }
      );
    } else {
      setLocationError('Geolocation not supported by this browser.');
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (files: FileList | null): void => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      const isValid = file.type.startsWith('image/') || file.type.startsWith('video/');
      return isValid && file.size <= 50 * 1024 * 1024; // 50MB limit
    });
    
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles].slice(0, 5) // Max 5 files
    }));
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number): void => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call and shelter connection
    setTimeout(() => {
      const randomShelter = shelters[Math.floor(Math.random() * shelters.length)];
      setConnectedShelter(randomShelter);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const detectLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setFormData(prev => ({
            ...prev,
            address: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          }));
          setLocationError('');
        },
        (error: GeolocationPositionError) => {
          setLocationError('Unable to detect location. Please check your browser settings.');
        }
      );
    }
  };

  if (submitted && connectedShelter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Submitted Successfully</h1>
              <p className="text-gray-600">Your report has been received and processed.</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Connected with Nearest Shelter</h3>
              <div className="text-left">
                <p className="font-medium text-blue-800 mb-2">{connectedShelter.name}</p>
                <div className="flex items-center text-blue-700 mb-1">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{connectedShelter.phone}</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{connectedShelter.email}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Reference ID:</strong> RPT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="text-sm text-yellow-700 mt-2">
                Please save this reference ID for your records. The shelter will contact you within 24 hours if additional information is needed.
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">Report Dog Abuse</h1>
            <p className="text-blue-100">Help us protect animals in need. Your report will be handled confidentially.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description of Incident *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Please describe what you witnessed, including date, time, and specific details..."
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photos/Videos (Optional)
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to select</p>
                <p className="text-sm text-gray-500">Supports images and videos up to 50MB each (max 5 files)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer mt-2"
                >
                  Select Files
                </label>
              </div>
              
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.files.map((file: File, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        {file.type.startsWith('image/') ? (
                          <Camera className="w-5 h-5 text-gray-500 mr-2" />
                        ) : (
                          <FileVideo className="w-5 h-5 text-gray-500 mr-2" />
                        )}
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location/Address *
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address or coordinates..."
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Detect current location"
                >
                  <MapPin className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              {locationError && (
                <p className="mt-2 text-sm text-amber-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {locationError}
                </p>
              )}
              {location && (
                <p className="mt-2 text-sm text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Location detected successfully
                </p>
              )}
            </div>

            {/* Optional Contact Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information (Optional)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Providing contact information helps authorities follow up if needed. This information will be kept confidential.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || !formData.description || !formData.address}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Report...
                  </div>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p className="mb-2">
                <strong>Important:</strong> If this is an emergency situation where an animal is in immediate danger, please contact local authorities or emergency services directly.
              </p>
              <p>
                All reports are taken seriously and will be investigated promptly. False reports may result in legal consequences.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}