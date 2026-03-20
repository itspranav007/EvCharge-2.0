// import { Platform } from 'react-native';
// import {
//   PERMISSIONS,
//   Permission,
//   RESULTS,
//   check,
//   request,
//   checkNotifications,
//   requestNotifications,
// } from 'react-native-permissions';

// const camera = {
//   ios: PERMISSIONS.IOS.CAMERA,
//   android: PERMISSIONS.ANDROID.CAMERA,
// };
// const image = {
//   ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
//   android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
// };
// const location = {
//   ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//   android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
// };
// const readImages = {
//   ios: null,
//   android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
// };
// const readExternal = {
//   ios: null,
//   android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
// };
// const location1 = {
//   ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//   android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
// };


// const notification = {
//   ios: 'NOTIFICATION',
//   android: 'NOTIFICATION',
// };

// const AllPermission = {
//   camera,
//   image,
//   location,
//   location1,
//   readImages,
//   readExternal,
//   notification,
// };

// type RequestPermissions =
//   | 'camera'
//   | 'image'
//   | 'location'
//   | 'readImages'
//   | 'readExternal'
//   | 'location1'
//   | 'notification';

// class PermissionClass {
//   checkAndRequest: (type: RequestPermissions) => Promise<boolean> = async type => {
//     const permissionObj = AllPermission[type];
//     const platformKey = Platform.OS === 'ios' ? 'ios' : 'android';
//     const permission = permissionObj[platformKey];

//     // Special case: Notification
//     if (permission === 'NOTIFICATION') {
//       return await this.requestNotificationPermission();
//     }

//     if (!permission) {
//       return true; // no permission needed for platform
//     }

//     try {
//       const result = await check(permission);
//       if (result === RESULTS.GRANTED) {
//         return true;
//       } else {
//         return await this.Request(permission);
//       }
//     } catch (error) {
//       console.warn('Error in Checking Permission', error);
//       return false;
//     }
//   };

//   Request: (permission: Permission) => Promise<boolean> = async permission => {
//     try {
//       const result = await request(permission);
//       return result === RESULTS.GRANTED;
//     } catch (error) {
//       console.warn('Error while Requesting Permission', error);
//       return false;
//     }
//   };

//   requestNotificationPermission: () => Promise<boolean> = async () => {
//     try {
//       const { status } = await requestNotifications(['alert', 'sound', 'badge']);
//       return status === RESULTS.GRANTED;

//     } catch (error) {
//       console.warn('Error requesting notification permission', error);
//       return false;
//     }
//   };

//   requestMultiple: (types: RequestPermissions[]) => Promise<boolean> = async (
//     types: RequestPermissions[]
//   ) => {
//     try {
//       const results = [];
//       for (const type of types) {
//         results.push(await this.checkAndRequest(type));
//       }
//       for (const result of results) {
//         if (!result) {
//           return false;
//         }
//       }
//       return true;
//     } catch (error) {
//       console.warn('Error in Requesting Multiple Permissions', error);
//       return false;
//     }
//   };

//   requestAll: () => Promise<boolean> = async () => {
//     try {
//       const types: RequestPermissions[] = Object.keys(AllPermission) as RequestPermissions[];
//       const results = [];
//       for (const type of types) {
//         results.push(await this.checkAndRequest(type));
//       }
//       return results.every(result => result);
//     } catch (error) {
//       console.warn('Error in Requesting All Permissions', error);
//       return false;
//     }
//   };
// }

// const Permissions = new PermissionClass();
// export default Permissions;
