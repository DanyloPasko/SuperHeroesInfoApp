# SuperHeroesInfoApp

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the correct version of **Node.js** installed.

* **Node.js**: **v20.19.6** or a newer version is required.

### Installation

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone [REPOSITORY_URL]
    cd [PROJECT_FOLDER]
    ```
2.  **Install dependencies** using npm:
    ```bash
    npm install
    ```

### Configuration

The project requires environment variables to run correctly.

1.  **Create a file** named `.env` in the root directory.
2.  **Check the example** file **`.env.example`** and copy its content into your new `.env` file.
3.  **Insert your actual key** for the required variable:
    ```
    EXPO_PUBLIC_API_KEY=[YOUR_API_KEY_HERE]
    
### Running the App

1.  **Start the Expo development server**:
    ```bash
    npx expo start
    ```
2.  The command above will open a new tab in your browser with the Metro Bundler and display a **QR code** in the terminal.
3.  **Run the application** on your device:
    * **On a physical device**: Open the **Expo Go** app on your iOS or Android phone and scan the QR code.
    * **On an Android emulator or iOS simulator**: Press **'a'** (for Android) or **'i'** (for iOS) in the terminal to open the app in the corresponding simulator/emulator.

Your app should now be running!