import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from './components/AppHeader';

const HomeScreen = ({ navigation }) => {
  const categories = [
    { id: 1, name: 'Roads & Traffic', icon: 'car', color: '#4F46E5' },
    { id: 2, name: 'Street Lighting', icon: 'bulb', color: '#F59E0B' },
    { id: 3, name: 'Waste & Cleanliness', icon: 'trash', color: '#10B981' },
    { id: 4, name: 'Parks & Recreation', icon: 'leaf', color: '#059669' },
  ];
  
  // --- 1. MOCK REPORT STATUS CHANGED TO 'Resolved' ---
  const recentReports = [
    {
      id: 1,
      title: 'Pothole on Main Street',
      location: 'Main Street, Pimpri',
      date: '10/9/2025',
      status: 'Resolved', // <-- Changed from 'In Progress'
      icon: 'car',
    },
  ];

  // --- 2. NEW HELPER FUNCTION FOR DYNAMIC BADGE STYLING ---
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Resolved':
        return { backgroundColor: '#D1FAE5', color: '#065F46' };
      case 'In Progress':
        return { backgroundColor: '#E0E7FF', color: '#4F46E5' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader />

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome, Citizen!</Text>
          <Text style={styles.welcomeSubtitle}>
            Help improve your community by reporting issues
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.statText}>24 Reports Resolved</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="time" size={20} color="#fff" />
              <Text style={styles.statText}>Avg. 2.3 days</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => navigation.navigate('Report')}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.reportButtonText}>Report an Issue</Text>
          <Text style={styles.reportButtonSubtext}>
            Take a photo and describe the problem
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Report')}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon} size={28} color="#fff" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reports</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyReports')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentReports.map((report) => {
              // Get the dynamic styles for the badge
              const badgeStyle = getStatusBadgeStyle(report.status);
              return (
              <TouchableOpacity
                key={report.id}
                style={styles.reportCard}
                onPress={() => navigation.navigate('ReportDetail', { report: report })} 
              >
                <View style={styles.reportIcon}>
                  <Ionicons name={report.icon} size={20} color="#4F46E5" />
                </View>
                <View style={styles.reportContent}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportLocation}>{report.location}</Text>
                  <Text style={styles.reportDate}>{report.date}</Text>
                </View>
                {/* --- 3. DYNAMIC STYLES APPLIED TO THE BADGE --- */}
                <View style={[styles.statusBadge, { backgroundColor: badgeStyle.backgroundColor }]}>
                  <Text style={[styles.statusText, { color: badgeStyle.color }]}>{report.status}</Text>
                </View>
              </TouchableOpacity>
          )})}
        </View>
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
    welcomeCard: {
      backgroundColor: '#4F46E5',
      margin: 20,
      padding: 20,
      borderRadius: 16,
    },
    welcomeTitle: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    welcomeSubtitle: {
      color: '#E0E7FF',
      fontSize: 16,
      marginBottom: 16,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 20,
    },
    stat: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    statText: {
      color: '#fff',
      fontSize: 14,
    },
    reportButton: {
      backgroundColor: '#10B981',
      marginHorizontal: 20,
      marginTop: 0,
      marginBottom: 20,
      padding: 20,
      borderRadius: 16,
      alignItems: 'center',
    },
    reportButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
      marginTop: 8,
    },
    reportButtonSubtext: {
      color: '#D1FAE5',
      fontSize: 14,
      marginTop: 4,
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 16,
      color: '#000',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    viewAllText: {
      color: '#4F46E5',
      fontSize: 16,
      fontWeight: '500',
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    categoryIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
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
    reportLocation: {
      fontSize: 14,
      color: '#6B7280',
      marginBottom: 2,
    },
    reportDate: {
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

export default HomeScreen;