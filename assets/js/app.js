// =============================
// PERSONALIZADOR CHOSEN
// =============================

// --- Seletores principais ---
const uploader   = document.getElementById('uploader');
const stamp      = document.getElementById('stamp');
const scale      = document.getElementById('scale');
const posX       = document.getElementById('posX');
const posY       = document.getElementById('posY');
const rotate     = document.getElementById('rotate');
const opacity    = document.getElementById('opacity');
const resetBtn   = document.getElementById('reset');
const dlBtn      = document.getElementById('download');
const modeloSel  = document.getElementById('modelo');

// =============================
// FUNÇÃO DE TRANSFORMAÇÃO
// =============================
function applyTransform() {
  const s = Number(scale.value) / 100;
  const x = Number(posX.value);
  const y = Number(posY.value);
  const r = Number(rotate.value);

  stamp.style.transform = `translate(calc(-50% + ${x}%), calc(-50% + ${y}%)) rotate(${r}deg)`;
  stamp.style.width = `${45 * s}%`;
  stamp.style.opacity = Number(opacity.value) / 100;
}

// Eventos para sliders
[scale, posX, posY, rotate, opacity].forEach(input => {
  input.addEventListener('input', applyTransform);
});

// =============================
// UPLOAD DE IMAGEM
// =============================
uploader.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      stamp.src = ev.target.result;
      stamp.style.display = 'block';
      applyTransform();
    };
    reader.readAsDataURL(file);
  }
});

// =============================
// TROCAR MODELO (carregar mockup local)
// =============================
const mockupImg = document.getElementById("mockup");

modeloSel.addEventListener("change", () => {
  const tipo = modeloSel.value;
  mockupImg.src = `assets/img/mockups/${tipo}.png`;
});

// =============================
// PALETA DE CORES
// =============================
document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const color = btn.dataset.color;
    const tipo = modeloSel.value;

    // Se existir variação de cor salva como arquivo (ex: camiseta-black.png)
    const path = `assets/img/mockups/${tipo}-${color}.png`;
    fetch(path).then(res => {
      if (res.ok) {
        mockupImg.src = path;
      } else {
        // fallback: aplicar filtro CSS
        mockupImg.style.filter = `drop-shadow(0 0 0 ${color}) saturate(200%)`;
      }
    });
  });
});
// =============================
// RESET
// =============================
resetBtn.addEventListener('click', () => {
  stamp.src = '';
  stamp.style.display = 'none';

  scale.value = 60;
  posX.value = 0;
  posY.value = 0;
  rotate.value = 0;
  opacity.value = 95;

  applyTransform();
});

// =============================
// EXPORTAR PNG
// =============================
dlBtn.addEventListener('click', () => {
  const stage = document.getElementById('stage');

  html2canvas(stage, { backgroundColor: null }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'chosen-preview.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});

// =============================
// ANIMAÇÕES DE ENTRADA (IntersectionObserver)
// =============================
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animação de reveal ao rolar
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach((reveal) => {
    const revealTop = reveal.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add("visible");
    } else {
      // se quiser que o efeito repita ao voltar
      reveal.classList.remove("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
