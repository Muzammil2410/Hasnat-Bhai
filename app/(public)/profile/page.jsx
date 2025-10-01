'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { User, MapPin, ShoppingBag, Heart, Settings, LogOut, Edit, Plus, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { orderDummyData, addressDummyData } from '@/assets/assets'
import WishlistButton from '@/components/WishlistButton'

export default function ProfilePage() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('profile')
    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [addresses, setAddresses] = useState([])
    const [showAddressModal, setShowAddressModal] = useState(false)
    const [editingAddress, setEditingAddress] = useState(null)
    const [addressForm, setAddressForm] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'USA'
    })
    
    const wishlistItems = useSelector(state => state.wishlist.items)
    const wishlistArray = Object.values(wishlistItems)

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user')
        if (!userData) {
            router.push('/auth/login')
            return
        }

        setUser(JSON.parse(userData))
        setOrders(orderDummyData)
        
        // Load addresses from localStorage or use default
        const savedAddresses = localStorage.getItem('userAddresses')
        if (savedAddresses) {
            setAddresses(JSON.parse(savedAddresses))
        } else {
            setAddresses([addressDummyData])
        }
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('user')
        toast.success('Logged out successfully')
        router.push('/auth/login')
    }

    const handleAddressSubmit = (e) => {
        e.preventDefault()
        
        let updatedAddresses
        
        if (editingAddress) {
            // Update existing address
            updatedAddresses = addresses.map(addr => 
                addr.id === editingAddress.id 
                    ? { ...addr, ...addressForm, updatedAt: new Date().toISOString() }
                    : addr
            )
            setAddresses(updatedAddresses)
            toast.success('Address updated successfully')
        } else {
            // Add new address
            const newAddress = {
                id: 'addr_' + Date.now(),
                ...addressForm,
                createdAt: new Date().toISOString()
            }
            updatedAddresses = [...addresses, newAddress]
            setAddresses(updatedAddresses)
            toast.success('Address added successfully')
        }
        
        // Save to localStorage
        localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses))
        
        setShowAddressModal(false)
        setEditingAddress(null)
        setAddressForm({
            name: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: 'USA'
        })
    }

    const handleEditAddress = (address) => {
        setEditingAddress(address)
        setAddressForm(address)
        setShowAddressModal(true)
    }

    const handleDeleteAddress = (addressId) => {
        const updatedAddresses = addresses.filter(addr => addr.id !== addressId)
        setAddresses(updatedAddresses)
        localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses))
        toast.success('Address deleted successfully')
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'settings', label: 'Settings', icon: Settings }
    ]

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    return (
        <>
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                    <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {/* User Info */}
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>

                            {/* Navigation Tabs */}
                            <nav className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <tab.icon size={20} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors mt-4"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={user.name}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
                                
                                {orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">
                                                            Order #{order.id.slice(-8).toUpperCase()}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900">
                                                            ${order.total.toFixed(2)}
                                                        </p>
                                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                                            order.status === 'DELIVERED' 
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">
                                                            {order.orderItems.length} item(s)
                                                        </span>
                                                    </div>
                                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                                        <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                                        <Link
                                            href="/shop"
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Start Shopping
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Addresses Tab */}
                        {activeTab === 'addresses' && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                                    <button
                                        onClick={() => setShowAddressModal(true)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                        <Plus size={20} />
                                        Add Address
                                    </button>
                                </div>

                                {addresses.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {addresses.map((address) => (
                                            <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="font-medium text-gray-900">{address.name}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleEditAddress(address)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAddress(address.id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p className="font-medium">{address.street}</p>
                                                    <p>{address.city}, {address.state} {address.zip}</p>
                                                    <p>{address.country}</p>
                                                    <p className="text-blue-600">{address.phone}</p>
                                                    {address.email && <p className="text-blue-600">{address.email}</p>}
                                                    {address.updatedAt && (
                                                        <p className="text-xs text-gray-500 mt-2">
                                                            Updated: {new Date(address.updatedAt).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                                        <p className="text-gray-600 mb-4">Add an address to make checkout faster.</p>
                                        <button
                                            onClick={() => setShowAddressModal(true)}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Add Address
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === 'wishlist' && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Wishlist ({wishlistArray.length})</h2>
                                
                                {wishlistArray.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {wishlistArray.map((item) => (
                                            <div key={item.productId} className="border border-gray-200 rounded-lg p-4 group hover:shadow-md transition-shadow">
                                                <div className="relative">
                                                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                                        <Image
                                                            src={item.product.images[0]}
                                                            alt={item.product.name}
                                                            width={200}
                                                            height={200}
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="absolute top-2 right-2">
                                                        <WishlistButton product={item.product} size={20} />
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <h3 className="font-medium text-gray-900 line-clamp-2">{item.product.name}</h3>
                                                    <p className="text-sm text-gray-600">{item.product.category}</p>
                                                    <p className="font-semibold text-gray-900">${item.product.price}</p>
                                                    
                                                    <div className="flex items-center gap-2 pt-2">
                                                        <Link
                                                            href={`/product/${item.product.id}`}
                                                            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                        >
                                                            View Product
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                                        <p className="text-gray-600 mb-4">Save items you love for later.</p>
                                        <Link
                                            href="/shop"
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Start Shopping
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                                
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Notifications</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <span className="ml-3 text-gray-700">Email notifications</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <span className="ml-3 text-gray-700">SMS notifications</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="ml-3 text-gray-700">Push notifications</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Privacy</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <span className="ml-3 text-gray-700">Make profile public</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="ml-3 text-gray-700">Allow marketing emails</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                            Save Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {editingAddress ? 'Edit Address' : 'Add New Address'}
                        </h3>
                        
                        <form onSubmit={handleAddressSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={addressForm.name}
                                    onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={addressForm.email}
                                        onChange={(e) => setAddressForm({...addressForm, email: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        value={addressForm.phone}
                                        onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Street Address *
                                </label>
                                <textarea
                                    value={addressForm.street}
                                    onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.city}
                                        onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.state}
                                        onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ZIP *
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.zip}
                                        onChange={(e) => setAddressForm({...addressForm, zip: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {editingAddress ? 'Update Address' : 'Add Address'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddressModal(false)
                                        setEditingAddress(null)
                                        setAddressForm({
                                            name: '',
                                            email: '',
                                            phone: '',
                                            street: '',
                                            city: '',
                                            state: '',
                                            zip: '',
                                            country: 'USA'
                                        })
                                    }}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}
