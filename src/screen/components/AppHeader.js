import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image
          // Make sure this path is correct for your project structure
          source={require('../../../assets/images/satya icon.png')} 
          style={styles.logo}
          // --- THIS IS THE FIX ---
          // Add this line to properly scale the image within the container
          resizeMode="contain" 
        />
        <View>
          <Text style={styles.appName}>Parivartan</Text>
          <Text style={styles.location}>Pune</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.notificationBadge}>
          <Ionicons name="notifications" size={24} color="#666" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={32} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- No changes needed to styles ---
const styles = StyleSheet.create({
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
    marginRight: 12,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default AppHeader;