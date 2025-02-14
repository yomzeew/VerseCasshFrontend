import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './global.css'
import MainPage from './pages/mainPage';
import { useFonts } from 'expo-font';
import { ThemeProvider } from './hooks/useTheme';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Geist-Regular': require('./assets/fonts/Geist-Regular.ttf'),
    'Geist-Bold': require('./assets/fonts/Geist-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }
  return (
    <ThemeProvider >
      <MainPage/>

    </ThemeProvider>
    
  );
}


