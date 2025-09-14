import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ToastProvider, useToast, ToastContainer } from 'react-native-toast';
import { SafeAreaView } from 'react-native-safe-area-context';

const ToastDemo = () => {
  const { show } = useToast();

  const showSuccess = () => {
    show({
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully',
      duration: 5000,
    });
  };

  const showError = () => {
    show({
      type: 'error',
      title: 'Error!',
      message: 'Something went wrong',
      duration: 4000,
    });
  };

  const showWarning = () => {
    show({
      type: 'warning',
      title: 'Warning!',
      message: 'Please check your input',
      duration: 3500,
    });
  };

  const showInfo = () => {
    show({
      type: 'info',
      title: 'Info',
      message: 'This is an information message',
      duration: 3000,
    });
  };

  const showCustom = () => {
    show({
      type: 'success',
      title: 'Custom Toast',
      message: 'This toast has custom settings',
      duration: 5000,
      position: 'bottom',
      showProgress: true,
      onPress: () => console.log('Toast pressed!'),
    });
  };

  const showAnimatedDemo = () => {
    // Show multiple toasts with different animations
    setTimeout(() => {
      show({
        type: 'info',
        title: 'Animated Toast 1',
        message: 'Spring animation with reanimated',
        position: 'top',
        duration: 3000,
      });
    }, 100);

    setTimeout(() => {
      show({
        type: 'warning',
        title: 'Animated Toast 2',
        message: 'Smooth progress bar animation',
        position: 'center',
        duration: 4000,
        showProgress: true,
      });
    }, 500);

    setTimeout(() => {
      show({
        type: 'error',
        title: 'Animated Toast 3',
        message: 'Bottom position with scale effect',
        position: 'bottom',
        duration: 3500,
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>React Native Toastify Demo</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={showSuccess}
          >
            <Text style={styles.buttonText}>Show Success Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={showError}
          >
            <Text style={styles.buttonText}>Show Error Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={showWarning}
          >
            <Text style={styles.buttonText}>Show Warning Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showInfo}
          >
            <Text style={styles.buttonText}>Show Info Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={showCustom}
          >
            <Text style={styles.buttonText}>Show Custom Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.animatedButton]}
            onPress={showAnimatedDemo}
          >
            <Text style={styles.buttonText}>Show Animated Demo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <ToastDemo />
      <ToastContainer />
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successButton: {
    backgroundColor: '#4CAF50',
  },
  errorButton: {
    backgroundColor: '#F44336',
  },
  warningButton: {
    backgroundColor: '#FF9800',
  },
  infoButton: {
    backgroundColor: '#2196F3',
  },
  customButton: {
    backgroundColor: '#9C27B0',
  },
  animatedButton: {
    backgroundColor: '#FF5722',
  },
});
