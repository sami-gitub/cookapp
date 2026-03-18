import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButtonInline} onPress={() => router.back()}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        setPhotoUri(photo.uri);
      }
    }
  };

  const handleRetake = () => {
    setPhotoUri(null);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      Alert.alert(
        "Scan Complete", 
        "Mock AI: Found tomatoes, eggs, and cheese!",
        [{ text: "OK" }]
      );
      setIsAnalyzing(false);
    }, 2000);
  };

  if (photoUri) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Image source={{ uri: photoUri }} style={styles.previewImage} contentFit="cover" />
        
        <SafeAreaView style={styles.overlayContainer}>
          {/* Header Controls for Preview */}
          <View style={styles.cameraHeader}>
            {isAnalyzing ? null : (
              <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <Ionicons name="close" size={32} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>

          {isAnalyzing ? (
            <View style={styles.analyzingOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.analyzingText}>Scanning your fridge...</Text>
            </View>
          ) : (
            /* Action Buttons */
            <View style={styles.previewActions}>
              <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
                <Text style={styles.retakeButtonText}>Retake</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
                <Text style={styles.analyzeButtonText}>Analyze Ingredients</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <CameraView 
        style={styles.camera} 
        facing="back" 
        ref={cameraRef}
      >
        <SafeAreaView style={styles.cameraOverlay}>
          {/* Header Controls */}
          <View style={styles.cameraHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="close" size={32} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Shutter Button */}
          <View style={styles.cameraFooter}>
            <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
              <View style={styles.shutterInner} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme.colors.background,
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonInline: {
    marginTop: 10,
  },
  backText: {
    color: theme.colors.textLight,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 8,
    borderRadius: 24,
  },
  cameraFooter: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  // Preview Styles
  previewImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  retakeButton: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  analyzeButton: {
    flex: 2,
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
