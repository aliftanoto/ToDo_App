# ToDo-App

1. **Clone The Repository**
   ```sh
   git clone https://github.com/aliftanoto/ToDo_App
   cd <your_folder>
2. npm install in the terminal
3. Set up Firebase:
   Create a Firebase Project at Firebase Console.
   Enable Authentication.
   Enable Firestore Database
   Copy Firebase config and create firebaseConfig.js in ssrc/:

   ```sh
   // Import the functions you need from the SDKs you need
   import { initializeApp } from "firebase/app";
   import { getAnalytics } from "firebase/analytics";
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries
   
   // Your web app's Firebase configuration
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
   const firebaseConfig = {
     apiKey: "your_api_key",
     authDomain: "your_auth_domain",
     projectId: "your_project_id",
     storageBucket: "your_storage_bucket",
     messagingSenderId: "your_messaging_sender_id",
     appId: "your_app_id",
     measurementId: "your_measure_id"
   };
   
   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const analytics = getAnalytics(app);
4.npm run dev in the terminal
   
