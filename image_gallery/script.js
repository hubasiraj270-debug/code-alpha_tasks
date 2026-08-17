const photos = [
  { id: 1,  cat: 'mountain', name: 'Ridge Line at Dawn',      size: 'big',  seed: 'mountain1' },
  { id: 2,  cat: 'coast',    name: 'Tide Pools, Blue Hour',   size: '',     seed: 'coast1' },
  { id: 3,  cat: 'city',     name: 'Glass & Rain',            size: 'tall', seed: 'city1' },
  { id: 4,  cat: 'forest',   name: 'Understory Light',        size: '',     seed: 'forest1' },
  { id: 5,  cat: 'mountain', name: 'Snowfield Traverse',      size: '',     seed: 'mountain2' },
  { id: 6,  cat: 'coast',    name: 'Basalt Shoreline',        size: 'wide', seed: 'coast2' },
  { id: 7,  cat: 'city',     name: 'Night Market Alley',      size: '',     seed: 'city2' },
  { id: 8,  cat: 'forest',   name: 'Fog Between the Firs',    size: 'tall', seed: 'forest2' },
  { id: 9,  cat: 'mountain', name: 'Alpine Lake, Still',      size: '',     seed: 'mountain3' },
  { id: 10, cat: 'city',     name: 'Rooftops After Rain',     size: 'wide', seed: 'city3' },
  { id: 11, cat: 'coast',    name: 'Cliffside Path',          size: '',     seed: 'coast3' },
  { id: 12, cat: 'forest',   name: 'Moss & Morning Sun',      size: '',     seed: 'forest3' },
];

const galleryEl = document.getElementById('gallery');
const countEl = document.getElementById('count');
let currentFilter = 'all';

// NOTE: Abhi placeholder images use ho rahi hain (picsum.photos).
// Apni images use karni ho to is function ko replace kar dena, e.g.:
// function imgUrl(seed){ return `images/${seed}.jpg`; }
function imgUrl(seed, w, h){
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function renderGallery(){
  galleryEl.innerHTML = '';
  photos.forEach(p => {
    const tile = document.createElement('div');
    tile.className = `tile ${p.size}`.trim();
    tile.dataset.cat = p.cat;
    tile.dataset.id = p.id;
    tile.innerHTML = `
      <img src="${imgUrl(p.seed, 600, 600)}" alt="${p.name}" loading="lazy">
      <div class="tile-info">
        <span class="tag">${p.cat}</span>
        <span class="name">${p.name}</span>
      </div>
    `;
    tile.addEventListener('click', () => openLightbox(p.id));
    galleryEl.appendChild(tile);
  });
  applyFilter(currentFilter);
}

function applyFilter(filter){
  currentFilter = filter;
  let visibleCount = 0;
  document.querySelectorAll('.tile').forEach(tile => {
    const match = filter === 'all' || tile.dataset.cat === filter;
    tile.classList.toggle('hidden', !match);
    if(match) visibleCount++;
  });
  countEl.textContent = `${visibleCount} photo${visibleCount !== 1 ? 's' : ''}`;
}

document.getElementById('filters').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if(!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilter(btn.dataset.filter);
});

/* ---------- LIGHTBOX ---------- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbName = document.getElementById('lbName');
const lbCounter = document.getElementById('lbCounter');
let activeIndex = 0;

function visiblePhotos(){
  return currentFilter === 'all' ? photos : photos.filter(p => p.cat === currentFilter);
}

function openLightbox(id){
  const list = visiblePhotos();
  activeIndex = list.findIndex(p => p.id === id);
  showSlide();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showSlide(){
  const list = visiblePhotos();
  const p = list[activeIndex];
  lbImg.src = imgUrl(p.seed, 1200, 900);
  lbImg.alt = p.name;
  lbName.textContent = p.name;
  lbCounter.textContent = `${activeIndex + 1} / ${list.length}`;
}

function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function nextSlide(){
  const list = visiblePhotos();
  activeIndex = (activeIndex + 1) % list.length;
  showSlide();
}

function prevSlide(){
  const list = visiblePhotos();
  activeIndex = (activeIndex - 1 + list.length) % list.length;
  showSlide();
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbNext').addEventListener('click', nextSlide);
document.getElementById('lbPrev').addEventListener('click', prevSlide);

lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowRight') nextSlide();
  if(e.key === 'ArrowLeft') prevSlide();
});

renderGallery();
