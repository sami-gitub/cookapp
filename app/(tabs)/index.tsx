import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greetingText}>Hello! Ready to cook?</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={theme.colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a recipe, an ingredient..."
            placeholderTextColor={theme.colors.textLight}
          />
          <View style={styles.searchActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="mic" size={20} color={theme.colors.textLight} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.cameraButton]}>
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Pills */}
        <View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContent}
          >
            <TouchableOpacity style={styles.pill}>
              <Text style={styles.pillText}>⏱️ Under 15m</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill}>
              <Text style={styles.pillText}>🥦 Veggie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill}>
              <Text style={styles.pillText}>🍜 Asian</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
  },
  searchActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 6,
  },
  cameraButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    padding: 8,
    marginLeft: 4,
  },
  filtersContent: {
    paddingRight: 40,
  },
  pill: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  pillText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});
