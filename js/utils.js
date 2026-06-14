window.MasariUtils = {
  saveTasks() {
    localStorage.setItem("masariTasks", JSON.stringify(window.MASARI_DATA.tasks));
  },

  escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  },

  priorityText(priority) {
    if (priority === "High") return "عالية";
    if (priority === "Medium") return "متوسطة";
    return "منخفضة";
  },

  priorityClass(priority) {
    if (priority === "High") return "priority-high";
    if (priority === "Medium") return "priority-medium";
    return "priority-low";
  },

  showToast(message) {
    const oldToast = document.querySelector(".toast");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2400);
  }
};
