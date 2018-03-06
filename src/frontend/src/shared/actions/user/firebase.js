import {Firebase, FirebaseRef} from '../../../shared/firebase';
import statusMessage from '../../../shared/firebase/status';
import ErrorMessages from '../../constants/errors';

export const USER_UPDATE = Symbol('USER_UPDATE');
export const USER_LOGIN  = Symbol('USER_LOGIN');
export const USER_LOGOUT = Symbol('USER_LOGOUT');
export const USER_SIGNUP = Symbol('USER_SIGNUP');

export function signup(formData) {
  const {
          email,
          password,
        } = formData;

  return dispatch => new Promise((resolve, reject) => {
    // Validation checks
    if (!email) return reject({message: ErrorMessages.missingEmail});
    if (!password) return reject({message: ErrorMessages.missingPassword});

    // Go to Firebase
    return Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Send user details to Firebase database
      if (res && res.uid) {
        FirebaseRef.child(`users/${res.uid}`).set({
          signedUp    : Firebase.database.ServerValue.TIMESTAMP,
          lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
        }).then(resolve);
      }
    }).catch(reject);
  }).catch((err) => {
    throw err.message;
  });
}

export function login(formData) {
  const {
          email,
          password,
        } = formData;

  return dispatch => new Promise((resolve, reject) => {

    // Validation checks
    if (!email) return reject({message: ErrorMessages.missingEmail});
    if (!password) return reject({message: ErrorMessages.missingPassword});

    // Go to Firebase

    Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      if (res && res.uid) {
        // Update last logged in data
        FirebaseRef.child(`users/${res.uid}`).update({
          lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
        });

        // Send verification Email when email hasn't been verified
        if (res.emailVerified === false) {
          Firebase.auth().currentUser
          .sendEmailVerification()
          .catch(() => console.log('Verification email failed to send'));
        }

        // Get User Data
        getUserData(dispatch);
      }


      // Send Login data to Redux
      return resolve(dispatch({
        type: USER_LOGIN,
        data: res,
      }));
    }).catch(reject);
  });
}

export function logout() {
  return dispatch => new Promise((resolve, reject) => {
    Firebase.auth().signOut()
    .then(() => {
      dispatch({type: USER_LOGOUT});
      setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
    }).catch(reject);
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

export function resetPassword(formData) {
  const {email} = formData;
  return dispatch => new Promise(async (resolve, reject) => {
    if (!email) return reject({message: ErrorMessages.missingEmail});
    await statusMessage(dispatch, 'loading', true);
    return Firebase.auth()
    .sendPasswordResetEmail(email)
    .then(() => statusMessage(dispatch, 'loading', false).then(resolve(dispatch({type: USER_LOGOUT}))))
    .catch(reject);
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

function getUserData(dispatch) {
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;

  const ref = FirebaseRef.child(`users/${UID}`);

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];

    return dispatch({
      type: USER_UPDATE,
      data: userData,
    });
  });
}


