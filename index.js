const express = require('express');
const app = express();
const port = 3000;

//Firebase-starter
const admin = require('firebase-admin');
const serviceAccount = require('./keys.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://express-auth-6bf1d-default-rtdb.firebaseio.com/'
});
//firebase-end

app.get('/', (req, res) => {
  admin
    .auth()
    .createUser({
      email: 'user@example.com',
      emailVerified: false,
      phoneNumber: '+11234567890',
      password: 'secretPassword',
      displayName: 'John Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
