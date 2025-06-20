document.addEventListener("DOMContentLoaded", function () {
  const textInput = document.getElementById("qr-text");
  const sizeInput = document.getElementById("qr-size");
  const sizeVal = document.getElementById("size-val");
  const colorInput = document.getElementById("qr-color");
  const bgInput = document.getElementById("qr-bgcolor");
  const typeSelect = document.getElementById("qr-type");
  const generateBtn = document.getElementById("generate-btn");
  const downloadBtn = document.getElementById("download-btn");
  const qrBox = document.getElementById("qrcode");
  const themeToggle = document.getElementById("themeToggle");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.innerHTML = `<i class="fas fa-${isDark ? "sun" : "moon"}"></i>`;
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Update size label
  sizeInput.addEventListener("input", () => {
    sizeVal.textContent = sizeInput.value + "px";
  });

  // Generate QR Code
  function generate() {
    const text = textInput.value.trim();
    if (!text) return alert("Masukkan konten QR!");

    qrBox.innerHTML = "";
    let finalText = text;

    switch (typeSelect.value) {
      case "email": finalText = "mailto:" + text; break;
      case "phone": finalText = "tel:" + text; break;
      case "sms": finalText = "sms:" + text; break;
      case "wifi": finalText = text; break;
    }

    new QRCode(qrBox, {
      text: finalText,
      width: parseInt(sizeInput.value),
      height: parseInt(sizeInput.value),
      colorDark: colorInput.value,
      colorLight: bgInput.value,
      correctLevel: QRCode.CorrectLevel.H
    });

    downloadBtn.disabled = false;
  }

  // Download QR Code
  function download() {
    const canvas = qrBox.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
  }

  generateBtn.addEventListener("click", generate);
  downloadBtn.addEventListener("click", download);
  generate(); // initial QR
});