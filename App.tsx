import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import './global.css';
import SignIn from 'components/(auth)/SignIn';
import ContactAdmistration from 'components/(auth)/ContactAdmistration';
import SplashScreen from 'components/(Onboarding)/SplashScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
    
  const handleSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleContactAdmin = () => {
    setCurrentScreen('contact');
  };

  const handleBackToSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleBackToSplash = () => {
    setCurrentScreen('splash');
  };
   
  const renderScreen = () => {
    switch (currentScreen) {
      case 'signin':
        return (
          <SignIn 
            onBack={handleBackToSplash}
            onContactAdmin={handleContactAdmin}
          />
        );
      case 'contact':
        return (
          <ContactAdmistration 
            onBack={handleBackToSignIn}
          />
        );
      case 'splash':
      default:
        return <SplashScreen onSignIn={handleSignIn} />;
    }
  };
   
  return (
    <>
      {renderScreen()}
      <StatusBar style="auto" />
    </>
  );
}