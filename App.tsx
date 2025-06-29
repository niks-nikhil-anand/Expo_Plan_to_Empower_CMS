import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import './global.css';
import SignIn from 'components/(auth)/SignIn';
import ContactAdmistration from 'components/(auth)/ContactAdmistration';
import SplashScreen from 'components/(Onboarding)/SplashScreen';
import Homepage from 'components/(root)/Homepage';

type ScreenType = 'splash' | 'signin' | 'contact' | 'homepage';

export default function App(): JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
    
  const handleSignIn = (): void => {
    setCurrentScreen('signin');
  };

  const handleContactAdmin = (): void => {
    setCurrentScreen('contact');
  };

  const handleBackToSignIn = (): void => {
    setCurrentScreen('signin');
  };

  const handleBackToSplash = (): void => {
    setCurrentScreen('splash');
  };

  const handleSignInSuccess = (): void => {
    setCurrentScreen('homepage');
  };

  const handleLogout = (): void => {
    setCurrentScreen('splash');
  };
   
  const renderScreen = (): JSX.Element => {
    switch (currentScreen) {
      case 'signin':
        return (
          <SignIn 
            onBack={handleBackToSplash}
            onContactAdmin={handleContactAdmin}
            onSignInSuccess={handleSignInSuccess}
          />
        );
      case 'contact':
        return (
          <ContactAdmistration 
            onBack={handleBackToSignIn}
          />
        );
      case 'homepage':
        return (
          <Homepage 
            onLogout={handleLogout}
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