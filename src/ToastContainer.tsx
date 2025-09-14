import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Toast } from './Toast';
import { useToast } from './ToastContext';

export const ToastContainer: React.FC = () => {
  const { toasts, hide } = useToast();

  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onHide={hide} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    pointerEvents: 'box-none',
  },
});
