const root = document.getElementById("root");

let currentPage = "home";
let pageHistory = [];

function navigate(page, options = {}) {
  const renderer = window.MasariPages[page] || window.MasariPages.home;

  if (!options.skipHistory && currentPage && currentPage !== page) {
    pageHistory.push(currentPage);
  }

  currentPage = page;
  root.innerHTML = `<div class="app-shell">${renderer()}</div>${page !== "home" ? '<button class="floating-back" data-back="true">رجوع</button>' : ''}`;
  bindEvents();
  window.scrollTo(0, 0);
}

function goBack() {
  const previousPage = pageHistory.pop();

  if (previousPage) {
    navigate(previousPage, { skipHistory: true });
  } else if (currentPage !== "home") {
    navigate("home", { skipHistory: true });
  } else {
    window.history.back();
  }
}

function bindEvents() {
  document.querySelectorAll("[data-page]").forEach((element) => {
    element.addEventListener("click", () => navigate(element.dataset.page));
  });

  document.querySelectorAll("[data-back]").forEach((element) => {
    element.addEventListener("click", goBack);
  });

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      document.body.classList.toggle("mobile-open");
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      MasariUtils.showToast("تم إرسال الرسالة بنجاح");
      contactForm.reset();
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      MasariUtils.showToast("تم تسجيل الدخول بنجاح");
      navigate("dashboard");
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const major = document.getElementById("registerMajor").value.trim();
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("registerConfirmPassword").value;

      if (!name || !email || !major || !password || !confirmPassword) {
        MasariUtils.showToast("يرجى تعبئة جميع بيانات التسجيل");
        return;
      }

      if (password !== confirmPassword) {
        MasariUtils.showToast("كلمة المرور وتأكيدها غير متطابقين");
        return;
      }

      localStorage.setItem("masariUser", JSON.stringify({ name, email, major }));
      MasariUtils.showToast("تم إنشاء الحساب بنجاح");
      navigate("dashboard");
    });
  }

  const taskForm = document.getElementById("taskForm");
  if (taskForm) {
    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = document.getElementById("taskTitle").value.trim();
      const course = document.getElementById("taskCourse").value.trim();
      const deadline = document.getElementById("taskDeadline").value;
      const priority = document.getElementById("taskPriority").value;
      const description = document.getElementById("taskDescription").value.trim();

      if (!title || !course || !deadline) {
        MasariUtils.showToast("يرجى تعبئة الحقول المطلوبة");
        return;
      }

      MASARI_DATA.tasks.push({
        id: Date.now(),
        title,
        course,
        deadline,
        priority,
        status: "Pending",
        description: description || "لا يوجد وصف إضافي."
      });

      MasariUtils.saveTasks();
      MasariUtils.showToast("تمت إضافة المهمة بنجاح");
      navigate("tasks");
    });
  }

  document.querySelectorAll("[data-done-task]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.doneTask);
      MASARI_DATA.tasks = MASARI_DATA.tasks.map(task =>
        task.id === id ? { ...task, status: "Completed" } : task
      );
      MasariUtils.saveTasks();
      MasariUtils.showToast("تم تحديث حالة المهمة");
      navigate("tasks", { skipHistory: true });
    });
  });

  document.querySelectorAll("[data-delete-task]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.deleteTask);

      if (confirm("هل تريد حذف هذه المهمة؟")) {
        MASARI_DATA.tasks = MASARI_DATA.tasks.filter(task => task.id !== id);
        MasariUtils.saveTasks();
        MasariUtils.showToast("تم حذف المهمة");
        navigate("tasks", { skipHistory: true });
      }
    });
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    goBack();
  }
});

navigate("home", { skipHistory: true });
