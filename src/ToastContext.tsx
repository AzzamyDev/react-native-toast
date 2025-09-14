import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import type { ToastData, ToastOptions, ToastContextType } from './types';

interface ToastState {
  toasts: ToastData[];
}

type ToastAction =
  | { type: 'ADD_TOAST'; payload: ToastData }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'CLEAR_ALL' };

const initialState: ToastState = {
  toasts: [],
};

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        toasts: [],
      };
    default:
      return state;
  }
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const show = useCallback((options: ToastOptions): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastData = {
      id,
      visible: true,
      type: 'info',
      duration: 3000,
      position: 'top',
      autoClose: true,
      closeOnPress: true,
      showProgress: true,
      ...options,
    };

    dispatch({ type: 'ADD_TOAST', payload: toast });

    return id;
  }, []);

  const hide = useCallback(
    (id: string) => {
      const toast = state.toasts.find((t) => t.id === id);
      dispatch({ type: 'REMOVE_TOAST', payload: id });
      toast?.onClose?.();
    },
    [state.toasts]
  );

  const hideAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  const value: ToastContextType = {
    show,
    hide,
    hideAll,
    toasts: state.toasts,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
