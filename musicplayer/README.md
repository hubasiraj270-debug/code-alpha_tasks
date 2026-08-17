# Groove — Music Player (Task 4)

A turntable-styled music player built with vanilla **HTML, CSS, and JavaScript**.

## Project structure
```
music-player-project/
├── index.html   → page structure
├── style.css    → styling (vinyl/turntable theme)
├── script.js    → audio logic & interactivity
└── README.md    → this file
```

## Features
- ✅ Music player interface (HTML + CSS, vinyl/turntable design)
- ✅ JavaScript audio control: play, pause, next, previous
- ✅ Displays song title, artist, and duration
- ✅ Progress bar (click to seek) + volume control slider
- ✅ Bonus: full playlist (click any track to play it) + Autoplay & Shuffle toggles

## How to run
1. Keep all four files in the same folder.
2. Double-click `index.html` to open it in any browser (Chrome, Edge, Firefox).
3. Click the play button once — browsers block audio autoplay until you interact with the page.

## Using your own songs
Open `script.js` and edit the `tracks` array at the top:
```js
const tracks = [
  { title: "Your Song", artist: "Your Artist", src: "path/or/url/to/song.mp3" },
  ...
];
```
- `src` can be a local file path (e.g. `songs/track1.mp3`, if you add a `songs/` folder next to `index.html`) or a direct URL to an audio file.
- Demo tracks currently use free sample audio from SoundHelix for testing.

## Notes
- No external libraries used — pure HTML/CSS/JS, easy to submit as-is.
- Fully responsive down to mobile widths.
