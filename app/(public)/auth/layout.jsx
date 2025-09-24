'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthLayout({ children }) {
    const router = useRouter()
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Check if user is already logged in
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    // If user is logged in, redirect to profile
    useEffect(() => {
        if (user) {
            router.push('/profile')
        }
    }, [user, router])

    // Show loading while checking authentication
    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {children}
        </div>
    )
}
