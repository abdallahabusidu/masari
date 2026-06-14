import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const ar = {
  common: { back: "رجوع", save: "حفظ", cancel: "إلغاء", delete: "حذف", edit: "تعديل", add: "إضافة", search: "بحث", loading: "جارٍ التحميل...", open: "فتح", logout: "تسجيل الخروج", noData: "لا توجد بيانات", saved: "تم الحفظ ✓" },
  brand: { name: "مساري", title: "مساري - إدارة مهام الطلبة", sub: "طريقك للوصول إلى أعلى تحصيل" },
  nav: { home: "الرئيسية", services: "الخدمات", about: "حول", contact: "اتصل بنا", register: "تسجيل جديد", login: "تسجيل الدخول", control: "لوحة التحكم", exit: "خروج" },
  tabs: { level: "مستواك الخاص", timeline: "مخططي الزمني", resources: "مصادر تعليمية", tasks: "إدارة المهام" },
  dash: { welcomeName: "مرحباً", welcomeTitle: "أهلاً بك في مساري - لإدارة مهام الطلبة", searchTasks: "ابحث في المهام...", editView: "تعديل طريقة العرض", materials: "المواد التعليمية" },
  auth: {
    welcomeIn: "مرحبا بك في", loginTitle: "تسجيل الدخول", email: "البريد الالكتروني", password: "كلمة المرور",
    forgot: "هل نسيت كلمة المرور؟", noAccount: "ليس لديك حساب؟", createStudent: "إنشاء حساب طالب جديد",
    haveAccount: "لديك حساب بالفعل؟", registerTitle: "تسجيل جديد", createIn: "أنشئ حسابك في مساري",
    sideText: "ابدأ بتنظيم مهامك الأكاديمية ومتابعة مواعيدك بسهولة.", fullName: "الاسم الكامل",
    major: "التخصص / القسم", confirm: "تأكيد كلمة المرور", create: "إنشاء الحساب",
    mismatch: "كلمتا المرور غير متطابقتين", loginFail: "تعذر تسجيل الدخول", registerFail: "تعذر إنشاء الحساب", demo: "تجربة: student@masari.edu / masari123",
  },
  home: {
    heroTitle: "أكاديمية مساري التعليمية",
    heroText: "نظام مساري الأكاديمي يوفر لك بيئة سهلة لإدارة المهام الدراسية ومتابعة المشاريع الجماعية ومواعيد التسليم بطريقة منظمة تساعدك على تحسين إنجازك الأكاديمي.",
    features: "ما يميزنا",
    f1t: "تجربة تعليمية فريدة", f1b: "تصميم خاص بالطلبة لتنظيم المهام والمواعيد وإدارة المواد الدراسية بشكل واضح وسهل الاستخدام.",
    f2t: "سهولة الاستخدام", f2b: "واجهات بسيطة تساعد الطالب على إضافة المهمة ومتابعة تقدمها والوصول إلى معلوماته بسرعة.",
    f3t: "الدعم المستمر", f3b: "يوفر مساري طريقة منظمة لمتابعة المشاريع الجماعية والتواصل حول المهام المهمة طوال الفصل.",
  },
  about: { title: "من نحن", body: "نسعى في مساري إلى تمكين طلاب الجامعات عبر توفير بيئة رقمية متكاملة لتنظيم العمل التعليمي بأسلوب حديث وفعال. توفر المنصة أدوات ذكية لإدارة المهام وجدولة الموارد التعليمية ومتابعة السنوات الدراسية، مما يضمن تجربة تعلم مخصصة وشاملة تهدف إلى تحقيق أفضل درجات الإنجاز والتميز.", registerNow: "سجل الآن" },
  contact: { title: "كيف يمكنك الوصول الينا", name: "الاسم", emailPhone: "البريد الالكتروني / رقم الهاتف", subject: "عنوان الرسالة", message: "الرسالة", send: "إرسال", sent: "تم إرسال رسالتك ✓", socials: "زورونا على مواقع التواصل الاجتماعي", privacy: "سياسة الخصوصية", aboutUs: "من نحن", faq: "الأسئلة الشائعة" },
  tasks: {
    title: "إدارة المهام الأكاديمية", taskTitle: "عنوان المهمة", course: "اسم المادة", desc: "وصف المهمة",
    pHigh: "أولوية عالية", pMedium: "أولوية متوسطة", pLow: "أولوية منخفضة", addNew: "إضافة مهمة جديدة",
    fSearch: "بحث...", fCourse: "المادة", allPriorities: "كل الأولويات", allStatuses: "كل الحالات",
    selectAll: "تحديد الكل", sortBy: "ترتيب حسب:", sDeadline: "الموعد النهائي", sPriority: "الأولوية", sNewest: "الأحدث",
    selected: "محددة", done: "إنجاز", noMatch: "لا توجد مهام مطابقة", markDone: "تم الإنجاز", undo: "إلغاء الإنجاز",
    overdue: "متأخرة", day: "يوم", deadlineLabel: "الموعد النهائي", noCourse: "بدون مادة", addFail: "تعذر إضافة المهمة",
  },
  detail: { remaining: "يوم متبقٍ", progress: "نسبة الإنجاز", subtasks: "قائمة المهام الفرعية", addSub: "إضافة مهمة فرعية", markComplete: "وضع كمكتملة", unmark: "إلغاء الإكمال" },
  timeline: { title: "المخطط الزمني", refresh: "تحديث", viewCalendar: "عرض التقويم", empty: "لا توجد مهام في المخطط الزمني" },
  calendar: { title: "التقويم الأكاديمي", today: "اليوم", month: "شهر", week: "أسبوع" },
  resources: { chooseLevel: "اختر المستوى الدراسي", materials: "المواد التعليمية", all: "عرض كل المصادر", subjectMaterials: "جميع المصادر التعليمية لهذه المادة", openRes: "فتح المصدر ↗", noLevels: "لا توجد مستويات بعد", noSubjects: "لا توجد مواد بعد", noRes: "لا توجد مصادر لهذه المادة بعد", noResSection: "لا توجد مصادر في هذا القسم" },
  cat: { lectures: "المحاضرات التعليمية", recorded: "الدروس المصورة", materials: "المواد التعليمية", books: "الكتب الدراسية" },
  analytics: { title: "إحصائيات إنجاز الطالب", rate: "نسبة إنجاز المهام", pending: "مهام قيد المتابعة", status: "حالة المهام", byCourse: "توزيع المهام حسب المادة", trend: "اتجاه الإنتاجية (آخر 7 أيام)", completed: "مكتملة", pendingShort: "قيد المتابعة", overdue: "متأخرة", created: "منشأة" },
  profile: { title: "الملف الشخصي والإعدادات", name: "الاسم", major: "التخصص", theme: "المظهر", language: "اللغة", light: "فاتح", dark: "داكن", emailReminders: "تذكيرات البريد الإلكتروني للمواعيد", changePw: "تغيير كلمة المرور", current: "كلمة المرور الحالية", newPw: "كلمة المرور الجديدة", pwChanged: "تم تغيير كلمة المرور ✓", pwFail: "فشل تغيير كلمة المرور" },
  priority: { high: "عالية", medium: "متوسطة", low: "منخفضة" },
  status: { pending: "قيد المتابعة", in_progress: "قيد التنفيذ", completed: "مكتملة" },
  notif: { title: "الإشعارات", markAll: "تعليم الكل كمقروء", empty: "لا توجد إشعارات", now: "الآن" },
  admin: {
    title: "لوحة تحكم المسؤول", password: "كلمة مرور المسؤول", enter: "دخول", wrong: "كلمة مرور غير صحيحة",
    studentView: "عرض الطالب", logout: "خروج المسؤول", levels: "المستويات الدراسية", newLevel: "اسم مستوى جديد", addLevel: "+ إضافة مستوى",
    subjects: "المواد", levelSubjects: "مواد المستوى", newSubject: "اسم مادة جديدة", addSubject: "+ إضافة مادة",
    resources: "المصادر", subjectResources: "مصادر المادة", resTitle: "عنوان المصدر", resLink: "الرابط (اختياري)", addRes: "+ إضافة مصدر",
    noLevels: "لا توجد مستويات بعد", noSubjects: "لا توجد مواد بعد", noItems: "لا توجد عناصر",
    bcLevels: "المستويات", titleBtn: "عنوان", linkBtn: "رابط",
  },
};

