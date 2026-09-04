// ============================================
// 1. EDITA AQUÍ TU LISTA DE CANCIONES
//    Pon tus archivos .mp3 dentro de assets/audio/
//    y escribe el título de cada una abajo.
// ============================================
const tracks = [
  { title: "Canción uno", src: "assets/audio/cancion-1.mp3" },
  { title: "Canción dos", src: "assets/audio/cancion-2.mp3" },
  { title: "Canción tres", src: "assets/audio/cancion-3.mp3" },
];

// ============================================
// 2. EDITA AQUÍ TUS FOTOS
//    Pon tus imágenes dentro de assets/img/
// ============================================
const photos = [
  "assets/img/foto-1.jpg",
  "assets/img/foto-2.jpg",
  "assets/img/foto-3.jpg",
  "assets/img/foto-4.jpg",
  "assets/img/foto-5.jpg",
  "assets/img/foto-6.jpg",
];

// ============================================
// Reproductor — no hace falta tocar nada de aquí abajo
// ============================================
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const seek = document.getElementById("seek");
const curTime = document.getElementById("curTime");
const durTime = document.getElementById("durTime");
const npTrack = document.getElementById("npTrack");
const trackListEl = document.getElementById("trackList");

let currentIndex = 0;
let isPlaying = false;

const ICON_PLAY = '<path d="M8 5v14l11-7z"/>';
const ICON_PAUSE = '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function renderTrackList() {
  trackListEl.innerHTML = "";
  tracks.forEach((track, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="track-num">${i + 1}</span>
      <span class="track-name">${track.title}</span>
      <span class="track-dur"></span>
    `;
    li.addEventListener("click", () => loadTrack(i, true));
    trackListEl.appendChild(li);
  });
}

function updateActiveTrack() {
  [...trackListEl.children].forEach((li, i) => {
    li.classList.toggle("active", i === currentIndex);
  });
}

function loadTrack(index, autoplay) {
  currentIndex = (index + tracks.length) % tracks.length;
  const track = tracks[currentIndex];
  audio.src = track.src;
  npTrack.textContent = track.title;
  updateActiveTrack();
  if (autoplay) {
    audio.play().catch(() => {});
  }
}

function togglePlay() {
  if (!audio.src) loadTrack(0, false);
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

audio.addEventListener("play", () => {
  isPlaying = true;
  playIcon.innerHTML = ICON_PAUSE;
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playIcon.innerHTML = ICON_PLAY;
});

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    seek.value = (audio.currentTime / audio.duration) * 100;
    curTime.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener("loadedmetadata", () => {
  durTime.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", () => {
  loadTrack(currentIndex + 1, true);
});

seek.addEventListener("input", () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (seek.value / 100) * audio.duration;
  }
});

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => loadTrack(currentIndex - 1, true));
nextBtn.addEventListener("click", () => loadTrack(currentIndex + 1, true));

renderTrackList();

// ============================================
// Galería
// ============================================
const galleryGrid = document.getElementById("galleryGrid");
photos.forEach((src, i) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Foto ${i + 1}`;
  img.loading = "lazy";
  img.onerror = () => { img.style.display = "none"; };
  galleryGrid.appendChild(img);
});

// ============================================
// Año en el footer
// ============================================
document.getElementById("year").textContent = new Date().getFullYear();
