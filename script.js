// Slideshow com bolinhas de navegação
const slides = document.querySelectorAll('.slideshow img');
const dots = document.querySelectorAll('.nav-dots .dot');

let currentSlide = 0;
let autoSlideInterval = 1000; // Intervalo inicial de 1 segundo para a troca automática de imagens
let autoSlideTimer; // Timer para controle da troca automática de slides
let userInteractionTimer; // Timer para controlar o tempo de 5 segundos após interação do usuário

// Função para exibir o slide selecionado
function showSlide(index) {
  // Garantir que o índice esteja dentro do intervalo válido
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  // Atualizar a posição das imagens
  const slidesContainer = document.querySelector('.slideshow .slides');
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Atualizar as bolinhas de navegação
  dots.forEach((dot, idx) => {
    dot.classList.remove('active');
    if (idx === currentSlide) {
      dot.classList.add('active');
    }
  });

  // Garantir que a opacidade das imagens seja 1 ao exibir o slide
  slides.forEach(slide => {
    slide.style.opacity = '0';  // Define a opacidade de todas as imagens para 0
  });
  slides[currentSlide].style.opacity = '1';  // Define a opacidade da imagem atual para 1
}

// Adicionar evento de clique para cada bolinha de navegação
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    showSlide(index);

    // Mudar o intervalo de tempo para 5 segundos após o clique em uma bolinha
    autoSlideInterval = 5000;  // 5 segundos
    resetAutoSlide();  // Reinicia o contador do slide automático

    // Pausar a navegação automática por 5 segundos
    clearTimeout(userInteractionTimer); // Limpar qualquer timer anterior
    userInteractionTimer = setTimeout(() => {
      autoSlideInterval = 1000;  // Voltar para 1 segundo após 5 segundos
      resetAutoSlide();
    }, 5000); // A navegação automática será reiniciada após 5 segundos
  });
});

// Exibir o primeiro slide inicialmente
showSlide(currentSlide);

// Contador
const startDate = new Date('2024-07-05T00:00:00');
const counter = () => {
  const now = new Date();
  const diff = now - startDate;

  const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const horas = new Date(diff).getUTCHours();
  const minutos = new Date(diff).getUTCMinutes();
  const segundos = new Date(diff).getUTCSeconds();

  // Atualizando os elementos do contador
  document.getElementById('anos').textContent = anos.toString().padStart(2, '0');
  document.getElementById('meses').textContent = meses.toString().padStart(2, '0');
  document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
  document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
  document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
  document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
};

setInterval(counter, 1000);

// Controle de música
const music = document.getElementById('background-music');
const toggleMusicBtn = document.getElementById('toggle-music');
const musicIcon = document.getElementById('music-icon');

// Reproduz ou pausa a música quando o botão é clicado
toggleMusicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicIcon.src = 'pause-icon.png';  // Muda para o ícone de pausa
  } else {
    music.pause();
    musicIcon.src = 'play-icon.png';  // Muda para o ícone de play
  }
});


// Efeito de corações - Chuva de corações
setInterval(() => {
  const heart = document.createElement('div');
  heart.className = 'heart';

  // Posição aleatória horizontal
  const startPosX = Math.random() * 100; // Posição aleatória da esquerda
  heart.style.left = `${startPosX}%`; // Define a posição inicial à esquerda

  // Posição aleatória vertical
  const startPosY = Math.random() * 100; // Posição aleatória do topo
  heart.style.top = `${startPosY}%`; // Define a posição inicial no topo

  // Definindo duração da animação e atraso aleatório
  const fallDuration = Math.random() * 3 + 3; // Duração de queda aleatória entre 3s e 6s
  heart.style.animationDuration = `${fallDuration}s`; // Duração de queda
  heart.style.animationDelay = `${Math.random() * -2}s`; // Atraso aleatório para cada coração

  document.getElementById('hearts').appendChild(heart);

  // Remove o coração após a animação
  setTimeout(() => heart.remove(), fallDuration * 1000); // Remove após a duração da queda
}, 300); // Novo coração a cada 300ms

// Função para avançar o slide automaticamente a cada intervalo
function autoSlide() {
  currentSlide = (currentSlide + 1) % slides.length;  // Avança para o próximo slide, ou volta ao primeiro
  showSlide(currentSlide);  // Atualiza o slide exibido
}

// Função para reiniciar o intervalo de slide automático com o novo tempo
function resetAutoSlide() {
  clearInterval(autoSlideTimer);  // Limpa o intervalo anterior
  autoSlideTimer = setInterval(autoSlide, autoSlideInterval);  // Cria um novo intervalo com o tempo ajustado
}

// Iniciar a troca automática de slides a cada 1 segundo inicialmente
resetAutoSlide();

// Adicionar eventos de toque para navegação
let touchStartX = 0;
let touchEndX = 0;

const slideshowContainer = document.querySelector('.slideshow');

// Detecta o início do toque
slideshowContainer.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

// Detecta o fim do toque e calcula a direção do deslize
slideshowContainer.addEventListener('touchend', (event) => {
  touchEndX = event.changedTouches[0].screenX;
  
  if (touchEndX < touchStartX) {
    // Deslizou para a esquerda, então avança para o próximo slide
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  if (touchEndX > touchStartX) {
    // Deslizou para a direita, então retrocede para o slide anterior
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Pausar a navegação automática por 5 segundos após o deslize
  autoSlideInterval = 5000;  // 5 segundos
  resetAutoSlide();  // Reinicia o contador do slide automático

  // Pausar a navegação automática por 5 segundos
  clearTimeout(userInteractionTimer); // Limpar qualquer timer anterior
  userInteractionTimer = setTimeout(() => {
    autoSlideInterval = 1000;  // Voltar para 1 segundo após 5 segundos
    resetAutoSlide();
  }, 5000); // A navegação automática será reiniciada após 5 segundos
});
