'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Store } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isSellerLogin, setIsSellerLogin] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // Demo credentials
    const demoCredentials = {
        email: 'demo@basirota.com',
        password: 'demo123'
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (isSellerLogin) {
            // Check seller credentials
            const sellerProfile = localStorage.getItem('sellerProfile')
            console.log('Seller profile from localStorage:', sellerProfile) // Debug log
            
            if (sellerProfile) {
                try {
                    const sellerData = JSON.parse(sellerProfile)
                    console.log('Parsed seller data:', sellerData) // Debug log
                    console.log('Login attempt - Email:', formData.email, 'Password:', formData.password) // Debug log
                    console.log('Stored - Email:', sellerData.email, 'Password:', sellerData.password) // Debug log
                    
                    if (formData.email === sellerData.email && formData.password === sellerData.password) {
                        toast.success('Seller login successful!')
                        router.push('/seller/dashboard')
                    } else {
                        toast.error('Invalid seller credentials. Please check your email and password.')
                        console.log('Credentials mismatch') // Debug log
                    }
                } catch (error) {
                    console.error('Error parsing seller profile:', error)
                    toast.error('Error loading seller profile. Please try registering again.')
                }
            } else {
                console.log('No seller profile found in localStorage') // Debug log
                toast.error('No seller account found. Please register as a seller first.')
            }
        } else {
            // Check demo credentials for regular users
            if (formData.email === demoCredentials.email && formData.password === demoCredentials.password) {
                toast.success('Login successful!')
                // Store user session (in real app, this would be handled by auth provider)
                localStorage.setItem('user', JSON.stringify({
                    id: 'user_1',
                    name: 'Demo User',
                    email: 'demo@basirota.com',
                    image: '/api/placeholder/40/40'
                }))
                router.push('/profile')
            } else {
                toast.error('Invalid credentials. Use demo@basirota.com / demo123')
            }
        }

        setLoading(false)
    }

    const fillDemoCredentials = () => {
        setFormData(demoCredentials)
    }

    const toggleSellerLogin = () => {
        setIsSellerLogin(!isSellerLogin)
        setFormData({ email: '', password: '' }) // Clear form when switching
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Back to Home */}
                <button 
                    onClick={() => router.push('/')}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </button>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {isSellerLogin ? 'Seller Login' : 'Welcome Back'}
                        </h1>
                        <p className="text-gray-600">
                            {isSellerLogin ? 'Sign in to your seller account' : 'Sign in to your Basirota account'}
                        </p>
                    </div>

                    {/* Seller Login Toggle Button */}
                    <div className="text-center mb-6">
                        <button
                            type="button"
                            onClick={toggleSellerLogin}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                isSellerLogin 
                                    ? 'bg-green-100 text-green-700 border border-green-200' 
                                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                            }`}
                        >
                            <Store size={16} />
                            {isSellerLogin ? 'Seller Mode' : 'Switch to Seller Login'}
                        </button>
                    </div>

                    {/* Demo Credentials Banner */}
                    {!isSellerLogin && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
                            <p className="text-xs text-blue-600 mb-3">Use these credentials to login:</p>
                            <div className="text-xs text-blue-700 space-y-1">
                                <p><strong>Email:</strong> demo@basirota.com</p>
                                <p><strong>Password:</strong> demo123</p>
                            </div>
                            <button
                                type="button"
                                onClick={fillDemoCredentials}
                                className="mt-3 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                            >
                                Fill Demo Credentials
                            </button>
                        </div>
                    )}

                    {/* Seller Login Info */}
                    {isSellerLogin && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <h3 className="text-sm font-medium text-green-800 mb-2">Seller Login</h3>
                            <p className="text-xs text-green-600 mb-3">Use your seller registration credentials:</p>
                            <div className="text-xs text-green-700 space-y-1">
                                <p><strong>Email:</strong> The email you used during seller registration</p>
                                <p><strong>Password:</strong> The password you set during registration</p>
                            </div>
                            <p className="text-xs text-green-600 mt-2">
                                Don't have a seller account?{' '}
                                <button
                                    type="button"
                                    onClick={() => router.push('/seller/register')}
                                    className="text-green-700 font-medium hover:underline"
                                >
                                    Register as Seller
                                </button>
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    const sellerProfile = localStorage.getItem('sellerProfile')
                                    console.log('Current seller profile in localStorage:', sellerProfile)
                                    if (sellerProfile) {
                                        const data = JSON.parse(sellerProfile)
                                        console.log('Parsed data:', data)
                                        toast.success('Seller profile found! Check console for details.')
                                    } else {
                                        toast.error('No seller profile found in localStorage')
                                    }
                                }}
                                className="mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                            >
                                Debug: Check Seller Profile
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <button 
                                type="button"
                                onClick={() => router.push('/auth/forgot-password')}
                                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium ${
                                isSellerLogin 
                                    ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500' 
                                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                            }`}
                        >
                            {loading ? (isSellerLogin ? 'Signing in as Seller...' : 'Signing in...') : (isSellerLogin ? 'Sign In as Seller' : 'Sign In')}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button 
                                type="button"
                                onClick={() => router.push('/auth/register')}
                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