const en = {
  common: { back: "Back", save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit", add: "Add", search: "Search", loading: "Loading...", open: "Open", logout: "Logout", noData: "No data", saved: "Saved ✓" },
  brand: { name: "Masari", title: "Masari - Student Task Management", sub: "Your path to top achievement" },
  nav: { home: "Home", services: "Services", about: "About", contact: "Contact", register: "Sign up", login: "Login", control: "Admin Panel", exit: "Logout" },
  tabs: { level: "My Level", timeline: "Timeline", resources: "Resources", tasks: "Tasks" },
  dash: { welcomeName: "Hi", welcomeTitle: "Welcome to Masari - Student Task Management", searchTasks: "Search tasks...", editView: "Edit view", materials: "Study Materials" },
  auth: {
    welcomeIn: "Welcome to", loginTitle: "Login", email: "Email", password: "Password",
    forgot: "Forgot your password?", noAccount: "Don't have an account?", createStudent: "Create a student account",
    haveAccount: "Already have an account?", registerTitle: "Sign up", createIn: "Create your Masari account",
    sideText: "Start organizing your academic tasks and tracking your deadlines easily.", fullName: "Full name",
    major: "Major / Department", confirm: "Confirm password", create: "Create account",
    mismatch: "Passwords do not match", loginFail: "Could not sign in", registerFail: "Could not create account", demo: "Demo: student@masari.edu / masari123",
  },
  home: {
    heroTitle: "Masari Academy",
    heroText: "Masari's academic system gives you an easy environment to manage study tasks, track group projects and deadlines in an organized way that improves your academic achievement.",
    features: "What sets us apart",
    f1t: "A unique learning experience", f1b: "A student-focused design to organize tasks, deadlines and course materials clearly and simply.",
    f2t: "Ease of use", f2b: "Simple interfaces that help students add tasks, track progress and reach their information quickly.",
    f3t: "Continuous support", f3b: "Masari offers an organized way to follow group projects and communicate about important tasks all semester.",
  },
  about: { title: "About us", body: "At Masari we aim to empower university students by providing an integrated digital environment to organize academic work in a modern, effective way. The platform offers smart tools to manage tasks, schedule learning resources and track academic years, ensuring a personalized, comprehensive learning experience aimed at the best achievement and excellence.", registerNow: "Register now" },
  contact: { title: "How to reach us", name: "Name", emailPhone: "Email / phone", subject: "Subject", message: "Message", send: "Send", sent: "Your message was sent ✓", socials: "Follow us on social media", privacy: "Privacy policy", aboutUs: "About us", faq: "FAQ" },
  tasks: {
    title: "Academic Task Management", taskTitle: "Task title", course: "Course name", desc: "Task description",
    pHigh: "High priority", pMedium: "Medium priority", pLow: "Low priority", addNew: "Add new task",
    fSearch: "Search...", fCourse: "Course", allPriorities: "All priorities", allStatuses: "All statuses",
    selectAll: "Select all", sortBy: "Sort by:", sDeadline: "Deadline", sPriority: "Priority", sNewest: "Newest",
    selected: "selected", done: "Complete", noMatch: "No matching tasks", markDone: "Done", undo: "Undo",
    overdue: "Overdue", day: "d", deadlineLabel: "Deadline", noCourse: "No course", addFail: "Could not add task",
  },
  detail: { remaining: "days left", progress: "Progress", subtasks: "Sub-tasks", addSub: "Add sub-task", markComplete: "Mark complete", unmark: "Mark incomplete" },
  timeline: { title: "Timeline", refresh: "Refresh", viewCalendar: "View calendar", empty: "No tasks on the timeline" },
  calendar: { title: "Academic Calendar", today: "Today", month: "Month", week: "Week" },
  resources: { chooseLevel: "Choose a level", materials: "Subjects", all: "All resources", subjectMaterials: "All learning resources for this subject", openRes: "Open resource ↗", noLevels: "No levels yet", noSubjects: "No subjects yet", noRes: "No resources for this subject yet", noResSection: "No resources in this section" },
  cat: { lectures: "Lectures", recorded: "Recorded lessons", materials: "Study materials", books: "Books" },
  analytics: { title: "Student Progress Analytics", rate: "Completion rate", pending: "Pending tasks", status: "Task status", byCourse: "Tasks by course", trend: "Productivity trend (last 7 days)", completed: "Completed", pendingShort: "Pending", overdue: "Overdue", created: "Created" },
  profile: { title: "Profile & Settings", name: "Name", major: "Major", theme: "Theme", language: "Language", light: "Light", dark: "Dark", emailReminders: "Email deadline reminders", changePw: "Change password", current: "Current password", newPw: "New password", pwChanged: "Password changed ✓", pwFail: "Failed to change password" },
  priority: { high: "High", medium: "Medium", low: "Low" },
  status: { pending: "Pending", in_progress: "In progress", completed: "Completed" },
  notif: { title: "Notifications", markAll: "Mark all read", empty: "No notifications", now: "now" },
  admin: {
    title: "Admin Panel", password: "Admin password", enter: "Enter", wrong: "Incorrect password",
    studentView: "Student view", logout: "Admin logout", levels: "Academic Levels", newLevel: "New level name", addLevel: "+ Add level",
    subjects: "Subjects", levelSubjects: "Level subjects", newSubject: "New subject name", addSubject: "+ Add subject",
    resources: "Resources", subjectResources: "Subject resources", resTitle: "Resource title", resLink: "Link (optional)", addRes: "+ Add resource",
    noLevels: "No levels yet", noSubjects: "No subjects yet", noItems: "No items",
    bcLevels: "Levels", titleBtn: "Title", linkBtn: "Link",
  },
};

const saved = localStorage.getItem("masari_lang") || "ar";

i18n.use(initReactI18next).init({
  resources: { ar: { translation: ar }, en: { translation: en } },
  lng: saved,
  fallbackLng: "ar",
  interpolation: { escapeValue: false },
});

export function applyLanguage(lng) {
  i18n.changeLanguage(lng);
  localStorage.setItem("masari_lang", lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
}

applyLanguage(saved);

export default i18n;
