import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.AajTakBharat.app',
  appName: 'AajTak Bharat',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId: '877416662884-45dekvg2bfakj94tjssh5pncbqpunat9.apps.googleusercontent.com',
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
