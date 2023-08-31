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
      serverClientId: '342719033549-uvgf6us7otfmh05mik6efgh3mk3tdpb1.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }

};

export default config;
