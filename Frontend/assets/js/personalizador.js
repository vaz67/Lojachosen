document.addEventListener('DOMContentLoaded', () => {
  const mockup   = document.getElementById('mockup');
  const modelo   = document.getElementById('modelo');
  const palette  = document.querySelector('.palette');
  const uploader = document.getElementById('uploader');
  const stamp    = document.getElementById('stamp');

  if (!mockup || !modelo || !palette) {
    console.warn('[personalizador] Elementos não encontrados:', { mockup, modelo, palette });
    return;
  }

  let lastColorBtn = null;

  // Fallback base (caso não tenha clicado nenhuma cor ainda)
  function setDefaultByModel() {
    const base = `assets/img/mockups/${modelo.value}.png`;
    console.log('[personalizador] default mock:', base);
    mockup.src = base;
  }

  // Lê o botão e decide qual atributo usar (dataset converte data-mock-camiseta -> mockCamiseta)
  function setMockFromButton(btn) {
    const key =
      modelo.value === 'camiseta' ? 'mockCamiseta' :
      modelo.value === 'camisa'   ? 'mockCamisa'   :
      modelo.value === 'camisola' ? 'mockCamisola' : null;

    if (!key) return setDefaultByModel();

    const src = btn.dataset[key]; // ex.: assets/img/mockups/camiseta-black.png
    if (src) {
      console.log('[personalizador] troca mock:', src, '(via', key, ')');
      mockup.src = src;
    } else {
      console.warn('[personalizador] atributo ausente no botão:', key, btn);
      setDefaultByModel();
    }
  }

  // Troca quando muda o modelo
  modelo.addEventListener('change', () => {
    if (lastColorBtn) setMockFromButton(lastColorBtn);
    else setDefaultByModel();
  });

  // Delegação de evento na paleta (pega clicks inclusive em ícones internos)
  palette.addEventListener('click', (e) => {
    const btn = e.target.closest('.color-btn');
    if (!btn) return;
    lastColorBtn = btn;
    setMockFromButton(btn);
  });

  // Upload da estampa
  if (uploader && stamp) {
    uploader.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      stamp.src = url;
      stamp.style.display = 'block';
    });
  }

  // Init
  setDefaultByModel();
});
