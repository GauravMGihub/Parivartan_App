// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import AppHeader from './components/AppHeader'; // Using the reusable header

// const ReportDetailScreen = ({ route, navigation }) => {
//   // Get the specific report data passed from the MyReportsScreen
//   const { report } = route.params;

//   // --- Dummy data for progress updates ---
//   const progressUpdates = [
//     { id: 1, text: 'Report received and assigned to Public Works', timestamp: '10/9/2025, 8:30:00 pm' },
//     { id: 2, text: 'Team dispatched to assess the issue', timestamp: '11/9/2025, 2:30:00 pm' },
//   ];

//   // Helper function for status badge styles
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Pending': return {
//         backgroundColor: '#FEF3C7',
//         color: '#F59E0B',
//         icon: 'time-outline',
//       };
//       case 'In Progress': return {
//         backgroundColor: '#E0E7FF',
//         color: '#4F46E5',
//         icon: 'sync-outline',
//       };
//       case 'Resolved': return {
//         backgroundColor: '#D1FAE5',
//         color: '#10B981',
//         icon: 'checkmark-circle-outline',
//       };
//       default: return {
//         backgroundColor: '#F3F4F6',
//         color: '#6B7280',
//         icon: 'help-circle-outline',
//       };
//     }
//   };

//   const statusStyle = getStatusStyle(report.status);

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Since this is a detail screen, we use a custom header with a back button */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Report Details</Text>
//         <View style={{ width: 24 }} />
//       </View>
      
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Main Report Info Card */}
//         <View style={styles.card}>
//           <View style={styles.reportHeader}>
//             <View style={styles.reportTitleContainer}>
//               <Ionicons name={report.icon || 'alert-circle-outline'} size={24} color="#4F46E5" />
//               <View>
//                 <Text style={styles.reportTitle}>{report.title}</Text>
//                 <Text style={styles.reportId}>#{report.id}</Text>
//               </View>
//             </View>
//             <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
//               <Ionicons name={statusStyle.icon} size={16} color={statusStyle.color} />
//               <Text style={[styles.statusText, { color: statusStyle.color }]}>{report.status}</Text>
//             </View>
//           </View>
//           <Text style={styles.reportDescription}>{report.description}</Text>
//           <View style={styles.reportMeta}>
//             <View style={styles.metaItem}>
//               <Ionicons name="location-outline" size={16} color="#6B7280" />
//               <Text style={styles.metaText}>{report.location}</Text>
//             </View>
//             <View style={styles.metaItem}>
//               <Ionicons name="calendar-outline" size={16} color="#6B7280" />
//               <Text style={styles.metaText}>{report.date}</Text>
//             </View>
//           </View>
//         </View>

//         {/* Priority & Category Cards */}
//         <View style={styles.infoGrid}>
//           <View style={styles.infoCard}>
//             <Text style={styles.infoLabel}>Priority</Text>
//             <Text style={[styles.infoValue, { color: '#EF4444' }]}>High</Text>
//           </View>
//           <View style={styles.infoCard}>
//             <Text style={styles.infoLabel}>Category</Text>
//             <Text style={styles.infoValue}>Roads</Text>
//           </View>
//         </View>

