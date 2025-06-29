import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

interface NavigationProps {
  visible: boolean;
  onClose: () => void;
  onLogout?: () => void;
  userInfo?: {
    name: string;
    role: string;
    avatar?: string;
  };
}

interface MenuItem {
  iconLib: 'MaterialIcons' | 'MaterialCommunityIcons' | 'Feather';
  iconName: string;
  label: string;
  badge?: string;
  active?: boolean;
  onPress?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  visible,
  onClose,
  onLogout,
  userInfo = { name: 'Nikhil', role: 'Sales Executive' }
}) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const menuItems: MenuItem[] = [
    { 
      iconLib: 'MaterialIcons', 
      iconName: 'home', 
      label: 'Dashboard', 
      active: true,
      onPress: () => console.log('Dashboard pressed')
    },
    { 
      iconLib: 'MaterialIcons', 
      iconName: 'check-box', 
      label: 'My Tasks', 
      badge: '15',
      onPress: () => console.log('My Tasks pressed')
    },
    { 
      iconLib: 'MaterialIcons', 
      iconName: 'group', 
      label: 'My Leads', 
      badge: '23',
      onPress: () => console.log('My Leads pressed')
    },
    { 
      iconLib: 'MaterialCommunityIcons', 
      iconName: 'chart-bar', 
      label: 'Reports',
      onPress: () => console.log('Reports pressed')
    },
    { 
      iconLib: 'MaterialIcons', 
      iconName: 'schedule', 
      label: 'Follow Up', 
      badge: '8',
      onPress: () => console.log('Follow Up pressed')
    },
    { 
      iconLib: 'MaterialIcons', 
      iconName: 'settings', 
      label: 'Settings',
      onPress: () => console.log('Settings pressed')
    },
  ];

  // Pan responder for swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx < 0) {
        slideAnim.setValue(Math.max(gestureState.dx, -width * 0.8));
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -width * 0.2) {
        closeNavigation();
      } else {
        openNavigation();
      }
    },
  });

  const openNavigation = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeNavigation = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width * 0.8,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      openNavigation();
    } else {
      slideAnim.setValue(-width * 0.8);
      overlayOpacity.setValue(0);
      scaleAnim.setValue(0.95);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const renderIcon = (iconLib: string, iconName: string, size: number, color: string) => {
    switch (iconLib) {
      case 'MaterialCommunityIcons':
        return <IconCommunity name={iconName} size={size} color={color} />;
      case 'Feather':
        return <IconFeather name={iconName} size={size} color={color} />;
      default:
        return <Icon name={iconName} size={size} color={color} />;
    }
  };

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.onPress) {
      item.onPress();
    }
    // Add a small delay before closing for better UX
    setTimeout(() => {
      closeNavigation();
    }, 150);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    closeNavigation();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={closeNavigation}
      statusBarTranslucent={true}
    >
      <View className="flex-1 flex-row">
        {/* Navigation Panel */}
        <Animated.View
          style={{
            width: width * 0.8,
            height: '100%',
            transform: [
              { translateX: slideAnim },
              { scale: scaleAnim }
            ],
          }}
          className="bg-white shadow-2xl shadow-black/50"
          {...panResponder.panHandlers}
        >
          {/* Header */}
          <Animated.View 
            style={{ opacity: fadeAnim }}
            className="pt-16 px-6 pb-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Animated.View 
                  style={{
                    transform: [{ scale: scaleAnim }]
                  }}
                  className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full items-center justify-center mr-4 shadow-lg shadow-blue-500/30"
                >
                  <Text className="text-white text-xl font-bold">
                    {userInfo.name.charAt(0)}
                  </Text>
                </Animated.View>
                <View>
                  <Text className="text-xl font-bold text-slate-800">{userInfo.name}</Text>
                  <Text className="text-sm text-slate-600">{userInfo.role}</Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={closeNavigation} 
                className="p-3 bg-slate-100 rounded-xl"
                activeOpacity={0.7}
              >
                <Icon name="close" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Menu Items */}
          <ScrollView className="flex-1 pt-4" showsVerticalScrollIndicator={false}>
            <Animated.View style={{ opacity: fadeAnim }}>
              {menuItems.map((item, index) => (
                <Animated.View
                  key={index}
                  style={{
                    opacity: fadeAnim,
                    transform: [{
                      translateX: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-50, 0],
                      })
                    }]
                  }}
                >
                  <TouchableOpacity
                    className={`flex-row items-center px-6 py-4 mx-2 my-1 rounded-2xl ${
                      item.active 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-slate-50'
                    }`}
                    onPress={() => handleMenuItemPress(item)}
                    activeOpacity={0.8}
                  >
                    <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${
                      item.active ? 'bg-blue-100' : 'bg-slate-100'
                    }`}>
                      {renderIcon(
                        item.iconLib, 
                        item.iconName, 
                        20, 
                        item.active ? '#3b82f6' : '#64748b'
                      )}
                    </View>
                    <Text className={`flex-1 text-base ${
                      item.active 
                        ? 'font-semibold text-blue-700' 
                        : 'font-medium text-slate-700'
                    }`}>
                      {item.label}
                    </Text>
                    {item.badge && (
                      <Animated.View 
                        style={{
                          transform: [{ scale: scaleAnim }]
                        }}
                        className="bg-red-500 rounded-full px-2.5 py-1 mr-2"
                      >
                        <Text className="text-white text-xs font-bold">
                          {item.badge}
                        </Text>
                      </Animated.View>
                    )}
                    <Icon name="chevron-right" size={18} color="#94a3b8" />
                  </TouchableOpacity>
                </Animated.View>
              ))}
              
              {/* Logout Button */}
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{
                    translateX: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-50, 0],
                    })
                  }]
                }}
              >
                <TouchableOpacity
                  className="flex-row items-center px-6 py-4 mx-2 mt-8 border-t border-slate-200 rounded-2xl"
                  onPress={handleLogout}
                  activeOpacity={0.8}
                >
                  <View className="w-10 h-10 bg-red-100 rounded-xl items-center justify-center mr-4">
                    <Icon name="logout" size={20} color="#ef4444" />
                  </View>
                  <Text className="flex-1 text-base font-medium text-red-500">
                    Logout
                  </Text>
                  <Icon name="chevron-right" size={18} color="#ef4444" />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </ScrollView>
        </Animated.View>

        {/* Overlay */}
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: overlayOpacity,
          }}
        >
          <TouchableOpacity 
            className="flex-1"
            onPress={closeNavigation}
            activeOpacity={1}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Navigation;