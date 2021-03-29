import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCjaa9Tw08JzyFxG74_v2LUV36bsdShfr4',
  authDomain: 'matchmemd-staging-308907.firebaseapp.com',
  databaseURL: 'https://matchmemd-staging-308907.firebaseio.com',
  projectId: 'matchmemd-staging-308907',
  storageBucket: 'matchmemd-staging-308907.appspot.com',
  messagingSenderId: '80039213812',
  appId: '1:80039213812:web:35276d6a60ba21012c7ca1'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')

// export utils/refs
export { db, auth, usersCollection, firebase as types }
