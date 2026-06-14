window.MasariPages = window.MasariPages || {};

window.MasariPages.about = function () {
  return `
    ${MasariComponents.publicHeader("about")}
    <main class="top-line-page">
      <section class="about-page">
        <div class="container about-grid">
          <div class="about-photo">
            <img src="assets/images/about-laptop.png" alt="Student using laptop">
          </div>

          <div class="about-text">
            <h2>من نحن</h2>
            <p>
              نسعى في مساري إلى تمكين طلاب الجامعات عبر توفير بيئة رقمية
              متكاملة لتنظيم العمل التعليمي بأسلوب حديث وفعال.
              توفر المنصة أدوات ذكية لإدارة المهام وجدولة الموارد التعليمية
              ومتابعة السنوات الدراسية، مما يضمن تجربة تعلم مخصصة وشاملة
              تهدف إلى تحقيق أفضل درجات الإنجاز والتميز.
            </p>

            <div class="dashed-action">
              <button class="primary-btn" data-page="login">سجل الآن</button>
            </div>
          </div>
        </div>

        <div class="about-person">
          <img src="assets/images/about-person.png" alt="Student">
        </div>
      </section>
    </main>
  `;
};
