'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearCart } from "@/lib/features/cart/cartSlice"
import { Package, Users, TrendingUp, DollarSign, Plus, Eye, LogOut } from 'lucide-react'

export default function SellerDashboard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [sellerData, setSellerData] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('sellerProfile')
    if (data) {
      setSellerData(JSON.parse(data))
      
      // Add a sample product if none exists
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]')
      if (existingProducts.length === 0) {
        const sampleProduct = {
          id: 'prod_demo_001',
          title: 'Wireless Bluetooth Headphones',
          sku: 'wireless-bluetooth-headphones',
          category: 'Electronics',
          brand: 'TechSound',
          price: '99.99',
          salePrice: '79.99',
          stockQuantity: '50',
          skuBarcode: 'WBH001',
          weight: '0.3',
          dimensions: {
            length: '20',
            width: '18',
            height: '8'
          },
          images: [{
            id: 'demo_img_1',
            preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTEzMCAxNDBIMTcwVjE2MEgxMzBWMTQwWiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
            file: null
          }],
          videoUrl: '',
          description: 'High-quality wireless Bluetooth headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
          shortDescription: 'Premium wireless headphones with noise cancellation',
          metaTitle: 'Wireless Bluetooth Headphones - TechSound',
          metaDescription: 'Buy premium wireless Bluetooth headphones with noise cancellation and long battery life.',
          keywords: 'headphones, wireless, bluetooth, noise cancellation, audio',
          publishedAt: new Date().toISOString(),
          status: 'published'
        }
        
        localStorage.setItem('products', JSON.stringify([sampleProduct]))
        setProducts([sampleProduct])
      } else {
        setProducts(existingProducts)
      }
    } else {
      // Redirect to registration if no data found
      router.push('/seller/register')
    }
  }, [router])

  const handleLogout = () => {
    // Clear seller data from localStorage
    localStorage.removeItem('sellerProfile')
    localStorage.removeItem('products')
    localStorage.removeItem('draftProduct')
    
    // Clear cart when user logs out
    dispatch(clearCart())
    
    // Redirect to home page
    router.push('/')
  }

  if (!sellerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { title: 'Total Products', value: products.length.toString(), icon: Package, color: 'bg-blue-500' },
    { title: 'Total Orders', value: '0', icon: Users, color: 'bg-green-500' },
    { title: 'Total Revenue', value: '$0', icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Growth Rate', value: '0%', icon: TrendingUp, color: 'bg-orange-500' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-gray-600">Welcome back, {sellerData.fullName}!</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => router.push('/seller/dashboard/products/add')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                <span>Add Product</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye size={20} />
                <span>View Store</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-8">
          <h2 className="text-xl font-semibold mb-2">Welcome to Zizla Seller Center!</h2>
          <p className="text-blue-100">
            Your seller account has been created successfully. You can now start adding products and managing your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Account Created</p>
                  <p className="text-xs text-gray-500">Your seller account has been successfully created</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Profile Completed</p>
                  <p className="text-xs text-gray-500">All registration steps have been completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/seller/dashboard/products/add')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Add New Product</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button 
                onClick={() => router.push('/seller/dashboard/products')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Manage Products</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">View Orders</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Business Details</h4>
              <p className="text-sm text-gray-600">Name: {sellerData.businessName || 'Not provided'}</p>
              <p className="text-sm text-gray-600">Type: {sellerData.businessType}</p>
              <p className="text-sm text-gray-600">Email: {sellerData.email}</p>
              <p className="text-sm text-gray-600">Phone: {sellerData.phone}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {sellerData.selectedCategories.map((category, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
