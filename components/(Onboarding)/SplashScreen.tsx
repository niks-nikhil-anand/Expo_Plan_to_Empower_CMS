import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions, 
  NativeScrollEvent, 
  NativeSyntheticEvent,
  StatusBar,
  SafeAreaView
} from 'react-native'
import React, { useState, useRef } from 'react'

// Import your images - make sure these paths are correct
import Insights from '../../assets/Onboarding/4465718.jpg'
import Customer from '../../assets/Onboarding/6155818.jpg'
import Lead from '../../assets/Onboarding/15755.jpg'
import Automation from '../../assets/Onboarding/19197363.jpg'

const { width, height } = Dimensions.get('window')

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: any;
}

const SplashScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const scrollViewRef = useRef<ScrollView>(null)

  const slides: Slide[] = [
    {
      id: 1,
      title: "Real-time Insights",
      description: "Get instant analytics and data-driven decisions to stay ahead of your competition",
      icon: "📊",
      image: Insights
    },
    {
      id: 2,
      title: "Customer Engagement Simplified",
      description: "Streamline communication and boost customer satisfaction with our intuitive tools",
      icon: "🤝",
      image: Customer
    },
    {
      id: 3,
      title: "360° Lead Management",
      description: "Complete lead tracking from prospect to customer with comprehensive analytics",
      icon: "🎯",
      image: Lead
    },
    {
      id: 4,
      title: "Intelligent Automation",
      description: "Smart workflows that save time, reduce errors, and boost productivity",
      icon: "🤖",
      image: Automation
    }
  ]

  const handleSignIn = (): void => {
    console.log('Sign In pressed')
    // Add your navigation logic here
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width)
    setCurrentSlide(slideIndex)
  }

  const goToSlide = (index: number): void => {
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true })
    setCurrentSlide(index)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Section */}
      <View className="items-center pt-16 pb-6 px-6">
        <Text className="text-3xl font-bold text-black text-center mb-3">
          Plan to Empower CMS
        </Text>
        <View className="w-16 h-1 bg-black rounded-full" />
      </View>

      {/* Slidable Content */}
      <View className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {slides.map((slide, index) => (
            <View key={slide.id} className="items-center justify-center px-6" style={{ width }}>
              
              {/* Feature Icon */}
              <View className="mb-5">
                <Text className="text-5xl">{slide.icon}</Text>
              </View>

              {/* Feature Image */}
              <View 
                className="bg-gray-50 rounded-2xl mb-8  overflow-hidden"
                style={{ 
                  width: width * 0.8, 
                  height: height * 0.3,
                }}
              >
                <Image 
                  source={slide.image}
                  className="w-full h-full"
                  resizeMode="contain"
                  onError={(error) => {
                    console.log('Image load error:', error.nativeEvent.error);
                  }}
                />
              </View>

              {/* Feature Title */}
              <Text className="text-2xl font-bold text-black text-center mb-4 px-4">
                {slide.title}
              </Text>

              {/* Feature Description */}
              <Text 
                className="text-base text-gray-600 text-center leading-6 px-6"
                style={{ maxWidth: width * 0.85 }}
              >
                {slide.description}
              </Text>

            </View>
          ))}
        </ScrollView>

        {/* Slide Indicators */}
        <View className="flex-row justify-center items-center py-8">
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToSlide(index)}
              className={`h-2 rounded-full mx-1 ${
                currentSlide === index 
                  ? 'bg-black w-8' 
                  : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </View>

        {/* Sign In Button */}
        <View className="px-6 pb-10">
          <TouchableOpacity 
            onPress={handleSignIn}
            className="w-full bg-black rounded-2xl py-4 px-6 shadow-lg active:bg-gray-800"
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Sign In to Get Started
            </Text>
          </TouchableOpacity>

          {/* Footer Text */}
          <Text className="text-sm text-gray-500 text-center mt-4 font-medium">
            Empower your business • Drive growth • Succeed together
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SplashScreen