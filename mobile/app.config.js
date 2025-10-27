/**
 * MOBILE APP CONFIGURATION
 * Expo configuration for iOS mobile app
 */

export default {
  expo: {
    name: "Cash App Currency Coach",
    slug: "cashapp-currency-coach",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#00D4AA"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.cashapp.currencycoach"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#00D4AA"
      },
      package: "com.cashapp.currencycoach"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "your-project-id-here"
      }
    },
    plugins: [
      "expo-font"
    ]
  }
};
