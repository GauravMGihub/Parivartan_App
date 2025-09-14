// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { StatusBar } from 'expo-status-bar';
// import { Ionicons } from '@expo/vector-icons';
// // --- FIX: Import SafeAreaProvider ---
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// // Import screens
// import LoginScreen from './src/screen/LoginScreen';
// import RegisterScreen from './src/screen/RegisterScreen';
// import OTPScreen from './src/screen/OTPScreen'; // --- IMPORT NEW SCREEN ---
// import HomeScreen from './src/screen/HomeScreen';
// import MyReportsScreen from './src/screen/MyReportsScreen';
// import ReportIssueScreen from './src/screen/ReportIssueScreen';
// import SettingsScreen from './src/screen/SettingsScreen';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // This is the Tab Navigator that appears after login
// function MainTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Report') {
//             iconName = focused ? 'add-circle' : 'add-circle-outline';
//           } else if (route.name === 'MyReports') {
//             iconName = focused ? 'list' : 'list-outline';
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'settings' : 'settings-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#4F46E5',
//         tabBarInactiveTintColor: 'gray',
//         // --- FIX: Updated tabBarStyle for safe area ---
//         tabBarStyle: {
//           paddingBottom: 10,
//           paddingTop: 5,
//           height: 65,
//         },
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Report" component={ReportIssueScreen} />
//       <Tab.Screen name="MyReports" component={MyReportsScreen} options={{ tabBarLabel: 'My Reports' }} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     // --- FIX: Wrap the entire app in SafeAreaProvider ---
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <StatusBar style="auto" />
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Register"
//             component={RegisterScreen}
//             options={{ headerShown: false }}
//           />
//           {/* --- ADD OTP SCREEN TO STACK --- */}
//           <Stack.Screen
//             name="OTP"
//             component={OTPScreen}
//             options={{
//               title: 'Verify Your Number', // This shows a header with a back button
//               headerShadowVisible: false, // Cleaner look
//             }}
//           />
//           <Stack.Screen
//             name="Main"
//             component={MainTabNavigator}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
// --- 1. IMPORT useSafeAreaInsets hook ---
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screens
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import OTPScreen from './src/screen/OTPScreen';
import HomeScreen from './src/screen/HomeScreen';
import MyReportsScreen from './src/screen/MyReportsScreen';
import ReportIssueScreen from './src/screen/ReportIssueScreen';
import SettingsScreen from './src/screen/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  // --- 2. CALL the hook to get the device's safe area dimensions ---
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Report') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'MyReports') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        // --- 3. THE FIX: Make the tab bar style dynamic ---
        tabBarStyle: {
          // A base height for your icons and labels
          height: 60 + insets.bottom, 
          // Add some padding on top for aesthetics
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          // Add some padding at the bottom of the label to push it up
          paddingBottom: 5,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Report" component={ReportIssueScreen} />
      <Tab.Screen name="MyReports" component={MyReportsScreen} options={{ tabBarLabel: 'My Reports' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTP"
            component={OTPScreen}
            options={{
              title: 'Verify Your Number',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}