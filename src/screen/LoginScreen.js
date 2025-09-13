import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  // --- NEW --- State to toggle between login methods
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'

  // States for email login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- NEW --- State for phone login
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (loginMethod === 'email') {
      if (!email.trim() || !password.trim()) {
        alert('Please fill in all fields');
        return;
      }
      // Your existing email/password logic here
      console.log('Logging in with Email:', email);
      navigation.navigate('Main');
    } else {
      // --- NEW --- Phone number validation and navigation
      if (phoneNumber.trim().length < 10) {
        alert('Please enter a valid phone number');
        return;
      }
      console.log('Sending OTP to:', phoneNumber);
      // Navigate to the OTP screen, passing the phone number as a parameter
      navigation.navigate('OTP', { phoneNumber: phoneNumber });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.content}>
              {/* Logo (No changes here) */}
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>PR</Text>
                </View>
                <Text style={styles.appTitle}>Parivartan</Text>
                <Text style={styles.appSubtitle}>Report. Track. Improve.</Text>
              </View>

              {/* --- NEW: Login Method Toggle --- */}
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleButton, loginMethod === 'email' && styles.activeToggleButton]}
                  onPress={() => setLoginMethod('email')}
                >
                  <Text style={[styles.toggleButtonText, loginMethod === 'email' && styles.activeToggleButtonText]}>
                    Email
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, loginMethod === 'phone' && styles.activeToggleButton]}
                  onPress={() => setLoginMethod('phone')}
                >
                  <Text style={[styles.toggleButtonText, loginMethod === 'phone' && styles.activeToggleButtonText]}>
                    Phone Number
                  </Text>
                </TouchableOpacity>
              </View>

              {/* --- MODIFIED: Conditional Form Rendering --- */}
              {loginMethod === 'email' ? (
                <View style={styles.form}>
                  {/* Email Input */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {/* Password Input */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordInput}>
                      <TextInput
                        style={styles.passwordField}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.form}>
                  {/* Phone Number Input */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.loginButton} onPress={handleContinue}>
                <Text style={styles.loginButtonText}>
                  {loginMethod === 'email' ? 'Login' : 'Send OTP'}
                </Text>
              </TouchableOpacity>

              <View style={styles.registerLink}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


// --- STYLES (Includes new styles for the toggle) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  appTitle: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 8 },
  appSubtitle: { fontSize: 16, color: '#6B7280' },
  // --- NEW STYLES ---
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeToggleButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeToggleButtonText: {
    color: '#4F46E5',
  },
  // --- END NEW STYLES ---
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 16, fontWeight: '500', color: '#374151' },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
  },
  passwordField: { flex: 1, paddingVertical: 16, fontSize: 16 },
  loginButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: { fontSize: 16, color: '#6B7280' },
  registerButtonText: { fontSize: 16, color: '#4F46E5', fontWeight: '600' },
});

export default LoginScreen;