import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import AppHeader from './components/AppHeader';

const MyReportsScreen = () => {
  const [reports] = useState([
    {
      id: 1,
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic issues',
      location: 'Main Street, Pimpri',
      date: '10/9/2025',
      status: 'In Progress',
      images: 2,
      icon: 'car',
      coordinate: { latitude: 18.6288, longitude: 73.7932 },
    },
    {
      id: 2,
      title: 'Broken Streetlight',
      description: 'Street light not working since last week',
      location: 'Park Avenue, Chinchwad',
      date: '9/9/2025',
      status: 'Pending',
      images: 1,
      icon: 'bulb',
      coordinate: { latitude: 18.6513, longitude: 73.7629 },
    },
    {
      id: 3,
      title: 'Overflowing Trash Bin',
      description: 'Trash bin overflowing near park entrance',
      location: 'City Park, Pimpri',
      date: '8/9/2025',
      status: 'Resolved',
      images: 1,
      icon: 'trash',
      coordinate: { latitude: 18.639, longitude: 73.804 },
    },
  ]);

  const [activeFilter, setActiveFilter] = useState(null);

  const PUNE_REGION = {
    latitude: 18.635,
    longitude: 73.78,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleFilterPress = (status) => {
    setActiveFilter(activeFilter === status ? null : status);
  };

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Pending': return '#F59E0B';
      case 'In Progress': return '#4F46E5';
      case 'Resolved': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#F59E0B';
      case 'In Progress': return '#4F46E5';
      case 'Resolved': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Pending': return '#FEF3C7';
      case 'In Progress': return '#E0E7FF';
      case 'Resolved': return '#D1FAE5';
      default: return '#F3F4F6';
    }
  };

  const statusCounts = {
    pending: reports.filter((r) => r.status === 'Pending').length,
    inProgress: reports.filter((r) => r.status === 'In Progress').length,
    resolved: reports.filter((r) => r.status === 'Resolved').length,
  };

  const filteredReports = activeFilter
    ? reports.filter((report) => report.status === activeFilter)
    : reports;

  const renderReportItem = ({ item }) => (
    <TouchableOpacity style={styles.reportCard}>
      <View style={styles.reportIcon}>
        <Ionicons name={item.icon} size={20} color="#4F46E5" />
      </View>
      <View style={styles.reportContent}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <Text style={styles.reportDescription}>{item.description}</Text>
        <View style={styles.reportMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={12} color="#6B7280" />
            <Text style={styles.metaText}>{item.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="camera-outline" size={12} color="#6B7280" />
            <Text style={styles.metaText}>{item.images}</Text>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(item.status) }]}>
        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  // --- NEW: Header component for the FlatList ---
  const ListHeader = () => (
    <>
      {/* Page Title */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>My Reports</Text>
      </View>
      {/* Status Filter Buttons */}
      <View style={styles.statusSummary}>
        <TouchableOpacity
          style={[ styles.statusCard, { backgroundColor: '#FEF3C7' }, activeFilter && activeFilter !== 'Pending' && styles.inactiveCard, ]}
          onPress={() => handleFilterPress('Pending')}
        >
          <Text style={[styles.statusNumber, { color: '#F59E0B' }]}>{statusCounts.pending}</Text>
          <Text style={[styles.statusLabel, { color: '#92400E' }]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ styles.statusCard, { backgroundColor: '#E0E7FF' }, activeFilter && activeFilter !== 'In Progress' && styles.inactiveCard, ]}
          onPress={() => handleFilterPress('In Progress')}
        >
          <Text style={[styles.statusNumber, { color: '#4F46E5' }]}>{statusCounts.inProgress}</Text>
          <Text style={[styles.statusLabel, { color: '#3730A3' }]}>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ styles.statusCard, { backgroundColor: '#D1FAE5' }, activeFilter && activeFilter !== 'Resolved' && styles.inactiveCard, ]}
          onPress={() => handleFilterPress('Resolved')}
        >
          <Text style={[styles.statusNumber, { color: '#10B981' }]}>{statusCounts.resolved}</Text>
          <Text style={[styles.statusLabel, { color: '#065F46' }]}>Resolved</Text>
        </TouchableOpacity>
      </View>
      {/* Map Component */}
      <View style={styles.mapSection}>
        <Text style={styles.sectionTitle}>Reports Map</Text>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={PUNE_REGION}>
            {filteredReports.map((report) => (
              <Marker
                key={report.id}
                coordinate={report.coordinate}
                title={report.title}
                description={report.location}
                pinColor={getMarkerColor(report.status)}
              />
            ))}
          </MapView>
        </View>
      </View>
      <Text style={[styles.sectionTitle, { paddingHorizontal: 20, marginBottom: 20 }]}>
          {activeFilter ? `${activeFilter} Reports` : 'All Reports'}
      </Text>
    </>
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* --- The main AppHeader is now the only fixed element --- */}
      <AppHeader />
      
      {/* --- The FlatList now controls all the scrolling content --- */}
      <FlatList
        ListHeaderComponent={ListHeader} // Use the new header component
        data={filteredReports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 10, // Add some top padding
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  statusSummary: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20, // Adjusted margin
    marginBottom: 20,
    gap: 12,
  },
  statusCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  inactiveCard: {
    opacity: 0.5,
  },
  statusNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 14,
  },
  mapSection: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  mapContainer: {
    height: 250,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    // This now only needs horizontal padding
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reportCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  reportMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default MyReportsScreen;