import { StatusBar } from 'expo-status-bar';
import './global.css';
import SignIn from 'components/(auth)/SignIn';
import ContactAdmistration from 'components/(auth)/ContactAdmistration';
import SplashScreen from 'components/(Onboarding)/SplashScreen';

export default function App() {
  return (
    <>
      {/* <SignIn /> */}
      {/* <ContactAdmistration/> */}
      <SplashScreen/>
      <StatusBar style="auto" />
    </>
  );
}
