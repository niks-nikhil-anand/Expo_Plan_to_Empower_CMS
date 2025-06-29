import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView, Modal } from 'react-native'
import React, { useState } from 'react'

interface ContactFormData {
  name: string;
  email: string;
  issueType: string;
  message: string;
  timestamp: string;
}

interface ApiResponse {
  message?: string;
}

const ContactAdmistration: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<string>('')
  const [showIssueList, setShowIssueList] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const issueTypes: string[] = [
    'Password Reset',
    'Account Locked/Disabled',
    'Login Issues',
    'Technical Support',
    'Access Permission Request',
    'System Bug Report',
    'Account Creation Request',
    'Feature Request',
    'Data Recovery',
    'Profile Update Issues',
    'Security Concerns',
    'Performance Issues',
    'Integration Problems',
    'Training Request',
    'Other'
  ]

  const handleIssueSelect = (issue: string): void => {
    setSelectedIssue(issue)
    setShowIssueList(false)
  }

  const handleSubmit = async (): Promise<void> => {
    if (!name || !email || !selectedIssue || !message) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/contact-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          issueType: selectedIssue,
          message,
          timestamp: new Date().toISOString(),
        } as ContactFormData),
      })

      const data: ApiResponse = await response.json()

      if (response.ok) {
        Alert.alert('Success', 'Your request has been submitted successfully. Administrator will contact you within 24 hours.')
        // Reset form
        setName('')
        setEmail('')
        setSelectedIssue('')
        setMessage('')
      } else {
        Alert.alert('Error', data.message || 'Failed to submit request')
      }
    } catch (error: unknown) {
      Alert.alert('Error', 'Network error. Please try again.')
      console.error('Network error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white my-5">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          {/* Header */}
          <View className="items-center mb-10 mt-4">
            <View className="w-20 h-20 bg-black rounded-full items-center justify-center mb-6 shadow-lg">
              <Text className="text-white text-3xl font-bold">P</Text>
            </View>
            <Text className="text-3xl font-bold text-black text-center mb-3">
              Contact Administration
            </Text>
            <Text className="text-gray-500 text-center text-base leading-6 px-4">
              We're here to help with any issues you're experiencing
            </Text>
          </View>

          {/* Form Container */}
          <View className="bg-gray-50 rounded-2xl p-6 mb-6">
            {/* Name Input */}
            <View className="mb-6">
              <Text className="text-gray-800 text-base mb-3 font-semibold">
                Full Name <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="w-full px-5 py-4 border border-gray-200 rounded-xl text-black bg-white text-base shadow-sm"
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-gray-800 text-base mb-3 font-semibold">
                Email Address <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="w-full px-5 py-4 border border-gray-200 rounded-xl text-black bg-white text-base shadow-sm"
                placeholder="Enter your email address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Issue Type Selection */}
            <View className="mb-6">
              <Text className="text-gray-800 text-base mb-3 font-semibold">
                What's the issue? <Text className="text-red-500">*</Text>
              </Text>
              <Text className="text-gray-500 text-sm mb-4">
                Select the type of issue you're experiencing:
              </Text>
              
              <TouchableOpacity
                className={`w-full px-5 py-4 border rounded-xl shadow-sm ${
                  selectedIssue 
                    ? 'border-black bg-white' 
                    : 'border-gray-200 bg-white'
                }`}
                onPress={() => setShowIssueList(true)}
              >
                <View className="flex-row items-center justify-between">
                  <Text className={`text-base ${
                    selectedIssue ? 'text-black font-medium' : 'text-gray-400'
                  }`}>
                    {selectedIssue || 'Select an issue type'}
                  </Text>
                  <Text className="text-gray-400 text-lg">▼</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Message Input */}
            <View className="mb-6">
              <Text className="text-gray-800 text-base mb-3 font-semibold">
                Detailed Message <Text className="text-red-500">*</Text>
              </Text>
              <Text className="text-gray-500 text-sm mb-4">
                Please provide detailed information about your issue
              </Text>
              <TextInput
                className="w-full px-5 py-4 border border-gray-200 rounded-xl text-black bg-white h-36 text-base shadow-sm"
                placeholder="Describe your issue in detail..."
                placeholderTextColor="#9CA3AF"
                value={message}
                onChangeText={setMessage}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={6}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className={`w-full py-5 rounded-xl mb-4 shadow-lg ${
                loading ? 'bg-gray-400' : 'bg-black'
              }`}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text className="text-white text-center font-bold text-lg">
                {loading ? 'Submitting...' : 'Submit Request'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info */}
          <View className="bg-gray-100 p-6 rounded-2xl mb-6">
            <Text className="text-gray-800 font-bold mb-4 text-lg">Emergency Contact:</Text>
            <View className="space-y-3">
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-base mr-3">📧</Text>
                <Text className="text-gray-700 text-base">admin@company.com</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-base mr-3">📞</Text>
                <Text className="text-gray-700 text-base">+1-555-ADMIN (23646)</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-base mr-3">⏰</Text>
                <Text className="text-gray-700 text-base">Response Time: Within 24 hours</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Issue Selection Modal */}
      <Modal
        visible={showIssueList}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowIssueList(false)}
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <SafeAreaView className="bg-white rounded-t-3xl">
            <View className="p-6">
              {/* Modal Header */}
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-xl font-bold text-black">Select Issue Type</Text>
                <TouchableOpacity
                  onPress={() => setShowIssueList(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center "
                >
                  <Text className="text-gray-600 text-lg font-bold">×</Text>
                </TouchableOpacity>
              </View>

              {/* Issue List */}
              <ScrollView className="max-h-96" showsVerticalScrollIndicator={false}>
                <View className="space-y-2 ">
                  {issueTypes.map((issue, index) => (
                    <TouchableOpacity
                      key={issue}
                      className={`p-4 rounded-xl border-2 my-2 ${
                        selectedIssue === issue 
                          ? 'border-black bg-gray-100' 
                          : 'border-gray-200 bg-white'
                      }`}
                      onPress={() => handleIssueSelect(issue)}
                    >
                      <Text className={`text-base ${
                        selectedIssue === issue 
                          ? 'text-black font-semibold' 
                          : 'text-gray-700'
                      }`}>
                        {issue}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default ContactAdmistration