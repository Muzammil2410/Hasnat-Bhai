'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ChevronLeft, ChevronRight, Upload, Check, User, Building2, FileText, Tag, Eye } from 'lucide-react'
import Image from 'next/image'

const steps = [
  { id: 1, title: 'Basic Info', icon: User },
  { id: 2, title: 'Business Info', icon: Building2 },
  { id: 3, title: 'Documents', icon: FileText },
  { id: 4, title: 'Categories', icon: Tag },
  { id: 5, title: 'Review', icon: Eye }
]

const categories = [
  'Electronics', 'Clothing', 'Books', 'Cosmetics', 'Home & Kitchen',
  'Sports & Outdoors', 'Toys & Games', 'Beauty & Health', 'Food & Drink',
  'Hobbies & Crafts', 'Automotive', 'Health & Personal Care'
]

export default function SellerRegister() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    email: '',
    phone: '',
    password: '',
    businessName: '',
    
    // Business Info
    businessType: 'Individual',
    ntnTaxId: '',
    businessAddress: '',
    warehouseAddress: '',
    
    // Documents
    documents: {
      businessLicense: null,
      taxCertificate: null,
      bankStatement: null,
      idCard: null
    },
    
    // Categories
    selectedCategories: [],
    
    // Review
    agreeToTerms: false
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateStep = (step) => {
    const newErrors = {}
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
        if (!formData.password.trim()) newErrors.password = 'Password is required'
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
        break
        
      case 2:
        if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Business address is required'
        break
        
      case 4:
        if (formData.selectedCategories.length === 0) newErrors.selectedCategories = 'Please select at least one category'
        break
        
      case 5:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleDocumentUpload = (docType, file) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [docType]: file }
    }))
  }

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category]
    }))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return
    
    setIsSubmitting(true)
    
    try {
      // Save to localStorage
      localStorage.setItem('sellerProfile', JSON.stringify(formData))
      
      // Console log the data
      console.log('Seller Registration Data:', formData)
      
      // Show success toast
      toast.success('Registration completed! Redirecting to your dashboard...')
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/seller/dashboard')
      }, 2000)
      
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password (min 6 characters)"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name (Optional)</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your business name"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NTN/Tax ID (Optional)</label>
              <input
                type="text"
                value={formData.ntnTaxId}
                onChange={(e) => handleInputChange('ntnTaxId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your NTN/Tax ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
              <textarea
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                  errors.businessAddress ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your business address"
              />
              {errors.businessAddress && <p className="text-red-500 text-sm mt-1">{errors.businessAddress}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse Address (Optional)</label>
              <textarea
                value={formData.warehouseAddress}
                onChange={(e) => handleInputChange('warehouseAddress', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="Enter your warehouse address (if different from business address)"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-6">Upload your business documents (Preview only - no actual upload)</p>
            
            {[
              { key: 'businessLicense', label: 'Business License', description: 'Upload your business license document' },
              { key: 'taxCertificate', label: 'Tax Certificate', description: 'Upload your tax registration certificate' },
              { key: 'bankStatement', label: 'Bank Statement', description: 'Upload your recent bank statement' },
              { key: 'idCard', label: 'ID Card', description: 'Upload your national ID card' }
            ].map(({ key, label, description }) => (
              <div key={key} className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <label className="cursor-pointer">
                  <div className="text-center">
                    {formData.documents[key] ? (
                      <div className="space-y-2">
                        <Image
                          src={URL.createObjectURL(formData.documents[key])}
                          alt={label}
                          width={100}
                          height={100}
                          className="mx-auto rounded-lg object-cover"
                        />
                        <p className="text-sm text-green-600 font-medium">{formData.documents[key].name}</p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            handleDocumentUpload(key, null)
                          }}
                          className="text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">{label}</p>
                          <p className="text-xs text-gray-500">{description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleDocumentUpload(key, e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            ))}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Select Product Categories *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
              {errors.selectedCategories && <p className="text-red-500 text-sm mt-2">{errors.selectedCategories}</p>}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Registration Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Basic Information</h4>
                  <p className="text-sm text-gray-600">Name: {formData.fullName}</p>
                  <p className="text-sm text-gray-600">Email: {formData.email}</p>
                  <p className="text-sm text-gray-600">Phone: {formData.phone}</p>
                  {formData.businessName && <p className="text-sm text-gray-600">Business: {formData.businessName}</p>}
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Business Information</h4>
                  <p className="text-sm text-gray-600">Type: {formData.businessType}</p>
                  {formData.ntnTaxId && <p className="text-sm text-gray-600">NTN/Tax ID: {formData.ntnTaxId}</p>}
                  <p className="text-sm text-gray-600">Address: {formData.businessAddress}</p>
                  {formData.warehouseAddress && <p className="text-sm text-gray-600">Warehouse: {formData.warehouseAddress}</p>}
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Selected Categories</h4>
                  <p className="text-sm text-gray-600">{formData.selectedCategories.join(', ')}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Documents</h4>
                  <p className="text-sm text-gray-600">
                    {Object.values(formData.documents).filter(doc => doc).length} document(s) uploaded
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 ${
                    errors.agreeToTerms ? 'border-red-500' : ''
                  }`}
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 hover:text-blue-800 underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a>
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Become a Seller</h1>
          <p className="text-gray-600 mt-2">Join Basirota and start selling your products</p>
        </div>

        {/* Progress Bar - Mobile */}
        <div className="lg:hidden mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 5</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Step Navigation - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Registration Steps</h3>
              <nav className="space-y-2">
                {steps.map((step) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  const isCompleted = currentStep > step.id
                  
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : isCompleted 
                            ? 'bg-green-50 text-green-700' 
                            : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : isCompleted 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                      </div>
                      <span className="font-medium">{step.title}</span>
                    </div>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
              {/* Step Title */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep - 1].title}</h2>
                <p className="text-gray-600 mt-1">
                  {currentStep === 1 && "Enter your basic information to get started"}
                  {currentStep === 2 && "Tell us about your business"}
                  {currentStep === 3 && "Upload your business documents"}
                  {currentStep === 4 && "Select the categories you want to sell"}
                  {currentStep === 5 && "Review your information before submitting"}
                </p>
              </div>

              {/* Step Content */}
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Check size={20} />
                        <span>Submit Registration</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
