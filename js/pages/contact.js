window.MasariPages = window.MasariPages || {};

window.MasariPages.contact = function () {
  return `
    ${MasariComponents.publicHeader("contact")}
    <main class="top-line-page">
      <section class="contact-page">
        <div class="container">
          <h1 class="contact-title">كيف يمكنك الوصول الينا</h1>

          <div class="contact-grid">
            <div class="contact-illustration">
              <img src="assets/images/contact-illustration.png" alt="Contact illustration">
            </div>

            <form class="contact-form" id="contactForm">
              <div class="form-group">
                <label>الاسم</label>
                <input type="text" required>
              </div>

              <div class="form-group">
                <label>البريد الالكتروني / رقم الهاتف</label>
                <input type="text" required>
              </div>

              <div class="form-group">
                <label>عنوان الرسالة</label>
                <input type="text" required>
              </div>

              <div class="form-group">
                <label>الرسالة</label>
                <textarea required></textarea>
              </div>

              <button class="primary-btn full" type="submit">إرسال</button>
            </form>
          </div>
        </div>

        <footer class="contact-footer">
          <div class="container footer-inner">
            <div></div>
            <div class="footer-center">
              <h3>زورونا على مواقع التواصل الاجتماعي</h3>
              <div class="socials">
                <span>f</span>
                <span>◎</span>
                <span>▶</span>
              </div>
              <div class="footer-links">
                <span>سياسة الخصوصية</span>
                <span>من نحن</span>
                <span>اتصل بنا</span>
                <span>الأسئلة الشائعة</span>
              </div>
            </div>

            <div class="footer-logo">
              <img src="assets/images/logo.svg" alt="Masari Logo">
            </div>
          </div>
        </footer>
      </section>
    </main>
  `;
};
