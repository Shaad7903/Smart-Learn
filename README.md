# Smart-Learn 📚

Smart-Learn is a modern mobile learning application built with **React Native (0.87)**, **React 19**, and the **New Architecture**.

This guide is designed for **testers and QA engineers** to quickly set up, build, and run the app on both **Android** and **iOS** devices or emulators.

---

## 📋 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Project Setup (First-Time Only)](#-project-setup-first-time-only)
3. [Android Testing Guide](#-android-testing-guide)
   - [Method 1: Run via React Native CLI (Recommended for live testing)](#method-1-run-via-cli-recommended)
   - [Method 2: Build & Install Standalone Debug APK (No Metro needed)](#method-2-build--install-standalone-debug-apk)
4. [iOS Testing Guide (macOS Only)](#-ios-testing-guide-macos-only)
   - [Method 1: Run via React Native CLI](#method-1-run-via-cli-simulator)
   - [Method 2: Run via Xcode](#method-2-run-via-xcode)
5. [In-App Testing & Developer Menu](#-in-app-testing--developer-menu)
6. [Troubleshooting & Common Fixes](#-troubleshooting--common-fixes)

---

## 🛠 Prerequisites

Ensure the following tools are installed on your workstation before starting:

### Common Requirements (Both Platforms)
- **Node.js**: `v22.11.0` or higher (Check version: `node -v`)
- **Git**: Installed and configured
- **Package Manager**: `npm` (comes with Node)

---

### Android Requirements
- **Java Development Kit (JDK)**: JDK 17 (Verify: `java -version`)
- **Android Studio**:
  - Android SDK Platform 34 to 36
  - Android SDK Build-Tools 37.0.0
  - Android Virtual Device (AVD) / Emulator configured
- **Environment Variables**:
  - `ANDROID_HOME` pointing to your Android SDK directory:
    - **Windows**: `C:\Users\<Your-Username>\AppData\Local\Android\Sdk`
    - **macOS/Linux**: `~/Library/Android/sdk`
  - Add `platform-tools` and `cmdline-tools` to your system `PATH` (so `adb` is accessible in terminal).
- **Physical Android Device (Optional)**:
  - Enable **Developer Options** (Tap *Build Number* 7 times in Settings > About Phone).
  - Enable **USB Debugging**.

---

### iOS Requirements (macOS only)
- **macOS** operating system (iOS cannot be built or tested on Windows/Linux)
- **Xcode**: Latest version from the Mac App Store (along with Command Line Tools: `xcode-select --install`)
- **Ruby & Bundler**: Required for CocoaPods (Bundler version specified in `Gemfile`)
- **CocoaPods**: Managed through Bundler or installed globally (`gem install cocoapods`)
- **iOS Simulator** or a physical Apple device provisioned with an Apple ID in Xcode.

---

## 📦 Project Setup (First-Time Only)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shaad7903/Smart-Learn.git
   cd Smart-Learn
   ```

2. **Install JavaScript dependencies:**
   ```bash
   npm install
   ```

---

## 🤖 Android Testing Guide

You can test on Android using either the CLI development mode or by generating a standalone APK file.

### Method 1: Run via CLI (Recommended)

1. **Start the Android Emulator or connect your physical device:**
   - Verify the device is connected:
     ```bash
     adb devices
     ```
     *(Your device should be listed as `device`, not `unauthorized` or `offline`)*

2. **Start the Metro bundler server** in a terminal:
   ```bash
   npm start
   ```
   *(Keep this terminal window running)*

3. **Build and launch the app** in a **new** terminal window:
   ```bash
   npm run android
   ```
   This will compile the native code, install the app on your emulator/device, and open it automatically.

---

### Method 2: Build & Install Standalone Debug APK

If you want to test the app without running the Metro server or want to share the `.apk` file directly:

1. **Generate the Debug APK:**
   - **On Windows (PowerShell / Command Prompt):**
     ```cmd
     cd android
     .\gradlew assembleDebug
     cd ..
     ```
   - **On macOS / Linux:**
     ```bash
     cd android
     ./gradlew assembleDebug
     cd ..
     ```

2. **Locate the generated APK:**
   The APK file will be created at:
   ```text
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

3. **Install the APK on your connected device:**
   ```bash
   adb install -r android/app/build/outputs/apk/debug/app-debug.apk
   ```
   *(Alternatively, transfer `app-debug.apk` directly to your Android device via USB/Google Drive/Slack and install it).*

---

## 🍏 iOS Testing Guide (macOS Only)

> **Note:** Building and running for iOS requires a Mac with Xcode.

### 1. Install iOS Pod Dependencies
Before the first iOS run or whenever native dependencies change, install CocoaPods:

```bash
bundle install
bundle exec pod install --project-directory=ios
```
*Or navigate to the `ios` directory directly:*
```bash
cd ios
pod install
cd ..
```

---

### Method 1: Run via CLI (Simulator)

1. **Start the Metro bundler server** in a terminal:
   ```bash
   npm start
   ```
   *(Keep this terminal running)*

2. **Build and launch on the iOS Simulator** in a **new** terminal window:
   ```bash
   npm run ios
   ```
   - To specify a specific simulator model:
     ```bash
     npm run ios -- --simulator="iPhone 16"
     ```

---

### Method 2: Run via Xcode

1. Open the Xcode workspace (always use `.xcworkspace`, never `.xcodeproj`):
   ```bash
   open ios/smartlearn.xcworkspace
   ```
2. In the top toolbar of Xcode, choose your target:
   - Select `smartlearn` scheme.
   - Choose your target device (e.g. an iOS Simulator or your connected iPhone).
3. If deploying to a **physical iPhone**:
   - Go to `smartlearn` target > **Signing & Capabilities**.
   - Select your personal Apple Development Team.
4. Press the **Play / Run button** (`Cmd + R`) to build and launch the app.

---

## 📱 In-App Testing & Developer Menu

While testing in development mode, you can access the React Native Developer Menu to reload the app, toggle performance monitors, or inspect elements:

| Action | Android | iOS |
| :--- | :--- | :--- |
| **Open Dev Menu** | Press <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or shake device | Press <kbd>Cmd ⌘</kbd> + <kbd>D</kbd> in simulator or shake device |
| **Reload App** | Double-tap <kbd>R</kbd> key | Press <kbd>R</kbd> in simulator |
| **Inspect UI / Logs** | Open Dev Menu > **Toggle Inspector** | Open Dev Menu > **Toggle Inspector** |

---

## ❓ Troubleshooting & Common Fixes

### 1. Metro Server Port 8081 is already in use
If another process is using port 8081:
- **Windows**:
  ```cmd
  npx kill-port 8081
  ```
- **macOS / Linux**:
  ```bash
  lsof -ti:8081 | xargs kill -9
  ```

### 2. Reset Metro Cache
If the app does not reflect updates or throws module resolution errors:
```bash
npm start -- --reset-cache
```

### 3. Android Build Failures (`gradlew clean`)
If you encounter Android build caching issues:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### 4. iOS CocoaPods Issues
If iOS fails to compile or link native modules:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
cd ..
```

### 5. `adb` Device Not Found or Unauthorized
- Check cable connection.
- Check phone screen for a prompt asking **"Allow USB Debugging?"** and tap **Allow**.
- Restart ADB server:
  ```bash
  adb kill-server
  adb start-server
  adb devices
  ```
