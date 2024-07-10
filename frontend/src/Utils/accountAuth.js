const { doc } = require("firebase/firestore");

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBi5lKmCbsdzIEQ3YIc0Hn4z9juBE4DES0",
    authDomain: "medimodule.firebaseapp.com",
    projectId: "medimodule",
    storageBucket: "medimodule.appspot.com",
    messagingSenderId: "580485646721",
    appId: "1:580485646721:web:a1d955fbb65dbf30ff8080",
    measurementId: "G-YW4XTPC1HT"
  };

// Initialize firebase
firebaseConfig.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
 
function signUp () {
    email = document.getElementById('email').value
    userName = document.getElementById('userName').value
    password = document.getElementById('password').value

    if (validate_email(email) == false) {
        alert('Email Invalid')
        return
    }
    if (validate_password(password) == false) {
        alert('Password Invalid')
        return
    }
    if (validate_field(userName) == false){
        alert('userName Invalid')
        return
    }

    auth.createUserWithEmailAndPassword(email, password).then(function(){
        var user = auth.currentUser

        // Add user to database
        var database_ref = database.ref()

        // Create user data
        var user_data = {
            email : email,
            userName : userName,
            last_login : Date.now()
        }
        
        database_ref.child('users/' + user.uid).set(user_data)

        alert('Profile Created')
    })
    .catch(function(error){
        //Firebase related errors
        var errorCode = error.code
        var errorMessage = error.message

        alert(errorMessage, errorCode)
    })

}


function login () {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    if (validate_email(email) == false) {
        alert('Email Invalid')
        return
    }
    if (validate_password(password) == false) {
        alert('Password Invalid')
        return
    }

    auth.signInWithEmailAndPassword(email, password).then(function(){
        var user = auth.currentUser

        // Add user to database
        var database_ref = database.ref()

        // Create user data
        var user_data = {
            last_login : Date.now()
        }
        
        database_ref.child('users/' + user.uid).update(user_data)

        alert('User Logged In')

    })
    .catch(function(error){
         //Firebase related errors
         var errorCode = error.code
         var errorMessage = error.message
 
         alert(errorMessage, errorCode)
    })
}


function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } 
    else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
        return false
    } 
    else {
        return true
    }
}

function validate_field(field){
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } 
    else {
        return true
    }
}
