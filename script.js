// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// import {
//   getDatabase,
//   ref,
//   push,
//   onChildAdded,
// } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAdKuFB-RdfdUucjV-PhMq1aoX_-IXNYGw",
//   authDomain: "testwebi.firebaseapp.com",
//   projectId: "testwebi",
//   storageBucket: "testwebi.appspot.com",
//   messagingSenderId: "850347209222",
//   appId: "1:850347209222:web:41f11cb35b01b537cc0987",
// };

// // Initialize Firebase App
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and Realtime Database
// const auth = getAuth(app);
// const database = getDatabase(app); // Dùng Realtime Database thay vì Firestore

// // DOM Elements
// const signupBtn = document.getElementById("signupBtn");
// const loginBtn = document.getElementById("loginBtn");
// const logoutBtn = document.getElementById("logoutBtn");
// const messageInput = document.getElementById("messageInput");
// const sendBtn = document.getElementById("sendBtn");
// const messagesDiv = document.getElementById("messages");

// // Đăng ký người dùng
// signupBtn.addEventListener("click", () => {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       console.log("User registered:", userCredential.user);
//     })
//     .catch((error) => {
//       console.error("Error:", error.message);
//     });
// });

// // Đăng nhập người dùng
// loginBtn.addEventListener("click", () => {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       document.querySelector(".auth-container").style.display = "none";
//       document.querySelector(".chat-container").style.display = "block";
//     })
//     .catch((error) => {
//       console.error("Error:", error.message);
//     });
// });

// // Đăng xuất
// logoutBtn.addEventListener("click", () => {
//   signOut(auth).then(() => {
//     document.querySelector(".auth-container").style.display = "block";
//     document.querySelector(".chat-container").style.display = "none";
//   });
// });

// import {
//   getStorage,
//   ref as storageRef,
//   uploadBytes,
//   getDownloadURL,
// } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// // Initialize Firebase Storage
// const storage = getStorage(app);
// const imageInput = document.getElementById("imageInput");

// sendBtn.addEventListener("click", () => {
//   const message = messageInput.value;
//   const file = imageInput.files[0];

//   if (file) {
//     // Nếu người dùng chọn một ảnh, tải ảnh lên Firebase Storage
//     const imageRef = storageRef(storage, "images/" + file.name);
//     uploadBytes(imageRef, file).then((snapshot) => {
//       // Sau khi tải lên thành công, lấy URL của ảnh
//       getDownloadURL(snapshot.ref).then((url) => {
//         // Lưu URL của ảnh vào Realtime Database
//         push(ref(database, "messages"), {
//           user: auth.currentUser.email,
//           message: message || "", // Có thể gửi kèm tin nhắn text hoặc chỉ ảnh
//           imageUrl: url, // URL của ảnh
//           timestamp: Date.now(),
//         });
//         imageInput.value = ""; // Reset input sau khi gửi
//         messageInput.value = ""; // Reset message input
//       });
//     });
//   } else if (message !== "") {
//     // Nếu chỉ gửi tin nhắn text
//     push(ref(database, "messages"), {
//       user: auth.currentUser.email,
//       message: message,
//       timestamp: Date.now(),
//     });
//     messageInput.value = ""; // Reset message input
//   }
// });

// onChildAdded(ref(database, "messages"), (snapshot) => {
//   const messageData = snapshot.val();
//   const messageElement = document.createElement("div");

//   if (messageData.message) {
//     // Hiển thị tin nhắn text
//     messageElement.textContent = `${messageData.user}: ${messageData.message}`;
//   }

//   if (messageData.imageUrl) {
//     // Hiển thị hình ảnh nếu có
//     const imgElement = document.createElement("img");
//     imgElement.src = messageData.imageUrl;
//     imgElement.style.maxWidth = "200px"; // Set kích thước tối đa cho ảnh
//     messageElement.appendChild(imgElement);
//   }

//   messagesDiv.appendChild(messageElement);
// });
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdKuFB-RdfdUucjV-PhMq1aoX_-IXNYGw",
  authDomain: "testwebi.firebaseapp.com",
  projectId: "testwebi",
  storageBucket: "testwebi.appspot.com",
  messagingSenderId: "850347209222",
  appId: "1:850347209222:web:41f11cb35b01b537cc0987",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication, Realtime Database, and Storage
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// DOM Elements
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");
const imageInput = document.getElementById("imageInput");

// Đăng ký người dùng
signupBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User registered:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
});

// Đăng nhập người dùng
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // LocalStorage để đồng bộ trạng thái người dùng trên các tab
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      document.querySelector(".auth-container").style.display = "none";
      document.querySelector(".chat-container").style.display = "block";
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
});

// Đăng xuất
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    // Xóa trạng thái người dùng trong LocalStorage
    localStorage.removeItem("user");
    document.querySelector(".auth-container").style.display = "block";
    document.querySelector(".chat-container").style.display = "none";
  });
});

// Gửi tin nhắn và hình ảnh
sendBtn.addEventListener("click", () => {
  const message = messageInput.value;
  const file = imageInput.files[0];

  if (file) {
    // Nếu người dùng chọn một ảnh, tải ảnh lên Firebase Storage
    const imageRef = storageRef(storage, "images/" + file.name);
    uploadBytes(imageRef, file).then((snapshot) => {
      // Sau khi tải lên thành công, lấy URL của ảnh
      getDownloadURL(snapshot.ref).then((url) => {
        // Lưu URL của ảnh vào Realtime Database
        push(ref(database, "messages"), {
          user: auth.currentUser.email,
          message: message || "", // Có thể gửi kèm tin nhắn text hoặc chỉ ảnh
          imageUrl: url, // URL của ảnh
          timestamp: Date.now(),
        });
        imageInput.value = ""; // Reset input sau khi gửi
        messageInput.value = ""; // Reset message input
      });
    });
  } else if (message !== "") {
    // Nếu chỉ gửi tin nhắn text
    push(ref(database, "messages"), {
      user: auth.currentUser.email,
      message: message,
      timestamp: Date.now(),
    });
    messageInput.value = ""; // Reset message input
  }
});

// Hiển thị tin nhắn và hình ảnh
onChildAdded(ref(database, "messages"), (snapshot) => {
  const messageData = snapshot.val();
  const messageElement = document.createElement("div");

  if (messageData.message) {
    // Hiển thị tin nhắn text
    messageElement.textContent = `${messageData.user}: ${messageData.message}`;
  }

  if (messageData.imageUrl) {
    // Hiển thị hình ảnh nếu có
    const imgElement = document.createElement("img");
    imgElement.src = messageData.imageUrl;
    imgElement.style.maxWidth = "200px"; // Set kích thước tối đa cho ảnh
    messageElement.appendChild(imgElement);
  }

  messagesDiv.appendChild(messageElement);
});

// Đồng bộ trạng thái đăng nhập trên nhiều tab
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector(".auth-container").style.display = "none";
    document.querySelector(".chat-container").style.display = "block";
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    document.querySelector(".auth-container").style.display = "block";
    document.querySelector(".chat-container").style.display = "none";
    localStorage.removeItem("user");
  }
});

// Xử lý trạng thái khi mở nhiều tab
window.addEventListener("storage", (event) => {
  if (event.key === "user") {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      document.querySelector(".auth-container").style.display = "none";
      document.querySelector(".chat-container").style.display = "block";
    } else {
      document.querySelector(".auth-container").style.display = "block";
      document.querySelector(".chat-container").style.display = "none";
    }
  }
});
