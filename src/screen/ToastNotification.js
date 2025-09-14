import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// --- FIX: Import hook to get safe area values ---
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ToastNotification = ({ message, type, visible }) => {
  const slideAnim = useRef(new Animated.Value(150)).current; // Start further off-screen
  // --- FIX: Get the bottom safe area inset ---
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        // --- FIX: Animate to the bottom inset + 20px padding ---
        toValue: insets.bottom + 20,
        duration: 300,
        useNativeDriver: false, // translateY needs this set to false for this type of animation
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 150,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, insets.bottom]); // Re-run effect if inset changes

  if (!message) return null;

  const backgroundColor = type === 'success' ? '#10B981' : '#EF4444';
  const iconName = type === 'success' ? 'checkmark-circle' : 'alert-circle';

  return (
    <Animated.View
      style={[
        styles.container,
        // --- FIX: Use 'bottom' style property instead of transform ---
        { backgroundColor, bottom: slideAnim },
      ]}
    >
      <Ionicons name={iconName} size={24} color="#fff" />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // --- FIX: Remove 'bottom' from here, it's now controlled by animation ---
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
});

export default ToastNotification;