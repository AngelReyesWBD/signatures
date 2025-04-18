const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

document.getElementById('firmaForm').addEventListener('submit', function (e) {
  e.preventDefault();
  generarFirma();
});

function generarFirma() {
  const fullname = document.getElementById('fullname').value;
  const department = document.getElementById('department').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  const selectedTemplateInput = document.querySelector('input[name="template"]:checked');

  if (!selectedTemplateInput) {
    alert('Por favor selecciona una plantilla.');
    return;
  }

  const selectedTemplate = selectedTemplateInput.value;
  const imagen = new Image();
  imagen.src = selectedTemplate;

  imagen.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 110px Arial";
    ctx.fillText(fullname, 500, 300);

    ctx.font = "90px Arial";
    ctx.fillText(department, 500, 395);

    ctx.font = "40px Arial";
    if (phone.trim() !== "") {
      ctx.fillText(phone, 20, 410);
    }
    ctx.fillText(email, 20, 460);

    // Mostrar el botón de descarga
    downloadBtn.style.display = 'inline-flex';
  };

  imagen.onerror = function () {
    alert("No se pudo cargar la plantilla. Asegúrate que el archivo esté en la misma carpeta.");
  };
}

downloadBtn.addEventListener('click', function () {
  const link = document.createElement('a');
  link.download = 'firma.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// Ocultar botón de descarga si se modifica algo del formulario
const formElements = document.querySelectorAll('#firmaForm input');
formElements.forEach(el => {
  el.addEventListener('input', () => {
    downloadBtn.style.display = 'none';
  });

  if (el.type === 'radio') {
    el.addEventListener('change', () => {
      downloadBtn.style.display = 'none';
    });
  }
});
