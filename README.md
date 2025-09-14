# React Native Toast 🍞

A beautiful, customizable, and animated toast notification library for React Native with TypeScript support.

## Features ✨

- 🎨 **Beautiful UI** - Modern design with smooth animations
- 🎯 **TypeScript Support** - Fully typed for better development experience
- 🎭 **4 Toast Types** - Success, Error, Warning, and Info variants
- 📍 **Flexible Positioning** - Top, center, or bottom positioning
- ⏱️ **Auto-dismiss** - Configurable duration with progress bar
- 🎪 **Smooth Animations** - Spring animations powered by Reanimated
- 🎮 **Interactive** - Tap to dismiss or trigger custom actions
- 🎨 **Custom Icons** - SVG icons for each toast type
- 📱 **Safe Area** - Respects device safe areas
- 🔧 **Highly Configurable** - Extensive customization options

## Installation

```sh
npm install @azzamydev/react-native-toast
```

### Dependencies

This library requires the following peer dependencies:

```sh
npm install react-native-reanimated react-native-svg react-native-safe-area-context react-native-gesture-handler
```

For iOS, run:
```sh
cd ios && pod install
```

## Quick Start

### 1. Setup Provider

Wrap your app with `ToastProvider` and add `ToastContainer`:

```tsx
import React from 'react';
import { ToastProvider, ToastContainer } from '@azzamydev/react-native-toast';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <ToastProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Your app content */}
      </SafeAreaView>
      <ToastContainer />
    </ToastProvider>
  );
}
```

### 2. Use Toast Hook

```tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useToast } from '@azzamydev/react-native-toast';

const MyComponent = () => {
  const { show } = useToast();

  const showSuccess = () => {
    show({
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully',
      duration: 3000,
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={showSuccess}>
        <Text>Show Toast</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## API Reference

### ToastOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Toast type with different colors and icons |
| `title` | `string` | `undefined` | Toast title text |
| `message` | `string` | `undefined` | Toast message text |
| `duration` | `number` | `3000` | Auto-dismiss duration in milliseconds |
| `position` | `'top' \| 'center' \| 'bottom'` | `'top'` | Toast position on screen |
| `autoClose` | `boolean` | `true` | Whether to auto-dismiss the toast |
| `closeOnPress` | `boolean` | `true` | Whether to dismiss on tap |
| `showProgress` | `boolean` | `true` | Whether to show progress bar |
| `onPress` | `() => void` | `undefined` | Callback when toast is pressed |
| `onClose` | `() => void` | `undefined` | Callback when toast is dismissed |

### useToast Hook

```tsx
const { show, hide, hideAll, toasts } = useToast();
```

#### Methods

- `show(options: ToastOptions): string` - Show a toast and return its ID
- `hide(id: string): void` - Hide a specific toast by ID
- `hideAll(): void` - Hide all visible toasts
- `toasts: ToastData[]` - Array of currently visible toasts

## Usage Examples

### Basic Toast Types

```tsx
const { show } = useToast();

// Success toast
show({
  type: 'success',
  title: 'Success!',
  message: 'Data saved successfully',
});

// Error toast
show({
  type: 'error',
  title: 'Error!',
  message: 'Failed to save data',
});

// Warning toast
show({
  type: 'warning',
  title: 'Warning!',
  message: 'Please check your input',
});

// Info toast
show({
  type: 'info',
  title: 'Info',
  message: 'New update available',
});
```

### Custom Configuration

```tsx
// Custom duration and position
show({
  type: 'success',
  title: 'Custom Toast',
  message: 'This appears at bottom for 5 seconds',
  duration: 5000,
  position: 'bottom',
  showProgress: true,
});

// Interactive toast
show({
  type: 'info',
  title: 'Interactive Toast',
  message: 'Tap me for action!',
  closeOnPress: false,
  onPress: () => {
    console.log('Toast pressed!');
    // Handle custom action
  },
});

// Persistent toast (manual dismiss)
show({
  type: 'warning',
  title: 'Important Notice',
  message: 'This stays until manually dismissed',
  autoClose: false,
  closeOnPress: true,
});
```

### Managing Toasts

```tsx
const { show, hide, hideAll } = useToast();

// Show and get ID for later control
const toastId = show({
  type: 'info',
  title: 'Loading...',
  message: 'Please wait',
  autoClose: false,
});

// Hide specific toast
setTimeout(() => {
  hide(toastId);
}, 5000);

// Hide all toasts
const clearAll = () => {
  hideAll();
};
```

### Advanced Example

```tsx
const showAdvancedToast = () => {
  show({
    type: 'success',
    title: 'Upload Complete',
    message: 'Your file has been uploaded successfully',
    duration: 4000,
    position: 'top',
    showProgress: true,
    closeOnPress: true,
    onPress: () => {
      // Navigate to uploaded file
      navigation.navigate('Files');
    },
    onClose: () => {
      // Analytics or cleanup
      console.log('Toast dismissed');
    },
  });
};
```

## Animations

The library uses `react-native-reanimated` for smooth animations:

- **Entry Animation**: Spring animation with scale and translate effects
- **Exit Animation**: Fade out with scale down
- **Progress Bar**: Smooth width animation matching toast duration
- **Gesture Support**: Swipe to dismiss (planned feature)

## Customization

### Colors

Each toast type has predefined colors:

- **Success**: `#4CAF50` (Green)
- **Error**: `#F44336` (Red)
- **Warning**: `#FF9800` (Orange)
- **Info**: `#2196F3` (Blue)

### Icons

Custom SVG icons are included for each type:
- Success: Checkmark in circle
- Error: X in circle
- Warning: Exclamation triangle
- Info: Info circle

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  ToastType,
  ToastPosition,
  ToastOptions,
  ToastData,
  ToastContextType,
} from '@azzamydev/react-native-toast';
```

## Requirements

- React Native >= 0.60
- iOS 11+ / Android API 21+
- react-native-reanimated >= 3.0
- react-native-svg >= 13.0
- react-native-safe-area-context >= 4.0

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT © [AzzamyDev](https://github.com/AzzamyDev)

---

Made with ❤️ and [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
