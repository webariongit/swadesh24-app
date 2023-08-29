import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.swadesh24.app',
  appName: 'Swadesh24',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId: '342719033549-lseks5k5ckfcq1ohjcf3qqjheg4lsuo7.apps.googleusercontent.com'
    }
  }

};

export default config;
