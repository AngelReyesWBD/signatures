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

  const imagen = new Image();
  imagen.crossOrigin = "anonymous";
  imagen.src = 'CL.png'; // Asegúrate que esté en la misma carpeta

  imagen.onload = function () {
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja la imagen de fondo
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);

    // Estilo de texto
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

    // Descargar automáticamente como archivo PNG
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = 'signature.png'; // El nombre del archivo descargado
      link.href = canvas.toDataURL('image/png'); // Genera el enlace con el contenido en formato PNG
      link.click(); // Simula el clic para iniciar la descarga
    }, 300);
  };
}