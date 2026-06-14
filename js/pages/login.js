window.MasariPages = window.MasariPages || {};

window.MasariPages.login = function () {
  return `
    ${MasariComponents.publicHeader()}
    <main class="top-line-page">
      <section class="login-page">
        <div class="container login-box">
          <div class="login-side">
            <div>
              <h2>مرحبا بك في</h2>
              <div class="big-logo-ring">
                <img src="assets/images/logo.svg" alt="Masari Logo">
              </div>
            </div>
          </div>

          <div class="login-form-wrap">
            <h1>تسجيل الدخول</h1>

            <form class="login-form" id="loginForm">
              <label>البريد الالكتروني</label>
              <input type="email" required>

              <label>كلمة المرور</label>
              <input type="password" required>

              <p class="small-link">هل نسيت كلمة المرور؟</p>

              <button class="primary-btn" type="submit">تسجيل الدخول</button>
            </form>

            <div class="login-help">
              <p>ليس لديك حساب؟ <button class="link-button" data-page="register">إنشاء حساب طالب جديد</button></p>
              <p>هل أنت معلم؟ <button class="link-button" data-page="register">إنشاء حساب معلم جديد</button></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
};
