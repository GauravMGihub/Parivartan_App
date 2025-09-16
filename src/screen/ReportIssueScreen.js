import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Image,
  Platform,
  StatusBar as RNStatusBar,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const ReportIssueScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Detecting location...');
  const [images, setImages] = useState([]);
  const [coordinate, setCoordinate] = useState(null);
  const mapRef = useRef(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');


  const PUNE_REGION = {
    latitude: 18.635,
    longitude: 73.78,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // --- NEW: Final list of categories as discussed ---
  const mainCategories = [
    { id: 1, name: 'Roads & Traffic', icon: 'car', color: '#4F46E5' },
    { id: 3, name: 'Waste & Cleanliness', icon: 'trash', color: '#10B981' },
    { id: 2, name: 'Street Lighting', icon: 'bulb', color: '#F59E0B' },
    { id: 'other', name: 'Other', icon: 'apps', color: '#6B7280' }, 
  ];

  const otherCategories = [
    { id: 4, name: 'Stray Animals', icon: 'paw' },
    { id: 5, name: 'Illegal Construction', icon: 'business' },
    { id: 6, name: 'Drainage & Water Logging', icon: 'water' },
    { id: 7, name: 'Parks & Public Spaces', icon: 'leaf' },
    { id: 8, name: 'Electrical Hazards', icon: 'flash' },
  ];

  const handleCategorySelect = (category) => {
    if (category.id === 'other') {
      setModalVisible(true);
    } else {
      setSelectedCategory(category.id);
      setSelectedCategoryName(category.name);
    }
  };

  const handleModalCategorySelect = (category) => {
    setSelectedCategory(category.id);
    setSelectedCategoryName(category.name);
    setModalVisible(false);
  };
  
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
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      Alert.alert('Success', 'Report submitted successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('MyReports') }
      ]);
    } catch (error) {
      console.error("Submission Error:", error);
      Alert.alert('Submission Failed', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Category</Text>
            <FlatList
              data={otherCategories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => handleModalCategorySelect(item)}>
                  <Ionicons name={item.icon} size={24} color="#4F46E5" />
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report Issue</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Type</Text>
          <View style={styles.categoriesGrid}>
            {mainCategories.map((category) => {
              const isSelected = selectedCategory === category.id || 
                                 (category.id === 'other' && selectedCategory > 3);
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[ styles.categoryCard, isSelected && styles.categorySelected ]}
                  onPress={() => handleCategorySelect(category)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <Ionicons name={category.icon} size={24} color="#fff" />
                  </View>
                  <Text style={styles.categoryName}>
                    {category.id === 'other' && isSelected ? selectedCategoryName : category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

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
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>

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
                  <TouchableOpacity style={styles.removeImageButton} onPress={() => handleRemoveImage(index)}>
                    <Ionicons name="close-circle" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 20,
      width: '85%',
      maxHeight: '70%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    modalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
      gap: 15,
    },
    modalItemText: {
      fontSize: 16,
    },
    modalCloseButton: {
      marginTop: 20,
      backgroundColor: '#E5E7EB',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    modalCloseButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#374151',
    },
});

export default ReportIssueScreen;