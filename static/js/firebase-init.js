/* ========================================= */
/* KHỞI TẠO FIREBASE + AUTH + FIRESTORE */
/* ========================================= */

/* 1. Tải thư viện chính của Firebase */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

/* 2. Tải thư viện XÁC THỰC */
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

/* 3. Tải thư viện FIRESTORE */
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

/* 4. Cấu hình Firebase */
const firebaseConfig = {
  apiKey: "AIzaSyA4R8433HypXJwHcgcO4UMdVsOsQcH_D2c",
  authDomain: "phukienmaytinh-store.firebaseapp.com",
  projectId: "phukienmaytinh-store",
  storageBucket: "phukienmaytinh-store.firebasestorage.app",
  messagingSenderId: "202399257443",
  appId: "1:202399257443:web:1bcbd5cea8317c93217956"
};

/* 5. Khởi động Firebase */
const app = initializeApp(firebaseConfig);

/* 6. Tạo Auth và Firestore */
export const auth = getAuth(app);
export const db = getFirestore(app);

/* ========================================= */
/* XỬ LÝ ĐĂNG NHẬP / ĐĂNG XUẤT + GIỎ HÀNG */
/* ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const authLinksContainer = document.getElementById("auth-links");
  if (!authLinksContainer) return;

  const cartLink = `
    <a href="#" class="navbar-cart snipcart-checkout" title="Giỏ Hàng">
      <i class="fas fa-shopping-cart"></i>
      <span class="snipcart-items-count">0</span>
    </a>`;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userEmail = user.email;

      authLinksContainer.innerHTML = `
        <a href="#" class="navbar-username">XIN CHÀO, ${userEmail}</a>
        ${cartLink}
        <a href="#" id="logout-button" class="btn-signup">ĐĂNG XUẤT</a>
      `;

      const logoutButton = document.getElementById("logout-button");
      if (logoutButton) {
        logoutButton.addEventListener("click", async (e) => {
          e.preventDefault();
          try {
            await signOut(auth);
            alert("Bạn đã đăng xuất thành công!");
            window.location.href = "/";
          } catch (error) {
            console.error("Lỗi đăng xuất:", error);
          }
        });
      }

    } else {
      authLinksContainer.innerHTML = `
        ${cartLink}
        <a href="/login/">LOG IN</a>
        <a href="/signup/" class="btn-signup">SIGN UP</a>
      `;
    }
  });
});