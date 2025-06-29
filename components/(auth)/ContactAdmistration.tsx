import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

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

interface ContactAdmistrationProps {
  onBack?: () => void;
}

const ContactAdmistration: React.FC<ContactAdmistrationProps> = ({ onBack }) => {
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [showIssueList, setShowIssueList] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
    'Other',
  ];

  const handleIssueSelect = (issue: string): void => {
    setSelectedIssue(issue);
    setShowIssueList(false);
  };

  const handleBack = (): void => {
    if (onBack) {
      onBack();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!name || !email || !selectedIssue || !message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
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
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success',
          'Your request has been submitted successfully. Administrator will contact you within 24 hours.'
        );
        // Reset form
        setName('');
        setEmail('');
        setSelectedIssue('');
        setMessage('');
      } else {
        Alert.alert('Error', data.message || 'Failed to submit request');
      }
    } catch (error: unknown) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="my-5 flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          {/* Back Button */}
          {onBack && (
            <TouchableOpacity onPress={handleBack} className="mb-4 mt-2 flex-row items-center">
               <Icon name="arrow-back" size={24} color="#000000" style={{ marginRight: 8 }} />
              <Text className="text-black text-base font-medium">Back to Sign In</Text>
            </TouchableOpacity>
          )}

          {/* Header */}
          <View className="mb-10 mt-4 items-center">
            <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-black shadow-lg">
              <Text className="text-3xl font-bold text-white">P</Text>
            </View>
            <Text className="mb-3 text-center text-3xl font-bold text-black">
              Contact Administration
            </Text>
            <Text className="px-4 text-center text-base leading-6 text-gray-500">
              We're here to help with any issues you're experiencing
            </Text>
          </View>

          {/* Form Container */}
          <View className="mb-6 rounded-2xl bg-gray-50 p-6">
            {/* Name Input */}
            <View className="mb-6">
              <Text className="mb-3 text-base font-semibold text-gray-800">
                Full Name <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-base text-black shadow-sm"
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View className="mb-6">
              <Text className="mb-3 text-base font-semibold text-gray-800">
                Email Address <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-base text-black shadow-sm"
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
              <Text className="mb-3 text-base font-semibold text-gray-800">
                What's the issue? <Text className="text-red-500">*</Text>
              </Text>
              <Text className="mb-4 text-sm text-gray-500">
                Select the type of issue you're experiencing:
              </Text>

              <TouchableOpacity
                className={`w-full rounded-xl border px-5 py-4 shadow-sm ${
                  selectedIssue ? 'border-black bg-white' : 'border-gray-200 bg-white'
                }`}
                onPress={() => setShowIssueList(true)}>
                <View className="flex-row items-center justify-between">
                  <Text
                    className={`text-base ${
                      selectedIssue ? 'font-medium text-black' : 'text-gray-400'
                    }`}>
                    {selectedIssue || 'Select an issue type'}
                  </Text>
                  <Text className="text-lg text-gray-400">▼</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Message Input */}
            <View className="mb-6">
              <Text className="mb-3 text-base font-semibold text-gray-800">
                Detailed Message <Text className="text-red-500">*</Text>
              </Text>
              <Text className="mb-4 text-sm text-gray-500">
                Please provide detailed information about your issue
              </Text>
              <TextInput
                className="h-36 w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-base text-black shadow-sm"
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
              className={`mb-4 w-full rounded-xl py-5 shadow-lg ${
                loading ? 'bg-gray-400' : 'bg-black'
              }`}
              onPress={handleSubmit}
              disabled={loading}>
              <Text className="text-center text-lg font-bold text-white">
                {loading ? 'Submitting...' : 'Submit Request'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info */}
          <View className="mb-6 rounded-2xl bg-gray-100 p-6">
            <Text className="mb-4 text-lg font-bold text-gray-800">Emergency Contact:</Text>
            <View className="space-y-3">
              <View className="flex-row items-center">
                <Text className="mr-3 text-base text-gray-600">📧</Text>
                <Text className="text-base text-gray-700">admin@company.com</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-3 text-base text-gray-600">📞</Text>
                <Text className="text-base text-gray-700">+1-555-ADMIN (23646)</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-3 text-base text-gray-600">⏰</Text>
                <Text className="text-base text-gray-700">Response Time: Within 24 hours</Text>
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
        onRequestClose={() => setShowIssueList(false)}>
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <SafeAreaView className="rounded-t-3xl bg-white">
            <View className="p-6">
              {/* Modal Header */}
              <View className="mb-6 flex-row items-center justify-between">
                <Text className="text-xl font-bold text-black">Select Issue Type</Text>
                <TouchableOpacity
                  onPress={() => setShowIssueList(false)}
                  className="h-8 w-8 items-center justify-center rounded-full bg-gray-100 ">
                  <Text className="text-lg font-bold text-gray-600">×</Text>
                </TouchableOpacity>
              </View>

              {/* Issue List */}
              <ScrollView className="max-h-96" showsVerticalScrollIndicator={false}>
                <View className="space-y-2 ">
                  {issueTypes.map((issue, index) => (
                    <TouchableOpacity
                      key={issue}
                      className={`my-2 rounded-xl border-2 p-4 ${
                        selectedIssue === issue
                          ? 'border-black bg-gray-100'
                          : 'border-gray-200 bg-white'
                      }`}
                      onPress={() => handleIssueSelect(issue)}>
                      <Text
                        className={`text-base ${
                          selectedIssue === issue ? 'font-semibold text-black' : 'text-gray-700'
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
  );
};

export default ContactAdmistration;
