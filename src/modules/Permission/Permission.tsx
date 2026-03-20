// Permissions.ts
import { Platform } from 'react-native';
import {
  check,
  request,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

// Define mapping objects for each logical permission
const camera = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
};

const image = {
  // iOS: photo library read (iOS 14+ limited possible)
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  // Android 13+ uses READ_MEDIA_IMAGES; prior versions use READ_EXTERNAL_STORAGE
  android:
    Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};

const location = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

// Example for background location if needed
const location1 = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
};

const readImages = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android:
    Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};

const readExternal = {
  ios: null, // not applicable
  android:
    Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};

const notification = {
  ios: 'NOTIFICATION',
  android: 'NOTIFICATION',
};

const AllPermission: Record<string, any> = {
  camera,
  image,
  location,
  location1,
  readImages,
  readExternal,
  notification,
};

export type RequestPermissions =
  | 'camera'
  | 'image'
  | 'location'
  | 'readImages'
  | 'readExternal'
  | 'location1'
  | 'notification';

class PermissionClass {
  checkAndRequest: (type: RequestPermissions) => Promise<boolean> = async (type) => {
    const permissionObj = AllPermission[type];
    const platformKey = Platform.OS === 'ios' ? 'ios' : 'android';
    const permission: Permission | string | null = permissionObj?.[platformKey] ?? null;

    // Special case: Notification
    if (permission === 'NOTIFICATION') {
      return await this.requestNotificationPermission();
    }

    if (!permission) {
      // No permission needed on this platform
      return true;
    }

    try {
      const result = await check(permission as Permission);
      if (result === RESULTS.GRANTED) {
        return true;
      }

      if (result === RESULTS.LIMITED) {
        // iOS limited photo library — you may treat as granted depending on use case
        return true;
      }

      if (result === RESULTS.BLOCKED) {
        // Blocked — user must go to settings to enable
        return false;
      }

      // DENIED or other: request it
      return await this.Request(permission as Permission);
    } catch (error) {
      console.warn('Error in Checking Permission', error);
      return false;
    }
  };

  Request: (permission: Permission) => Promise<boolean> = async (permission) => {
    try {
      const result = await request(permission);
      return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
    } catch (error) {
      console.warn('Error while Requesting Permission', error);
      return false;
    }
  };

  requestNotificationPermission: () => Promise<boolean> = async () => {
    try {
      // requestNotifications returns {status, settings}
      const { status } = await requestNotifications(['alert', 'sound', 'badge']);
      // note: on iOS it returns 'granted' etc. react-native-permissions normalizes sometimes;
      // safest: compare to RESULTS.GRANTED or the raw 'granted' string
      return status === RESULTS.GRANTED || status === 'granted';
    } catch (error) {
      console.warn('Error requesting notification permission', error);
      return false;
    }
  };

  requestMultiple: (types: RequestPermissions[]) => Promise<boolean> = async (types) => {
    try {
      for (const type of types) {
        const ok = await this.checkAndRequest(type);
        if (!ok) return false;
      }
      return true;
    } catch (error) {
      console.warn('Error in Requesting Multiple Permissions', error);
      return false;
    }
  };

  requestAll: () => Promise<boolean> = async () => {
    try {
      const types = Object.keys(AllPermission) as RequestPermissions[];
      for (const type of types) {
        const ok = await this.checkAndRequest(type);
        if (!ok) return false;
      }
      return true;
    } catch (error) {
      console.warn('Error in Requesting All Permissions', error);
      return false;
    }
  };
}

const Permissions = new PermissionClass();
export default Permissions;
