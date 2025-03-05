'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { payloadClient } from '@/lib/payload-client'
import Image from 'next/image'

export default function AddLawyerProfile() {
  const [formData, setFormData] = useState({
    profile_picture: '',
    full_name: '',
    designation: '',
    location: {
      country: 'Bangladesh',
      division: '',
      district: '',
      upazila: ''
    },
    email: '',
    mobile_number: '',
    years_of_experience: '',
    specialization: [] as string[],
    availability: [{ date: '', time: '' }]
  })
  const [previewImage, setPreviewImage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, profile_picture: file as any })
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const addAvailabilitySlot = () => {
    setFormData({
      ...formData,
      availability: [...formData.availability, { date: '', time: '' }]
    })
  }

  const handleAvailabilityChange = (index: number, field: string, value: string) => {
    const newAvailability = formData.availability.map((slot, i) => {
      if (i === index) {
        return { ...slot, [field]: value }
      }
      return slot
    })
    setFormData({ ...formData, availability: newAvailability })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await payloadClient.create({
        collection: 'lawyers-profile',
        data: formData
      })
      router.push('/lawyers')
    } catch (err) {
      setError('Failed to create lawyer profile')
    }
  }

  return (
    <div className="laywer-profile min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Lawyer Profile</h1>
          <p className="text-lg text-gray-600">Share your expertise with those who need it</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-6 pb-10 border-b border-gray-100">
              <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-indigo-100 shadow-lg group transition-all duration-300 hover:shadow-2xl">
                {previewImage ? (
                  <Image src={previewImage} alt="Profile preview" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                    <svg className="w-20 h-20 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm">Change Photo</span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-picture"
              />
              <label
                htmlFor="profile-picture"
                className="cursor-pointer py-3 px-6 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Upload Profile Picture
              </label>
            </div>

            {/* New Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="col-span-2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h2>
              </div>
              
              <div className="relative group">
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="peer w-full px-4 py-3 rounded-lg border-2 border-gray-200 placeholder-transparent focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Full Name"
                  required
                  id="full_name"
                />
                <label
                  htmlFor="full_name"
                  className="absolute left-2 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all 
                           peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                           peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                           peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm 
                           peer-focus:text-indigo-600"
                >
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="peer w-full px-4 py-3 rounded-lg border-2 border-gray-200 placeholder-transparent focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Designation"
                  required
                  id="designation"
                />
                <label
                  htmlFor="designation"
                  className="absolute left-2 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all 
                           peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                           peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                           peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm 
                           peer-focus:text-indigo-600"
                >
                  Designation
                </label>
              </div>
            </div>

            {/* New Location Section with Floating Labels */}
            <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(formData.location).map(([key, value]) => (
                  key !== 'country' && (
                    <div key={key} className="relative group">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setFormData({
                          ...formData,
                          location: { ...formData.location, [key]: e.target.value }
                        })}
                        className="peer w-full px-4 py-3 rounded-lg border-2 border-gray-200 placeholder-transparent focus:border-indigo-500 focus:outline-none transition-colors"
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        required
                        id={key}
                      />
                      <label
                        htmlFor={key}
                        className="absolute left-2 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all 
                                 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                                 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                                 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm 
                                 peer-focus:text-indigo-600"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Specialization Section */}
            <div className="space-y-8 pt-10 border-t border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Professional Information</h2>
              
              {/* Specialization */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Corporate Law", "Criminal Law", "Family Law", "Intellectual Property", "Tax Law"].map((spec) => (
                    <label key={spec} className="relative flex items-center p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-indigo-50 transition-colors">
                      <input
                        type="checkbox"
                        value={spec}
                        checked={formData.specialization.includes(spec)}
                        onChange={(e) => {
                          const newSpec = e.target.checked
                            ? [...formData.specialization, spec]
                            : formData.specialization.filter(s => s !== spec);
                          setFormData({ ...formData, specialization: newSpec });
                        }}
                        className="hidden"
                      />
                      <span className="flex items-center">
                        <span className={`w-4 h-4 mr-3 rounded-full border-2 ${formData.specialization.includes(spec) ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`} />
                        <span className={`text-sm ${formData.specialization.includes(spec) ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>
                          {spec}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* New Availability Section */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Availability Schedule
              </h3>
              <div className="space-y-4">
                {formData.availability.map((slot, index) => (
                  <div key={index} 
                    className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <input
                        type="date"
                        value={slot.date}
                        onChange={(e) => handleAvailabilityChange(index, 'date', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={slot.time}
                        placeholder="e.g., 10:00 AM - 12:00 PM"
                        onChange={(e) => handleAvailabilityChange(index, 'time', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAvailabilitySlot}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Time Slot
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 rounded-lg flex items-center text-red-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" />
                </svg>
                {error}
              </div>
            )}

            <div className="flex justify-end pt-8 border-t border-gray-100">
              <button
                type="submit"
                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg 
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
                         transition-all duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}