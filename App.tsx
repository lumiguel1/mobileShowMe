import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import  Widget  from './src/components/Widget';

import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'; 
import { theme } from './src/theme';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background
    }}>
      <Widget />
      <StatusBar 
        style="light"
        backgroundColor="transparent"
        translucent 
      />
    </View>
  );
}