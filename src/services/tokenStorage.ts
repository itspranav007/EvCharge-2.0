// import { MMKV, Mode } from "react-native-mmkv";
// export const token = new MMKV({
//   id: "token-storage",
//   encryptionKey: "token_storage",
//   mode: Mode.SINGLE_PROCESS,
// });

// class TokenStorageClass {
//   getToken: () => string = () => {
//     try {
//       const tokenValue = token.getString("token_value");
//       if (tokenValue) {
//         return tokenValue;
//       } else {
//         return "";
//       }
//     } catch (error) {
//       console.log("In getToken Error ", error);
//       return "";
//     }
//   };
//   setToken: (value: string) => boolean = (value) => {
//     try {
//       if (value) {
//         token.set("token_value", value);
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.log("In setToken Error ", error);
//       return false;
//     }
//   };
// }

// const tokenStorage = new TokenStorageClass();
// export default tokenStorage;
