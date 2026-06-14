window.MasariPages = window.MasariPages || {};

window.MasariPages.tasks = function () {
  return `
    <div class="services-fixed-navbar-page">
    ${MasariComponents.publicHeader("dashboard")}
    ${MasariComponents.dashboardHeader("tasks")}
      <section class="tasks-panel">
        <h2>إدارة المهام الأكاديمية</h2>

        <form class="task-form" id="taskForm">
          <input id="taskTitle" placeholder="عنوان المهمة" required>
          <input id="taskCourse" placeholder="اسم المادة" required>
          <input id="taskDeadline" type="date" required>
          <select id="taskPriority">
            <option value="High">أولوية عالية</option>
            <option value="Medium" selected>أولوية متوسطة</option>
            <option value="Low">أولوية منخفضة</option>
          </select>
          <textarea id="taskDescription" placeholder="وصف المهمة"></textarea>
          <button class="primary-btn" type="submit">إضافة مهمة جديدة</button>
        </form>

        <div class="task-list" id="taskList">
          ${window.MasariPages.renderTaskList()}
        </div>
      </section>
    ${MasariComponents.dashboardFooter()}
    </div>
  `;
};

window.MasariPages.renderTaskList = function () {
  const escapeHtml = MasariUtils.escapeHtml;

  return MASARI_DATA.tasks.map(task => `
    <div class="task-card">
      <div class="task-card-head">
        <div>
          <h3>${escapeHtml(task.title)}</h3>
          <p>${escapeHtml(task.course)} | الموعد النهائي: ${escapeHtml(task.deadline)}</p>
          <p>${escapeHtml(task.description)}</p>
        </div>

        <span class="priority-badge ${MasariUtils.priorityClass(task.priority)}">
          ${MasariUtils.priorityText(task.priority)}
        </span>
      </div>

      <div class="task-actions">
        <button class="done-btn" data-done-task="${task.id}">تم الإنجاز</button>
        <button class="delete-btn" data-delete-task="${task.id}">حذف</button>
      </div>
    </div>
  `).join("");
};
