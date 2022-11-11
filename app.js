const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
signUpButton.addEventListener('click', () =>
container.classList.add('right-panel-active'));
signInButton.addEventListener('click', () =>
container.classList.remove('right-panel-active'));

// firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

import { 
  doc, 
  setDoc,
  getFirestore, } 
 from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

 import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2Qk6buzReSnJfvo01Hsfw9DtHY_YqFY8",
  authDomain: "new-post-62f4c.firebaseapp.com",
  projectId: "new-post-62f4c",
  storageBucket: "new-post-62f4c.appspot.com",
  messagingSenderId: "447182263351",
  appId: "1:447182263351:web:98589f9611290bdf9e9bb2",
  measurementId: "G-5BYVLTTR3P"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const db=getFirestore();

  const submit = ()=>{
    const name = document.getElementById("name");
    const signup_email = document.getElementById("signup-email");
    const signup_pass = document.getElementById("signup-pass");
createUserWithEmailAndPassword(auth, signup_email.value, signup_pass.value)
.then(async(userCredential) => { 

  const uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      let uid = auth.currentUser.uid;
     
      const storageRef = ref(storage, `users/${uid}.png`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          if(progress==100){
            swal.fire("Account Successfully Created!", "", "success");
          }
          
         
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              
           
              
              break;
          }
        
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  let myFile = document.getElementById("my-file");
  let file = myFile.files[0];
  
  
  let url = await uploadFiles(file);
console.log(url)
    const user = userCredential.user;
      console.log("user",user)
       
      await setDoc(doc(db, "users", user.uid), {
      name: name.value,
      email: signup_email.value,
      password: signup_pass.value,
     url:url,
    });   
  })
  .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     console.log(errorMessage)
  });

  };

const btn = document.getElementById("submit");
btn.addEventListener("click", submit);




    const login =()=>{
    const login_email = document.getElementById("login-email");
    const login_pass = document.getElementById("login-pass");
    const auth = getAuth();
signInWithEmailAndPassword(auth, login_email.value, login_pass.value)
  .then(async(userCredential) => {
    const user = userCredential.user;
    console.log("user", user);
    window.location="new.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error");
    console.log(errorMessage)
  });
   }
   const loginBtn = document.getElementById("login");
   loginBtn.addEventListener("click", login);
              
   
  
