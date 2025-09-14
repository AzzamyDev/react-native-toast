import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';
import type { ToastData } from './types';

const { width: screenWidth } = Dimensions.get('window');

interface ToastProps {
  toast: ToastData;
  onHide: (id: string) => void;
}

const SuccessIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ErrorIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
    <Path
      d="M15 9l-6 6m0-6l6 6"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const WarningIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InfoIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
    <Path
      d="M12 16v-4m0-4h.01"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const getToastStyle = (type: string) => {
  switch (type) {
    case 'success':
      return { backgroundColor: '#4CAF50', IconComponent: SuccessIcon };
    case 'error':
      return { backgroundColor: '#F44336', IconComponent: ErrorIcon };
    case 'warning':
      return { backgroundColor: '#FF9800', IconComponent: WarningIcon };
    case 'info':
    default:
      return { backgroundColor: '#2196F3', IconComponent: InfoIcon };
  }
};

const getPositionStyle = (position: string) => {
  switch (position) {
    case 'top':
      return { top: 50 };
    case 'bottom':
      return { bottom: 50 };
    case 'center':
    default:
      return { top: '50%', marginTop: -30 };
  }
};

export const Toast: React.FC<ToastProps> = ({ toast, onHide }) => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const progressWidth = useSharedValue(0);

  const toastStyle = getToastStyle(toast.type || 'info');
  const positionStyle = getPositionStyle(toast.position || 'top');
  const { IconComponent } = toastStyle;

  useEffect(() => {
    // Show animation with spring effect
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 200,
    });
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, {
      damping: 30,
      stiffness: 100,
    });

    // Progress animation
    if (toast.showProgress && toast.duration) {
      progressWidth.value = withTiming(screenWidth - 40, {
        duration: toast.duration,
      });
    }

    // Auto close timer
    if (toast.autoClose && toast.duration) {
      const timer = setTimeout(() => {
        hideToast();
      }, toast.duration);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [
    toast.autoClose,
    toast.duration,
    toast.showProgress,
    translateY,
    opacity,
    scale,
    progressWidth,
  ]);

  const handlePress = () => {
    if (toast.closeOnPress) {
      hideToast();
    }
    toast.onPress?.();
  };

  const hideToast = useCallback(() => {
    translateY.value = withTiming(-100, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withTiming(0.8, { duration: 300 }, () => {
      runOnJS(onHide)(toast.id);
    });
  }, [translateY, opacity, scale, onHide, toast.id]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });

  return (
    <Animated.View style={[styles.container, positionStyle, animatedStyle]}>
      <TouchableOpacity
        style={[styles.toast, { backgroundColor: toastStyle.backgroundColor }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <IconComponent />
          </View>
          <View style={styles.textContainer}>
            {toast.title && <Text style={styles.title}>{toast.title}</Text>}
            {toast.message && (
              <Text style={styles.message}>{toast.message}</Text>
            )}
          </View>
        </View>
        {toast.showProgress && (
          <Animated.View style={[styles.progress, progressAnimatedStyle]} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toast: {
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 20,
    height: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
});
