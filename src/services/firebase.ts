import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { UserProfile } from '../types'

const firebaseConfig: Record<string, unknown> =
  import.meta.env.mode === 'production'
    ? {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY_PROD,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_PROD,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL_PROD,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_PROD,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_PROD,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_PROD,
        appId: import.meta.env.VITE_FIREBASE_APP_ID_PROD
      }
    : {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY_STAGING,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_STAGING,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL_STAGING,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_STAGING,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_STAGING,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_STAGING,
        appId: import.meta.env.VITE_FIREBASE_APP_ID_STAGING
      }

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection(
  'users'
) as firebase.firestore.CollectionReference<UserProfile>

// export utils/refs
export { db, auth, usersCollection, firebase as types }
