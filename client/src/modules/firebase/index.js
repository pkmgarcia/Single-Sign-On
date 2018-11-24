import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import config from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

export {
  firebase,
  auth,
  db
};