//         {/* Progress Updates Card */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Progress Updates</Text>
//           {progressUpdates.map((update, index) => (
//             <View key={update.id} style={styles.timelineItem}>
//               <View style={styles.timelineDot} />
//               {index < progressUpdates.length - 1 && <View style={styles.timelineConnector} />}
//               <View style={styles.timelineContent}>
//                 <Text style={styles.timelineText}>{update.text}</Text>
//                 <Text style={styles.timelineTimestamp}>{update.timestamp}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Action Buttons */}
//         <TouchableOpacity style={styles.actionButtonPrimary}>
//           <Ionicons name="image-outline" size={20} color="#fff" />
//           <Text style={styles.actionButtonTextPrimary}>View Photos ({report.images})</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionButtonSecondary}>
//           <Ionicons name="chatbubble-ellipses-outline" size={20} color="#4F46E5" />
//           <Text style={styles.actionButtonTextSecondary}>Add Comment</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   scrollContainer: {
//     padding: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   reportHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//   },
//   reportTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     flex: 1,
//   },
//   reportTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   reportId: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     gap: 4,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   reportDescription: {
//     fontSize: 16,
//     color: '#374151',
//     marginBottom: 16,
//     lineHeight: 24,
//   },
//   reportMeta: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//     paddingTop: 12,
//   },
//   metaItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   metaText: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   infoGrid: {
//     flexDirection: 'row',
//     gap: 16,
//     marginBottom: 20,
//   },
//   infoCard: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   infoValue: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 16,
//   },
//   timelineItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   timelineDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#4F46E5',
//     marginTop: 5,
//   },
//   timelineConnector: {
//     position: 'absolute',
//     top: 15,
//     left: 4,
//     width: 2,
//     height: '100%',
//     backgroundColor: '#E0E7FF',
//   },
//   timelineContent: {
//     marginLeft: 16,
//   },
//   timelineText: {
//     fontSize: 14,
//     color: '#374151',
//   },
//   timelineTimestamp: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     marginTop: 4,
//   },
//   actionButtonPrimary: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#4F46E5',
//     padding: 16,
//     borderRadius: 8,
//     gap: 8,
//     marginBottom: 12,
//   },
//   actionButtonTextPrimary: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   actionButtonSecondary: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#EEF2FF',
//     padding: 16,
//     borderRadius: 8,
//     gap: 8,
//   },
//   actionButtonTextSecondary: {
//     color: '#4F46E5',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default ReportDetailScreen;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReportDetailScreen = ({ route, navigation }) => {
  const { report } = route.params;

  // --- 1. NEW MOCK DATA reflecting your 6-step workflow ---
  const progressUpdates = [
    { 
      id: 1, 
      state: 'Pending', 
      details: 'Your report has been submitted and is awaiting review.', 
      timestamp: '10/9/2025, 8:30:00 pm' 
    },
    { 
      id: 2, 
      state: 'Assigned', 
      details: 'Assigned to worker: Ramesh Kumar by Admin.', 
      timestamp: '11/9/2025, 9:00:00 am' 
    },
    { 
      id: 3, 
      state: 'In Progress', 
      details: 'The assigned worker has started to address the issue.', 
      timestamp: '11/9/2025, 10:15:00 am' 
    },
    { 
      id: 4, 
      state: 'Acknowledged', 
      details: 'The worker has acknowledged the completion of the task.', 
      timestamp: '11/9/2025, 2:00:00 pm' 
    },
    { 
      id: 5, 
      state: 'Resolved', 
      details: 'The issue has been verified and marked as resolved by the admin.', 
      timestamp: '11/9/2025, 2:30:00 pm' 
    },
    { 
      id: 6, 
      state: 'Closed', 
      details: 'The report is now closed.', 
      timestamp: '11/9/2025, 4:00:00 pm' 
    },
  ];

  // --- 2. UPDATED HELPER FUNCTION to include all 6 states ---
  const getTimelineIcon = (state) => {
    switch (state) {
      case 'Pending': return { name: 'hourglass-outline', color: '#F59E0B' };
      case 'Assigned': return { name: 'person-outline', color: '#8B5CF6' }; // Purple for Assigned
      case 'In Progress': return { name: 'sync-outline', color: '#4F46E5' };
      case 'Acknowledged': return { name: 'eye-outline', color: '#6B7280' };
      case 'Resolved': return { name: 'shield-checkmark-outline', color: '#10B981' };
      case 'Closed': return { name: 'lock-closed-outline', color: '#374151' };
      default: return { name: 'help-circle-outline', color: '#6B7280' };
    }
  };

  const getStatusStyle = (status) => {
    // This function can remain as is, since the main report status is likely one of the core states
    switch (status) {
      case 'Pending': return { backgroundColor: '#FEF3C7', color: '#F59E0B', icon: 'time-outline' };
      case 'In Progress': return { backgroundColor: '#E0E7FF', color: '#4F46E5', icon: 'sync-outline' };
      case 'Resolved': return { backgroundColor: '#D1FAE5', color: '#10B981', icon: 'checkmark-circle-outline' };
      case 'Closed': return { backgroundColor: '#E5E7EB', color: '#374151', icon: 'lock-closed-outline' };
      default: return { backgroundColor: '#F3F4F6', color: '#6B7280', icon: 'help-circle-outline' };
    }
  };

  const statusStyle = getStatusStyle(report.status);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Details</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Main Report Info Card (no changes) */}
        <View style={styles.card}>
          <View style={styles.reportHeader}>
            <View style={styles.reportTitleContainer}>
              <Ionicons name={report.icon || 'alert-circle-outline'} size={24} color="#4F46E5" />
              <View>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportId}>#{report.id}</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
              <Ionicons name={statusStyle.icon} size={16} color={statusStyle.color} />
              <Text style={[styles.statusText, { color: statusStyle.color }]}>{report.status}</Text>
            </View>
          </View>
          <Text style={styles.reportDescription}>{report.description}</Text>
          <View style={styles.reportMeta}>
                      <View style={[ styles.metaItemFlexible,{ flexDirection: 'row' },{flex:1}]}>
              <Ionicons name="location-outline" size={16} color="#6B7280" />
              <Text style={styles.metaText}>{report.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text style={styles.metaText}>{report.date}</Text>
            </View>
          </View>
        </View>

        {/* Priority & Category Cards (no changes) */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Severity</Text>
            <Text style={[styles.infoValue, { color: '#EF4444' }]}>Critical</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Category</Text>
            <Text style={styles.infoValue}>Roads</Text>
          </View>
        </View>

        {/* --- 3. THE UI WILL NOW AUTOMATICALLY RENDER THE 6 STEPS --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Progress Updates</Text>
          {progressUpdates.map((update, index) => {
            const timelineIcon = getTimelineIcon(update.state);
            return (
              <View key={update.id} style={styles.timelineItem}>
                {index < progressUpdates.length - 1 && <View style={styles.timelineConnector} />}
                <View style={[styles.timelineDot, { backgroundColor: timelineIcon.color }]}>
                  <Ionicons name={timelineIcon.name} size={14} color="#fff" />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineState}>{update.state}</Text>
                  <Text style={styles.timelineDetails}>{update.details}</Text>
                  
                </View>
              </View>
            );
          })}
        </View>

        {/* Action Buttons (no changes) */}
        <TouchableOpacity style={styles.actionButtonPrimary}>
          <Ionicons name="image-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonTextPrimary}>View Photos ({report.images})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonSecondary}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#4F46E5" />
          <Text style={styles.actionButtonTextSecondary}>Add Comment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// No changes needed to the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  scrollContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reportTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  reportId: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  reportDescription: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
    lineHeight: 24,
  },
  reportMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
    metaItemFlexible: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginRight: 10,
    },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    flexShrink: 1,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  timelineConnector: {
    position: 'absolute',
    top: 12,
    left: 11,
    width: 2,
    height: '100%',
    backgroundColor: '#E0E7FF',
  },
  timelineContent: {
    marginLeft: 12,
    flex: 1,
  },
  timelineState: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  timelineDetails: {
    fontSize: 14,
    color: '#374151',
    marginTop: 2,
  },
  timelineTimestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  actionButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginBottom: 12,
  },
  actionButtonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonTextSecondary: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportDetailScreen;
