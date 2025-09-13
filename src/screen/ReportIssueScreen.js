import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const ReportIssueScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Auto-detected location');
  const [images, setImages] = useState([]);

  const categories = [
    { id: 1, name: 'Roads & Traffic', icon: 'car', color: '#4F46E5' },
    { id: 2, name: 'Street Lighting', icon: 'bulb', color: '#F59E0B' },
    { id: 3, name: 'Waste & Cleanliness', icon: 'trash', color: '#10B981' },
    { id: 4, name: 'Parks & Recreation', icon: 'leaf', color: '#059669' },
  ];

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take photos');
      return false;
    }
    return true;
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Location permission is required');
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    try {
      const locationData = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
      
      if (address[0]) {
        setLocation(`${address[0].street}, ${address[0].city}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to get current location');
    }
  };

  const handleSubmit = () => {
    if (!selectedCategory || !title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your backend
    Alert.alert('Success', 'Report submitted successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('MyReports') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report Issue</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Issue Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Type</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categorySelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Brief description of the issue"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Provide more details about the issue..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationRow}>
            <View style={styles.locationInfo}>
              <Ionicons name="location" size={20} color="#10B981" />
              <Text style={styles.locationText}>{location}</Text>
            </View>
            <TouchableOpacity 
              style={styles.locationButton}
              onPress={getCurrentLocation}
            >
              <Ionicons name="navigate" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={40} color="#6B7280" />
            <Text style={styles.photoButtonText}>Add Photo</Text>
          </TouchableOpacity>
          {images.length > 0 && (
            <Text style={styles.imageCount}>{images.length} photo(s) added</Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </ScrollView>
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
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#000',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        width: '48%',
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    categorySelected: {
        borderColor: '#4F46E5',
        backgroundColor: '#EEF2FF',
    },
    categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#374151',
    },
    textInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        color: '#000',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    locationInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        gap: 8,
    },
    locationText: {
        fontSize: 16,
        color: '#374151',
    },
    locationButton: {
        backgroundColor: '#4F46E5',
        width: 48,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#D1D5DB',
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoButtonText: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 8,
    },
    imageCount: {
        fontSize: 14,
        color: '#10B981',
        marginTop: 8,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#4F46E5',
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ReportIssueScreen;