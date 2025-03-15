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
   const firebaseConfig = {
     apiKey: your_API,
     authDomain:your_dauth_domain,
     projectId:your_project_id,
     storageBucket: your_storage_bucket ,
     messagingSenderId: your_messaging_sender_id,
     appId: your_app_id,
   };
   export default firebaseConfig;
4.npm run dev in the terminal
   
