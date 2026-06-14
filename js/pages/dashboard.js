window.MasariPages = window.MasariPages || {};

window.MasariPages.dashboard = function () {
  return `
    <div class="services-fixed-navbar-page">
    ${MasariComponents.publicHeader("dashboard")}
    ${MasariComponents.dashboardHeader("dashboard")}
      <div class="level-grid">
        ${MASARI_DATA.levels.map(level => `
          <button class="level-card" data-page="resources">
            <span class="level-icon"></span>
            <strong>${level}</strong>
          </button>
        `).join("")}
      </div>
    ${MasariComponents.dashboardFooter()}
    </div>
  `;
};

window.MasariPages.timeline = function () {
  return `
    <div class="services-fixed-navbar-page">
    ${MasariComponents.publicHeader("dashboard")}
    ${MasariComponents.dashboardHeader("timeline")}
      <section class="timeline-panel">
        <h2>المخطط الزمني</h2>

        <div class="timeline-row">
          <div class="timeline-time">00:00</div>
          <div class="timeline-task">
            <div class="date-red">الثلاثاء 22 أغسطس 2025</div>
            <strong>اختبار قصير</strong>
            <p>المادة التعليمية</p>
          </div>
        </div>

        <div class="timeline-row">
          <div class="timeline-time">00:00</div>
          <div class="timeline-task">
            <div class="date-blue">الثلاثاء 22 يناير 2026</div>
            <strong>اختبار نصفي</strong>
            <p>المادة التعليمية</p>
          </div>
        </div>

        <div class="timeline-row">
          <div class="timeline-time">08:30</div>
          <div class="timeline-task">
            <div class="date-blue">الأحد 15 فبراير 2026</div>
            <strong>تسليم مشروع جماعي</strong>
            <p>مشروع التخرج</p>
          </div>
        </div>
      </section>
    ${MasariComponents.dashboardFooter()}
    </div>
  `;
};

window.MasariPages.resources = function () {
  return `
    <div class="services-fixed-navbar-page">
    ${MasariComponents.publicHeader("dashboard")}
    ${MasariComponents.dashboardHeader("resources")}
      <section class="resources-panel">
        <div class="resource-layout">
          <div>
            <h2>المباحث التعليمية للمستوى الأول - هندسة البرمجيات</h2>
            <div class="resource-buttons">
              <button class="resource-btn">مقدمة في الحاسوب <span>↩</span></button>
              <button class="resource-btn">أساسيات البرمجة 1 <span>↩</span></button>
              <button class="resource-btn">مبادئ قواعد البيانات <span>↩</span></button>
              <button class="resource-btn">اللغة الإنجليزية <span>↩</span></button>
            </div>
          </div>

          <div class="resource-list">
            <h3>مصادر التعلم المستوى الأول</h3>
            ${MASARI_DATA.resources.map(item => `<button>${item}</button>`).join("")}
          </div>
        </div>
      </section>
    ${MasariComponents.dashboardFooter()}
    </div>
  `;
};
