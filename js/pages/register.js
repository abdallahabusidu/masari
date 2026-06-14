window.MasariPages = window.MasariPages || {};

window.MasariPages.register = function () {
  return `
    ${MasariComponents.publicHeader()}
    <main class="top-line-page">
      <section class="login-page">
        <div class="container login-box register-box">
          <div class="login-side register-side">
            <div>
              <h2>أنشئ حسابك في مساري</h2>
              <div class="big-logo-ring">
                <img src="assets/images/logo.svg" alt="Masari Logo">
              </div>
              <p class="register-side-text">
                ابدأ بتنظيم مهامك الأكاديمية ومتابعة مواعيدك بسهولة.
              </p>
            </div>
          </div>

          <div class="login-form-wrap">
            <h1>تسجيل جديد</h1>

            <form class="login-form register-form" id="registerForm">
              <label>الاسم الكامل</label>
              <input id="registerName" type="text" required>

              <label>البريد الالكتروني</label>
              <input id="registerEmail" type="email" required>

              <label>التخصص / القسم</label>
              <input id="registerMajor" type="text" required>

              <label>كلمة المرور</label>
              <input id="registerPassword" type="password" required>

              <label>تأكيد كلمة المرور</label>
              <input id="registerConfirmPassword" type="password" required>

              <button class="primary-btn" type="submit">إنشاء الحساب</button>
            </form>

            <div class="login-help">
              <p>لديك حساب بالفعل؟ <button class="link-button" data-page="login">تسجيل الدخول</button></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
};
