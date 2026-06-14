window.MasariPages = window.MasariPages || {};

window.MasariPages.home = function () {
  return `
    ${MasariComponents.publicHeader("home")}
    <main class="top-line-page">
      <section class="home-hero">
        <div class="container hero-grid">
          <div class="hero-image">
            <img src="assets/images/hero-teacher.png" alt="Teacher">
          </div>

          <div class="hero-content">
            <h1 class="hero-title">أكاديمية مساري التعليمية</h1>
            <p class="hero-text">
              نظام مساري الأكاديمي يوفر لك بيئة سهلة لإدارة المهام الدراسية
              ومتابعة المشاريع الجماعية ومواعيد التسليم بطريقة منظمة تساعدك
              على تحسين إنجازك الأكاديمي.
            </p>

            <div class="hero-actions">
              <button class="primary-btn" data-page="register">تسجيل جديد</button>
              <button class="play-link" data-page="login">
                <span class="play-dot">▶</span>
                تسجيل الدخول
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="container">
          <h2 class="section-title">ما يميزنا</h2>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">♙</div>
              <h3>تجربة تعليمية فريدة</h3>
              <p>
                تصميم خاص بالطلبة لتنظيم المهام والمواعيد وإدارة المواد
                الدراسية بشكل واضح وسهل الاستخدام.
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">✓</div>
              <h3>سهولة الاستخدام</h3>
              <p>
                واجهات بسيطة تساعد الطالب على إضافة المهمة ومتابعة تقدمها
                والوصول إلى معلوماته بسرعة.
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">♧</div>
              <h3>الدعم المستمر</h3>
              <p>
                يوفر مساري طريقة منظمة لمتابعة المشاريع الجماعية والتواصل
                حول المهام المهمة طوال الفصل.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
};
