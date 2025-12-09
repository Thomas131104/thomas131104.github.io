document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz4MJod8BYCY68WGzMrxv2826rqdz_TSM7odNr7TH47cqSmNhfylredwLB8e8ZHKYTo7w/exec", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (response.ok && result.message) {
      showToast("✅ " + result.message, "success");
      e.target.reset();
    } else {
      showToast("❌ Có lỗi xảy ra, vui lòng thử lại!", "danger");
    }
  } catch (err) {
    showToast("❌ Lỗi kết nối server!", "danger");
  }
});

function showToast(message, type) {
  const toastEl = document.getElementById('toast');
  const toastBody = document.getElementById('toast-body');

  toastBody.innerText = message;
  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
