// ProfileDrawer.js

import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable, // Used for the background overlay
  Dimensions, // To get screen width
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Get the screen width for styling the drawer
const { width } = Dimensions.get('window');

const ProfileDrawer = ({ visible, onClose, navigation }) => {
  const handleLogout = () => {
    onClose(); // Close the drawer first
    // Then navigate to the login screen after a short delay
    setTimeout(() => {
      navigation.popToTop();
    }, 300);
  };

  return (
    <Modal
      animationType="fade" // 'slide' is vertical, 'fade' is a good alternative
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Pressable background to close the drawer when tapped */}
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.drawerContainer}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Ionicons name="person-circle" size={80} color="#4F46E5" />
            <TouchableOpacity>
              <Text style={styles.editPhotoText}>Edit Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Buttons Section */}
          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="person-outline" size={22} color="#374151" />
              <Text style={styles.menuButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={22} color="#EF4444" />
              <Text style={[styles.menuButtonText, { color: '#EF4444' }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  drawerContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75, // Drawer takes up 75% of the screen width
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 60, // Space for the status bar
  },
  profileSection: {
    alignItems: 'center',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  editPhotoText: {
    color: '#4F46E5',
    fontWeight: '600',
    marginTop: 8,
  },
  menuSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuButtonText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#374151',
    fontWeight: '500',
  },
});

export default ProfileDrawer;