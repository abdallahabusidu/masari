window.MASARI_DATA = {
  tasks: JSON.parse(localStorage.getItem("masariTasks") || "null") || [
    {
      id: 1,
      title: "إنهاء تقرير مشروع التخرج",
      course: "مشروع التخرج",
      deadline: "2026-01-12",
      priority: "High",
      status: "Pending",
      description: "مراجعة جزء الواجهة الأمامية وتحديث التوثيق."
    },
    {
      id: 2,
      title: "تسليم واجب قواعد البيانات",
      course: "Database",
      deadline: "2026-01-18",
      priority: "Medium",
      status: "Pending",
      description: "حل أسئلة ERD و SQL ورفع الملف النهائي."
    },
    {
      id: 3,
      title: "مراجعة مادة البرمجيات",
      course: "Software Engineering",
      deadline: "2026-01-22",
      priority: "Low",
      status: "Completed",
      description: "مراجعة المخططات والمتطلبات الوظيفية."
    }
  ],
  levels: ["المستوى الأول", "المستوى الثاني", "المستوى الثالث", "المستوى الرابع", "المستوى الخامس"],
  resources: ["عرض كل المصادر", "المحاضرات التعليمية", "الدروس المصورة", "المواد التعليمية", "الكتب الدراسية"]
};
