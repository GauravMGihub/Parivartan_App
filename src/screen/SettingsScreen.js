import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform, // Import Platform
  StatusBar,  // Import StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// --- 1. Import the new AppHeader component ---
import AppHeader from '../screen/components/AppHeader';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => navigation.popToTop() }
      ]
    );
  };

  return (
    // --- FIX: Use SafeAreaView for the main wrapper ---
    <SafeAreaView style={styles.container}>
      {/* --- 2. Replace the old header with the reusable AppHeader component --- */}
      <AppHeader />

      <Text style={styles.pageTitle}>Settings</Text>

      <View style={styles.settingsGroup}>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="person-outline" size={24} color="#4F46E5" />
          <Text style={styles.settingText}>Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="notifications-outline" size={24} color="#4F46E5" />
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="shield-outline" size={24} color="#4F46E5" />
          <Text style={styles.settingText}>Privacy</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="help-circle-outline" size={24} color="#4F46E5" />
          <Text style={styles.settingText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.settingsGroup}>
        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text style={[styles.settingText, { color: '#EF4444' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- 3. Remove the old, duplicated header styles from this file ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        // Add padding for Android status bar
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    // The 'header', 'headerLeft', 'logo', etc. styles have been removed.
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    settingsGroup: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        color: '#374151',
        marginLeft: 12,
    },
});

export default SettingsScreen;