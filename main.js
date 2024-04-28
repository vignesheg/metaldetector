
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
  import {getDatabase,onValue,set,ref,update} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.11.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAjkdY8YjJas4gT-iQooZkPMq4R_ndIbvE",
    authDomain: "metal-detector-c89b1.firebaseapp.com",
    databaseURL: "https://metal-detector-c89b1-default-rtdb.firebaseio.com",
    projectId: "metal-detector-c89b1",
    storageBucket: "metal-detector-c89b1.appspot.com",
    messagingSenderId: "88040594777",
    appId: "1:88040594777:web:fbd6ef8799ae0ccd7bc048",
    measurementId: "G-8KEC1NXXFJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const db = getDatabase(app);
  onValue(ref(db,"motorstatus"),(snapshot)=>{
    let data = snapshot.val();
    if(data == 1){
        $("#stat_button").html("OFF");
        console.log("on");
        $("#stat_button").prop("checked",true);
    }else if(data == 0){
        $("#stat_button").html("ON");
        console.log("off");
        $("#stat_button").prop("checked",false);
    }
  })

  $("#stat_button").click(()=>{
    onValue(ref(db,"motorstatus"),(snapshot)=>{
        let data = snapshot.val();
        if(data == 1){
            let updates = {
                motorstatus:0
            }
            update(ref(db),updates)
        }else if(data == 0){
            let updates = {
                motorstatus:1
            }
            update(ref(db),updates)
        }
    },{
        onlyOnce: true
    })
  })