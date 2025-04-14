const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

    setTimeout(() => {
      const link = document.createElement('a');
      link.download = 'signature.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }, 300);
  };

  imagen.onerror = function () {
    alert("No se pudo cargar la plantilla. Asegúrate que el archivo esté en la misma carpeta.");
  };
}