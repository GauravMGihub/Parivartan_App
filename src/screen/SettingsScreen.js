import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        // This should navigate back to the Login screen and reset the stack
        { text: 'Logout', onPress: () => navigation.popToTop() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>PR</Text>
          </View>
          <View>
            <Text style={styles.appName}>Parivartan</Text>
            <Text style={styles.location}>Pune</Text>
          </View>
        </View>
      </View>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        backgroundColor: '#4F46E5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    logoText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    appName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    location: {
        fontSize: 12,
        color: '#6B7280',
    },
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