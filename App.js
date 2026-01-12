import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Linking, ScrollView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screens
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import OTPScreen from './src/screen/OTPScreen';
import HomeScreen from './src/screen/HomeScreen';
import MyReportsScreen from './src/screen/MyReportsScreen';
import ReportIssueScreen from './src/screen/ReportIssueScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import ReportDetailScreen from './src/screen/ReportDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ADMIN_DASHBOARD_URL = 'https://parivartan-admin.netlify.app'; 

// --- TAB NAVIGATOR ---
function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Report') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'MyReports') iconName = focused ? 'list' : 'list-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { height: 60 + insets.bottom, paddingTop: 5 },
        tabBarLabelStyle: { paddingBottom: 5 }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Report" component={ReportIssueScreen} />
      <Tab.Screen name="MyReports" component={MyReportsScreen} options={{ tabBarLabel: 'My Reports' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  
  // --- WEB WRAPPER (The Landing Page) ---
  const WebWrapper = ({ children }) => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.splitLayout}>
              
              {/* --- LEFT SIDE: INFO PANEL --- */}
              <View style={styles.infoPanel}>
                
                {/* Header Badges */}
                <View style={styles.badgeRow}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>SIH 2025 • Software</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
                    <Text style={[styles.badgeText, { color: '#15803D' }]}>Team sudo rm -rf</Text>
                  </View>
                </View>

                {/* Title & Subtitle */}
                <Text style={styles.projectTitle}>Parivartan</Text>
                <Text style={styles.projectSubtitle}>
                  Crowdsourced Civic Issue Reporting & Resolution System
                </Text>

                {/* --- WINNER CARD --- */}
                <View style={styles.winnerCard}>
                  <View style={styles.winnerIcon}>
                    <Ionicons name="trophy" size={28} color="#B45309" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.winnerText}>First Prize Winner </Text>
                    <Text style={styles.winnerSubtext}>
                      Internal Hackathon @ Marathwada Mitra Mandal's College of Engineering, Pune
                    </Text>
                  </View>
                </View>

                {/* Description */}
                <Text style={styles.description}>
                  Parivartan bridges the gap between citizens and municipal authorities. 
                  We ensure transparency, accountability, and real-time tracking of civic issues through a verifiable digital workflow.
                </Text>

                {/* Hackathon Details Grid */}
                <View style={styles.detailsGrid}>
                   <DetailBox label="Problem ID" value="SIH 25031" />
                   <DetailBox label="Theme" value="Clean & Green Tech" />
                   <DetailBox label="Stack" value="React Native + Node" />
                </View>

                {/* Key Features */}
                <Text style={styles.sectionHeader}>Why Parivartan?</Text>
                <View style={styles.featuresGrid}>
                  <FeatureItem icon="camera" text="Visual Reporting" subtext="Geo-tagged Evidence" />
                  <FeatureItem icon="sync" text="Real-time Status" subtext="Live Tracking" />
                  <FeatureItem icon="shield-checkmark" text="Proof of Work" subtext="Verifiable Resolution" />
                  <FeatureItem icon="people" text="Crowdsourced" subtext="Community Driven" />
                </View>

                <View style={styles.separator} />

                {/* Admin Button */}
                <TouchableOpacity 
                  style={styles.adminButton}
                  onPress={() => Linking.openURL(ADMIN_DASHBOARD_URL)}
                >
                  <Ionicons name="desktop-outline" size={20} color="white" />
                  <Text style={styles.adminButtonText}>Switch to Admin Dashboard</Text>
                </TouchableOpacity>

              </View>

              {/* --- RIGHT SIDE: MOBILE APP PREVIEW --- */}
              <View style={styles.mobileFrameContainer}>
                <View style={styles.mobileFrame}>
                  {children}
                </View>
                <View style={styles.frameReflection} />
                <Text style={styles.frameCaption}>Live Interactive Preview</Text>
              </View>

            </View>
          </ScrollView>
        </View>
      );
    }
    return children;
  };

  return (
    <SafeAreaProvider>
      <WebWrapper>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="Main"> 
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OTP" component={OTPScreen} options={{ title: 'Verify Your Number', headerShadowVisible: false }} />
            <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ReportDetail" component={ReportDetailScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </WebWrapper>
    </SafeAreaProvider>
  );
}

// --- HELPER COMPONENTS ---
const DetailBox = ({ label, value }) => (
  <View style={styles.detailBox}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const FeatureItem = ({ icon, text, subtext }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      <Ionicons name={icon} size={22} color="#4F46E5" />
    </View>
    <View>
      <Text style={styles.featureTitle}>{text}</Text>
      <Text style={styles.featureSubtext}>{subtext}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  // --- WEB CONTAINER ---
  webContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1, // Ensures content can expand
    justifyContent: 'center', // Centers content vertically in the browser window
    paddingVertical: 40,
  },
  splitLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse', 
    justifyContent: 'center',
    // --- FIX: Vertically align the Text Panel and Phone ---
    alignItems: 'center', 
    gap: 80, // Increased gap slightly for better separation
    maxWidth: 1400,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  // --- LEFT PANEL ---
  infoPanel: {
    flex: 1,
    minWidth: 350,
    maxWidth: 550,
    // Removed paddingTop to let flexbox handle the centering
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F46E5',
  },
  projectTitle: {
    fontSize: 56,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -1.5,
    marginBottom: 8,
  },
  projectSubtitle: {
    fontSize: 20,
    color: '#475569',
    fontWeight: '500',
    marginBottom: 24,
    lineHeight: 28,
  },
  
  // Winner Card
  winnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    gap: 16,
  },
  winnerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FDE68A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
  },
  winnerSubtext: {
    fontSize: 13,
    color: '#B45309',
    marginTop: 2,
  },

  description: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 26,
    marginBottom: 30,
  },

  // Details Grid
  detailsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  detailBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center', // Center text inside boxes
  },
  detailLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },

  // Features
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  featureItem: {
    width: '45%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  featureSubtext: {
    fontSize: 12,
    color: '#64748B',
  },

  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 30,
  },

  // Admin Button
  adminText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 12,
  },
  adminButton: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    cursor: 'pointer', // Adds hand cursor on web
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  // --- RIGHT PANEL (Mobile Frame) ---
  mobileFrameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // Removed 'top' and 'sticky' to allow pure flex alignment
  },
  mobileFrame: {
    width: 390,
    height: 844,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 14,
    borderColor: '#1E293B',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 20,
  },
  frameCaption: {
    marginTop: 24,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
});