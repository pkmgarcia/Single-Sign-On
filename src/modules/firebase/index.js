import firebase from 'firebase';
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