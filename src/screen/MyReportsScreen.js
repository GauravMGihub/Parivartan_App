import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    },
  ]);

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
    pending: reports.filter(r => r.status === 'Pending').length,
    inProgress: reports.filter(r => r.status === 'In Progress').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
  };

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

      {/* Page Title with Actions */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>My Reports</Text>
        <View style={styles.pageActions}>
          <TouchableOpacity>
            <Ionicons name="funnel-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Status Summary */}
      <View style={styles.statusSummary}>
        <View style={[styles.statusCard, {backgroundColor: '#FEF3C7'}]}>
          <Text style={[styles.statusNumber, { color: '#F59E0B' }]}>{statusCounts.pending}</Text>
          <Text style={[styles.statusLabel, { color: '#92400E' }]}>Pending</Text>
        </View>
        <View style={[styles.statusCard, {backgroundColor: '#E0E7FF'}]}>
          <Text style={[styles.statusNumber, { color: '#4F46E5' }]}>
            {statusCounts.inProgress}
          </Text>
          <Text style={[styles.statusLabel, { color: '#3730A3' }]}>In Progress</Text>
        </View>
        <View style={[styles.statusCard, {backgroundColor: '#D1FAE5'}]}>
          <Text style={[styles.statusNumber, { color: '#10B981' }]}>
            {statusCounts.resolved}
          </Text>
          <Text style={[styles.statusLabel, { color: '#065F46' }]}>Resolved</Text>
        </View>
      </View>

      {/* Reports List */}
      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.reportsList}
      />
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
    pageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    pageActions: {
        flexDirection: 'row',
        gap: 16,
    },
    statusSummary: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 12,
    },
    statusCard: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    statusNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statusLabel: {
        fontSize: 14,
    },
    reportsList: {
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