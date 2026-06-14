window.MasariPages = window.MasariPages || {};

window.MasariPages.analytics = function () {
  const total = MASARI_DATA.tasks.length;
  const completed = MASARI_DATA.tasks.filter(task => task.status === "Completed").length;
  const pending = total - completed;
  const rate = total ? Math.round((completed / total) * 100) : 0;

  return `
    <div class="services-fixed-navbar-page">
    ${MasariComponents.publicHeader("dashboard")}
    ${MasariComponents.dashboardHeader("analytics")}
      <section class="analytics-panel">
        <h2>إحصائيات إنجاز الطالب</h2>

        <div class="analytics-grid-inner">
          <div class="mini-stat">
            <strong>${rate}%</strong>
            <p>نسبة إنجاز المهام</p>
            <div class="progress-track">
              <div class="progress-fill" style="width:${rate}%"></div>
            </div>
          </div>

          <div class="mini-stat">
            <strong>${pending}</strong>
            <p>مهام قيد المتابعة</p>
            <div class="progress-track">
              <div class="progress-fill" style="width:${pending * 20}%"></div>
            </div>
          </div>
        </div>
      </section>
    ${MasariComponents.dashboardFooter()}
    </div>
  `;
};
