import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigation from './Navigation';

interface HomepageProps {
  onLogout?: () => void;
  userInfo?: {
    name: string;
    role: string;
  };
}

type CardType = 'My Tasks' | 'My Leads' | 'My Report' | 'Follow Up';

interface QuickActionCard {
  type: CardType;
  icon: string;
  iconLib?: 'MaterialIcons' | 'MaterialCommunityIcons';
  color: string;
  bgColor: string;
  count: string;
  subtitle: string;
}

interface StatItem {
  value: string;
  label: string;
  color: string;
}

interface ActivityItem {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  time: string;
}

const Homepage: React.FC<HomepageProps> = ({
  onLogout,
  userInfo = { name: 'Nikhil', role: 'Sales Executive' },
}) => {
  const [navigationVisible, setNavigationVisible] = useState(false);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        delay: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        delay: 400,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for main button
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulse, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const quickActionCards: QuickActionCard[] = [
    {
      type: 'My Tasks',
      icon: 'check-box',
      color: '#3b82f6',
      bgColor: '#dbeafe',
      count: '15',
      subtitle: 'pending',
    },
    {
      type: 'My Leads',
      icon: 'group',
      color: '#10b981',
      bgColor: '#d1fae5',
      count: '23',
      subtitle: 'active',
    },
    {
      type: 'My Report',
      icon: 'chart-bar',
      iconLib: 'MaterialCommunityIcons',
      color: '#f59e0b',
      bgColor: '#fef3c7',
      count: '',
      subtitle: 'View stats',
    },
    {
      type: 'Follow Up',
      icon: 'schedule',
      color: '#ec4899',
      bgColor: '#fce7f3',
      count: '8',
      subtitle: 'due today',
    },
  ];

  const todayStats: StatItem[] = [
    { value: '12', label: 'Calls Made', color: '#3b82f6' },
    { value: '8', label: 'Leads', color: '#10b981' },
    { value: '5', label: 'Follow-up', color: '#f59e0b' },
  ];

  const recentActivities: ActivityItem[] = [
    {
      icon: 'phone',
      iconColor: '#3b82f6',
      bgColor: '#dbeafe',
      title: 'Called John Doe',
      time: '2 minutes ago',
    },
    {
      icon: 'check-box',
      iconColor: '#10b981',
      bgColor: '#d1fae5',
      title: 'Task completed',
      time: '15 minutes ago',
    },
    {
      icon: 'group',
      iconColor: '#f59e0b',
      bgColor: '#fef3c7',
      title: 'Added new lead',
      time: '1 hour ago',
    },
  ];

  const handleStartCalling = (): void => {
    console.log('Start Calling pressed');
    // Add haptic feedback or other interactions
  };

  const handleCardPress = (cardType: CardType): void => {
    console.log(`${cardType} card pressed`);
  };

  const toggleNavigation = (): void => {
    setNavigationVisible(!navigationVisible);
  };

  const handleNotificationPress = (): void => {
    console.log('Notification pressed');
  };

  const handleProfilePress = (): void => {
    console.log('Profile pressed');
  };

  const renderIcon = (
    iconLib: string = 'MaterialIcons',
    iconName: string,
    size: number,
    color: string
  ) => {
    switch (iconLib) {
      case 'MaterialCommunityIcons':
        return <IconCommunity name={iconName} size={size} color={color} />;
      default:
        return <Icon name={iconName} size={size} color={color} />;
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Animated Navbar */}
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="z-10 bg-white px-6 pb-4 pt-12 shadow-lg shadow-black/10">
        <View className="flex-row items-center justify-between">
          {/* Menu Button */}
          <TouchableOpacity
            className="h-11 w-11 items-center justify-center rounded-xl bg-slate-100"
            onPress={toggleNavigation}
            activeOpacity={0.7}>
            <Icon name="menu" size={20} color="#334155" />
          </TouchableOpacity>

          {/* Logo and Title */}
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
            }}
            className="flex-row items-center">
            <View className="mr-3 h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
              <Text className="text-sm font-bold text-white">P</Text>
            </View>
            <Text className="text-lg font-bold text-slate-800">Plan to Empower</Text>
          </Animated.View>

          {/* Notification & Profile */}
          <View className="flex-row items-center gap-2 space-x-3">
            <TouchableOpacity
              className="relative h-11 w-11 items-center justify-center rounded-xl bg-amber-100"
              onPress={handleNotificationPress}
              activeOpacity={0.7}>
              <Icon name="notifications" size={20} color="#d97706" />
              <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </TouchableOpacity>

            <TouchableOpacity
              className="h-11 w-11 items-center justify-center rounded-xl bg-slate-200"
              onPress={handleProfilePress}
              activeOpacity={0.7}>
              <Icon name="person" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Welcome Section */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            }}
            className="mb-8">
            <Text className="mb-2 text-3xl font-bold tracking-tight text-slate-800">
              Welcome {userInfo.name}! 👋
            </Text>
            <Text className="text-base leading-6 text-slate-600">
              Ready to make some calls today?
            </Text>
          </Animated.View>

          {/* Start Calling Button */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }, { scale: buttonPulse }],
            }}>
            <TouchableOpacity className="rounded-full bg-green-600 px-6 py-3 shadow-lg active:opacity-80 mb-5">
              <View className="flex-row items-center justify-center">
                <Icon name="phone" size={20} color="#ffffff" style={{ marginRight: 10 }} />
                <Text className="text-base font-semibold tracking-wide text-white">
                  Start Calling
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Quick Stats */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            }}
            className="mb-8">
            <Text className="mb-4 text-xl font-semibold tracking-tight text-slate-800">
              Today's Overview
            </Text>
            <View className="flex-row justify-between gap-2 space-x-3">
              {todayStats.map((stat, index) => (
                <Animated.View
                  key={index}
                  style={{
                    opacity: fadeAnim,
                    transform: [
                      {
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        }),
                      },
                    ],
                  }}
                  className="flex-1 items-center rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-black/5">
                  <Text className="mb-1 text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </Text>
                  <Text className="text-sm font-medium text-slate-600">{stat.label}</Text>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Dashboard Cards - Grid */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            }}
            className="mb-6">
            <Text className="mb-4 text-xl font-semibold tracking-tight text-slate-800">
              Quick Actions
            </Text>

            <View className="flex-row flex-wrap justify-between">
              {quickActionCards.map((card, index) => (
                <Animated.View
                  key={index}
                  style={{
                    opacity: fadeAnim,
                    transform: [
                      {
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      },
                    ],
                  }}
                  className="mb-4 w-[47%]">
                  <TouchableOpacity
                    className="aspect-square rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-black/10"
                    onPress={() => handleCardPress(card.type)}
                    activeOpacity={0.8}>
                    <View className="flex-1 justify-between">
                      <View
                        className="mb-3 h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: card.bgColor }}>
                        {renderIcon(card.iconLib, card.icon, 24, card.color)}
                      </View>
                      <View>
                        <Text className="mb-1 text-lg font-semibold tracking-tight text-slate-800">
                          {card.type}
                        </Text>
                        <Text className="text-sm text-slate-600">
                          {card.count && `${card.count} `}
                          {card.subtitle}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Recent Activity */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            }}
            className="mb-8">
            <Text className="mb-4 text-xl font-semibold tracking-tight text-slate-800">
              Recent Activity
            </Text>
            <View className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-black/5">
              {recentActivities.map((activity, index) => (
                <Animated.View
                  key={index}
                  style={{
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateX: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-20, 0],
                        }),
                      },
                    ],
                  }}
                  className={`flex-row items-center ${index < recentActivities.length - 1 ? 'mb-4' : ''}`}>
                  <View
                    className="mr-4 h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: activity.bgColor }}>
                    <Icon name={activity.icon} size={18} color={activity.iconColor} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-slate-800">{activity.title}</Text>
                    <Text className="text-sm text-slate-600">{activity.time}</Text>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Navigation Component */}
      <Navigation
        visible={navigationVisible}
        onClose={() => setNavigationVisible(false)}
        onLogout={onLogout}
        userInfo={userInfo}
      />
    </View>
  );
};

export default Homepage;
