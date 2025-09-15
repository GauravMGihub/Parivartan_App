import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView, // Use SafeAreaView for the main wrapper
  Image,
  // --- FIX: Add Platform and StatusBar for better safe area handling ---
  Platform,
  StatusBar as RNStatusBar, // Rename to avoid conflict
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const ReportIssueScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Detecting location...');
  const [images, setImages] = useState([]);
  const [coordinate, setCoordinate] = useState(null);
  const mapRef = useRef(null);

  const PUNE_REGION = {
    latitude: 18.635,
    longitude: 73.78,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const categories = [
    { id: 1, name: 'Roads & Traffic', icon: 'car', color: '#4F46E5' },
    { id: 2, name: 'Street Lighting', icon: 'bulb', color: '#F59E0B' },
    { id: 3, name: 'Waste & Cleanliness', icon: 'trash', color: '#10B981' },
    { id: 4, name: 'Parks & Recreation', icon: 'leaf', color: '#059669' },
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

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
      setLocation('Permission denied');
      Alert.alert('Permission needed', 'Location permission is required to auto-detect your position.');
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
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
      const { latitude, longitude } = locationData.coords;
      
      setCoordinate({ latitude, longitude });
      
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      
      if (address[0]) {
        const { street, city, postalCode } = address[0];
        setLocation(`${street ? street + ', ' : ''}${city}, ${postalCode}`);
      }
      
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

    } catch (error) {
      setLocation('Could not fetch location');
      Alert.alert('Error', 'Unable to get current location');
    }
  };

  const handleSubmit = async () => {
    // Update validation to remove title and check for at least one image
    if (!selectedCategory || !description.trim() || !coordinate || images.length === 0) {
      Alert.alert('Incomplete Form', 'Please select a category, write a description, add a photo, and ensure location is detected.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    const image = images[0];
    const uriParts = image.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('image', {
      uri: image.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    // Append all the text fields
    formData.append('description', description);
    formData.append('latitude', coordinate.latitude);
    formData.append('longitude', coordinate.longitude);
    formData.append('location_address', location);
    formData.append('category_id', selectedCategory);

    const API_URL = 'https://parivartan-backend.onrender.com/api/reports'; 
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        // NOTE: Do NOT add a 'Content-Type': 'multipart/form-data' header.
        // React Native's fetch will automatically set it with the correct boundary.
      });

      const result = await response.json();

      if (!response.ok) {
        // If the server responds with an error (e.g., 400, 500)
        throw new Error(result.message || 'Something went wrong');
      }

      // If the submission was successful
      Alert.alert('Success', 'Report submitted successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('MyReports') }
      ]);

    } catch (error) {
      // If there was a network error or an error from the server
      console.error("Submission Error:", error);
      Alert.alert('Submission Failed', error.message);

    } finally {
      // This will run whether the submission succeeded or failed
      setIsSubmitting(false);
    }
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
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Brief description of the issue"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View> */}

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
          
          <View style={styles.mapContainer}>
            <MapView 
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map} 
              initialRegion={PUNE_REGION}
            >
              {coordinate && <Marker coordinate={coordinate} />}
            </MapView>
          </View>

          <View style={styles.locationDisplayBox}>
            <Ionicons name="location-sharp" size={20} color="#10B981" />
            <Text style={styles.locationText}>
              {location}
            </Text>
          </View>
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos ({images.length})</Text>
          
          <TouchableOpacity style={styles.fullWidthPhotoButton} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={24} color="#4F46E5" />
            <Text style={styles.photoButtonText}>Take Photo</Text>
          </TouchableOpacity>

          {images.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreviewContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.previewImageWrapper}>
                  <Image source={{ uri: image.uri }} style={styles.previewImage} />
                  <TouchableOpacity 
                    style={styles.removeImageButton} 
                    onPress={() => handleRemoveImage(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitting}>
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    // --- FIX: Updated container style ---
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
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
        paddingTop: 10,
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
    mapContainer: {
        height: 200,
        backgroundColor: '#E5E7EB',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 12,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    locationDisplayBox: {
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
      flex: 1,
      fontSize: 16,
      color: '#374151',
    },
    fullWidthPhotoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingVertical: 16,
    },
    photoButtonText: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '500',
    },
    imagePreviewContainer: {
        marginTop: 16,
    },
    previewImageWrapper: {
        position: 'relative',
        marginRight: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
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