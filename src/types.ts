export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition = 'top' | 'bottom' | 'center';

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number;
  position?: ToastPosition;
  autoClose?: boolean;
  closeOnPress?: boolean;
  showProgress?: boolean;
  onPress?: () => void;
  onClose?: () => void;
}

export interface ToastData extends ToastOptions {
  id: string;
  visible: boolean;
}

export interface ToastContextType {
  show: (options: ToastOptions) => string;
  hide: (id: string) => void;
  hideAll: () => void;
  toasts: ToastData[];
}
