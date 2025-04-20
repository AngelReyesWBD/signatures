imagen.onload = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
  ctx.shadowColor = "black";
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;


  // Cambiar color de letra dependiendo de la plantilla seleccionada
  let textoColor = "white";
  let shadowColor = "black";

  const plantillaBlanca = ["14.png", "15.png", "16.png", "17.png", "18.png", "CL.png", "CL2.png"];
  if (!plantillaBlanca.includes(selectedTemplate)) {
    textoColor = "black"; // TLOU u otras
    shadowColor = "white"; // Sombra blanca para plantillas oscuras

  }

  // Efecto de sombra
ctx.shadowColor = shadowColor;
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;

  ctx.fillStyle = textoColor;

   // Posiciones por defecto
  let nombreX = 500, nombreY = 300;
  let deptoX = 500, deptoY = 395;
  let phoneX = 20, phoneY = 410;
  let emailX = 20, emailY = 460;

  // Si la plantilla es CL2.png, cambiar posiciones
  if (selectedTemplate === "CL2.png") {
    nombreX = 800;
    nombreY = 280;
    deptoX = 800;
    deptoY = 370;
    phoneX = 1600;
    phoneY = 405;
    emailX = 1400;
    emailY = 440;
  }

ctx.font = "110px 'Beatrice Extrabold'";
ctx.fillText(fullname, nombreX, nombreY);

ctx.font = "90px 'Beatrice'";
ctx.fillText(department, deptoX, deptoY);

ctx.font = "40px 'Beatrice'";
if (phone.trim() !== "") {
  ctx.fillText(phone, phoneX, phoneY);
}
ctx.fillText(email, emailX, emailY);

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
