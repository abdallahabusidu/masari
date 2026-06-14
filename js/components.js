window.MasariComponents = {
  publicHeader(activePage = "") {
    return `
      <header class="site-header">
        <div class="header-inner">
          <div class="logo-wrap">
            <div class="logo-circle">
              <img src="assets/images/logo.svg" alt="Masari Logo">
            </div>
          </div>

          <button class="mobile-menu" id="mobileMenuBtn">☰</button>

          <nav class="main-nav">
            <button class="${activePage === "home" ? "active" : ""}" data-page="home">الرئيسية</button>
            <button class="${activePage === "dashboard" ? "active" : ""}" data-page="dashboard">الخدمات</button>
            <button class="${activePage === "about" ? "active" : ""}" data-page="about">حول</button>
            <button class="${activePage === "contact" ? "active" : ""}" data-page="contact">اتصل بنا</button>
          </nav>

          <div class="header-actions">
            <button class="back-btn" data-back="true">رجوع</button>
            <button class="search-btn">⌕</button>
            <button class="small-btn" data-page="register">تسجيل جديد</button>
            <button class="small-btn" data-page="login">تسجيل الدخول</button>
          </div>
        </div>
      </header>
    `;
  },

  dashboardHeader(activeTab) {
    const tabs = [
      { id: "dashboard", label: "مستواك الخاص" },
      { id: "timeline", label: "مخططي الزمني" },
      { id: "resources", label: "مصادر تعليمية" },
      { id: "tasks", label: "إدارة المهام" }
    ];

    return `
      <div class="dashboard-shell">
        <div class="dashboard-container">
          <div class="dash-top">
            <div class="dash-icons">
              <button class="round-icon" data-back="true" title="رجوع">↩</button>
              <button class="round-icon" data-page="home" title="الرئيسية">⌂</button>
              <button class="round-icon">☰</button>
              <span class="profile-chip">
                <span>مرحبا الطالب</span>
                <img src="assets/images/hero-teacher.png" alt="profile">
              </span>
            </div>

            <div class="dash-search">
              <input placeholder="ابحث هنا..." />
              <button>⌕</button>
            </div>

            <div class="dash-brand">
              <span>مساري - إدارة مهام الطلبة<br><small>طريقك للوصول إلى أعلى تحصيل</small></span>
              <img src="assets/images/logo.svg" alt="logo">
            </div>
          </div>

          <div class="dash-menu-pill">
            <button>☰</button>
            <strong>المواد<br>التعليمية</strong>
            <button>⌂</button>
          </div>

          <div class="dash-welcome">
            <h1>أهلاً بك في مساري - لإدارة مهام الطلبة</h1>
            <p>الأحد 3 ديسمبر 2023 م - 18 جمادى 1445 هـ | 9:49 م</p>
          </div>

          <button class="course-btn">تعديل طريقة العرض</button>

          <div class="dash-tabs">
            ${tabs.map(tab => `
              <button class="${activeTab === tab.id ? "active" : ""}" data-page="${tab.id}">
                ${tab.label}
              </button>
            `).join("")}
          </div>
    `;
  },

  dashboardFooter() {
    return `
        </div>
      </div>
    `;
  }
};
