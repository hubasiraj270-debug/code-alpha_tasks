// ---- Playlist data ----
// Replace these with your own audio files / URLs.
const tracks = [
  { title: "Amber Skyline", artist: "Miles & Rowe", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Late Night Static", artist: "Coral Drift", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Velvet Hours", artist: "Nadia Frost", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Copper Room", artist: "The Aftertone", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Slow Tide", artist: "Ezra Vale", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

const audio = document.getElementById('audio');
const vinyl = document.getElementById('vinyl');
const tonearm = document.getElementById('tonearm');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');
const volumeSlider = document.getElementById('volumeSlider');
const volIcon = document.getElementById('volIcon');
const autoplayBtn = document.getElementById('autoplayBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const playlistEl = document.getElementById('playlist');

let currentIndex = 0;
let isPlaying = false;
let autoplay = true;
let shuffle = false;

const ICON_PLAY = '<path d="M8 5v14l11-7z"/>';
const ICON_PAUSE = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';

function formatTime(sec){
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function renderPlaylist(){
  playlistEl.innerHTML = '';
  tracks.forEach((t, i) => {
    const item = document.createElement('div');
    item.className = 'pl-item' + (i === currentIndex ? ' active' : '');
    item.innerHTML = `
      <span class="pl-index">${(i+1).toString().padStart(2,'0')}</span>
      <div class="pl-texts">
        <div class="pl-title">${t.title}</div>
        <div class="pl-artist">${t.artist}</div>
      </div>
      ${i === currentIndex && isPlaying
        ? '<div class="eq"><span></span><span></span><span></span></div>'
        : `<span class="pl-dur">${t.duration || ''}</span>`}
    `;
    item.addEventListener('click', () => loadTrack(i, true));
    playlistEl.appendChild(item);
  });
}

function loadTrack(index, autoStart){
  currentIndex = (index + tracks.length) % tracks.length;
  const t = tracks[currentIndex];
  songTitle.textContent = t.title;
  songArtist.textContent = t.artist;
  audio.src = t.src;
  renderPlaylist();
  if (autoStart) play();
  else pause();
}

function play(){
  audio.play().then(() => {
    isPlaying = true;
    setPlayIcon(ICON_PAUSE);
    vinyl.classList.add('playing');
    tonearm.classList.add('playing');
    renderPlaylist();
  }).catch(()=>{ /* autoplay might be blocked until user interacts */ });
}

function pause(){
  audio.pause();
  isPlaying = false;
  setPlayIcon(ICON_PLAY);
  vinyl.classList.remove('playing');
  tonearm.classList.remove('playing');
  renderPlaylist();
}

function setPlayIcon(svgInner){
  const icon = document.getElementById('playIcon');
  icon.innerHTML = svgInner;
}

playBtn.addEventListener('click', () => {
  if (!audio.src) loadTrack(0, true);
  else isPlaying ? pause() : play();
});

function nextTrack(){
  let nextIndex;
  if (shuffle){
    do { nextIndex = Math.floor(Math.random() * tracks.length); }
    while (nextIndex === currentIndex && tracks.length > 1);
  } else {
    nextIndex = currentIndex + 1;
  }
  loadTrack(nextIndex, true);
}
function prevTrack(){
  loadTrack(currentIndex - 1, true);
}

nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

audio.addEventListener('timeupdate', () => {
  const pct = (audio.currentTime / audio.duration) * 100 || 0;
  progressFill.style.width = pct + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  durationTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  if (autoplay) nextTrack();
  else pause();
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  if (audio.duration) audio.currentTime = pct * audio.duration;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value / 100;
  volIcon.style.opacity = volumeSlider.value == 0 ? 0.4 : 1;
});
audio.volume = volumeSlider.value / 100;

autoplayBtn.addEventListener('click', () => {
  autoplay = !autoplay;
  autoplayBtn.classList.toggle('active', autoplay);
});
shuffleBtn.addEventListener('click', () => {
  shuffle = !shuffle;
  shuffleBtn.classList.toggle('active', shuffle);
});

// Initialize with first track loaded but paused (browsers block true autoplay w/ sound
// until user interacts with the page).
loadTrack(0, false);
