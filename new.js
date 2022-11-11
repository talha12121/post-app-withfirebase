import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged, 
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { 
    getDoc,
     doc,
     getDocs,
     getFirestore,
     collection,
     query,
     addDoc,
     orderBy,
     onSnapshot,
     where
    }  from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2Qk6buzReSnJfvo01Hsfw9DtHY_YqFY8",
  authDomain: "new-post-62f4c.firebaseapp.com",
  projectId: "new-post-62f4c",
  storageBucket: "new-post-62f4c.appspot.com",
  messagingSenderId: "447182263351",
  appId: "1:447182263351:web:98589f9611290bdf9e9bb2",
  measurementId: "G-5BYVLTTR3P"
};

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const db=getFirestore();
  let textarea = document.getElementById("textarea");
  let post = document.getElementById("postBtn");
  let users= document.getElementById("all_users")
  let new_post = document.getElementById("new_posts")


  onAuthStateChanged(auth, async (user) => {
      if (user) {
          const uid = user.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);  

         
          if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
               document.getElementById("img").innerHTML=`<img class="img1" src="${docSnap.data().url}">`
               document.getElementById("img1").innerHTML=`<img class="img1" src="${docSnap.data().url}">`
              document.getElementById("name").innerHTML=docSnap.data().name;
              document.getElementById("userName").innerHTML=docSnap.data().name; 
              
              post.addEventListener("click",async()=>{
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "posts"), {
                  name: docSnap.data().name,
                  post : textarea.value,
                  TimeStamp :new Date(),
                  url:docSnap.data().url,
                  // url:url,
                });
                console.log("Document written with ID: ", docRef.id);
                      
                


          })
            } else {
                console.log("No such document!");
           }       
        }})
        

        users.addEventListener("click",async(users)=>{
          frndz.innerHTML=""
            const q = query(collection(db, "users"));         
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                let frndz = document.getElementById("frndz");
                frndz.innerHTML+=`
                <div> <img  src="${doc.data().url}" style="width:50px; height:50px; background-size:cover; border-radius:60%; border:2px solid gray;"  >
          ${doc.data().name}</div>`
          console.log(doc.data().name)
    
      });
    })
   
      
      // const q = query(collection(db, "posts"));
      const q = query(collection(db, "posts"), orderBy("TimeStamp", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        new_post.innerHTML="";
        
        querySnapshot.forEach((doc) => {
            cities.push(doc.data().name);
            new_post.innerHTML+=`
            <div class="js-post">
            <div class="title">
            <div class="js-sec">
            <div class="time">       
            <img  src="${doc.data().url}" style="width:50px; height:50px; background-size:cover; border-radius:60%; border:2px solid gray;"  >
            <p class="js-name">${doc.data().name}</p>
            </div>
            </div>
            </div>
            <div class="bgPosition">
            <p>
            ${doc.data().post}
            </p>
            </div>
            </div>
            
            `
          
  textarea.value=""
        });
        console.log("Current cities in CA: ", cities.join(", "));
      });
    

      const logOut = document.getElementById("log"); 
      logOut.addEventListener('click', e => {
        e.preventDefault();
         auth.signOut();
         window.location="index.html"
        console.log('User signed out!');
})