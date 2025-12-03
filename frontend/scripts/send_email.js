document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("https://my-portfolio-swui.onrender.com/send", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            showToast("Có lỗi xảy ra, vui lòng thử lại!", "danger");
            return;
        }

        // Backend trả về {"message": "Mail đã được lưu!", "id": ...}
        if (result.id) {
            showToast("Gửi thành công! ID: " + result.id, "success");
            setTimeout(() => location.reload(), 1500);
        } else {
            showToast("Không gửi được, vui lòng thử lại!", "danger");
        }
    } catch (err) {
        showToast("Lỗi kết nối server!", "danger");
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