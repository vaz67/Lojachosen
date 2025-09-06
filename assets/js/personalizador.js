
    const mockup = document.getElementById("mockup");
const modelo = document.getElementById("modelo");
const colorBtns = document.querySelectorAll(".color-btn");

// Trocar mockup pelo modelo selecionado
modelo.addEventListener("change", (e) => {
  const value = e.target.value;
  mockup.src = `mockup/${value}.png`; // exemplo: mockup/camiseta.png
});

// Trocar cor
colorBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const color = btn.getAttribute("data-color");

    // Se tiver mockups prontos por cor (ex: camiseta-black.png)
    const currentModel = modelo.value;
    mockup.src = `mockup/${currentModel}-${color}.png`;

    // OU: se quiser só aplicar filtro (não tão realista)
    // mockup.style.filter = `hue-rotate(90deg)` ou `brightness(0) saturate(100%) invert(...)`;
  });
});

// Upload da estampa
const uploader = document.getElementById("uploader");
const stamp = document.getElementById("stamp");

uploader.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    stamp.src = URL.createObjectURL(file);
    stamp.style.display = "block";
  }
});

