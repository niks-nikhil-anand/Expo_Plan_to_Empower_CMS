import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

// Add props interface
interface SignInProps {
  onBack?: () => void;
  onContactAdmin?: () => void;
}

// Update component to accept props
const SignIn: React.FC<SignInProps> = ({ onBack, onContactAdmin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        Alert.alert('Success', 'Signed in successfully')
      } else {
        Alert.alert('Error', data.message || 'Sign in failed')
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleContactAdmin = () => {
    if (onContactAdmin) {
      onContactAdmin();
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      {/* Logo */}
      <View className="w-20 h-20 bg-black rounded-full items-center justify-center mb-6">
        <Text className="text-white text-4xl font-bold">P</Text>
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-black mb-8 text-center">
        Plan to empower CMS
      </Text>

      {/* Email Input */}
      <View className="w-full mb-4">
        <Text className="text-gray-700 text-sm mb-2 font-medium">Email</Text>
        <TextInput
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black bg-white"
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Password Input */}
      <View className="w-full mb-6">
        <Text className="text-gray-700 text-sm mb-2 font-medium">Password</Text>
        <TextInput
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black bg-white"
          placeholder="Enter your password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        className={`w-full py-4 rounded-lg mb-6 ${loading ? 'bg-gray-400' : 'bg-black'}`}
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? 'Signing In...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      {/* Contact Administration */}
      <TouchableOpacity onPress={handleContactAdmin}>
        <Text className="text-gray-600 text-sm text-center">
          Need help? <Text className="underline">Contact Administration</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn