import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aajtakbharat.app',
  appName: 'AajTak Bharat',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId: '756713277919-d5tovd92mmu2o1ihi6v90egsp4sgt1pa.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    },
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: false,
      backgroundColor: "#ffffffff"
    }
  }
};

export default config;
