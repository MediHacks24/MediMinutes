// const { initializeApp } = require('firebase/app');
// const { getFirestore, doc, setDoc, collection } = require('firebase/firestore');
// const fs = require('fs');

// // Firebase configuration
// // const firebaseConfig = {
// //     apiKey: "AIzaSyBi5lKmCbsdzIEQ3YIc0Hn4z9juBE4DES0",
// //     authDomain: "medimodule.firebaseapp.com",
// //     projectId: "medimodule",
// //     storageBucket: "medimodule.appspot.com",
// //     messagingSenderId: "580485646721",
// //     appId: "1:580485646721:web:a1d955fbb65dbf30ff8080",
// //     measurementId: "G-YW4XTPC1HT"
// //   };
  
// // Initialize Firebase
// //const app = initializeApp(firebaseConfig);
// //const firestore = getFirestore(app);

// // Load JSON data
// const data = require('../questions.json');

// async function writeDataToFirestore(basePath, data, oldKey) {
//   for (const [key, value] of Object.entries(data)) {
//     let lastKey = key.split('/').pop();
//     if (oldKey.includes("/")) {
//       oldKey = oldKey.replace("/", " and ")
//     }
//         const sanitizedKey = key.replace(/\//g, '_');
    
//     if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
//       // Recursively write nested objects
//       await writeDataToFirestore(`${basePath}`, value, oldKey);
//     } else {
//       try {
//         // Write non-object values directly to Firestore
//         const docRef = doc(firestore, basePath);
//         await setDoc(docRef, { [sanitizedKey]: value }, { merge: true });
//         console.log(`Document written at: ${basePath} with key: ${oldKey}`);
//       } catch (error) {
//         console.error('Error adding document: ', error);
//       }
//     }
//   }
// }

// (async () => {
//   for (const key in data) {
//     let basePath = `questions/${key}`;
//     if (key.includes("/")){
//       let oldKey = key.replace("/", " and ")
//       basePath = `questions/${key}`;

//       console.log(basePath)
//     } else {
//       console.log(basePath)
//     }
//     await writeDataToFirestore(basePath, data[key], basePath);
//   }
// })();