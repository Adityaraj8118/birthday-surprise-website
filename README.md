# 🎁 Birthday Surprise Website

A mobile-first, interactive birthday surprise you can send to a friend as a single link. It works like a small story: a secret mission, a funny verification, a cake reveal, a photo scrapbook, awards, a friendship quiz and a final letter.

Plain **HTML + CSS + JavaScript**. No framework, no build step, no backend.

![Preview](docs/preview.jpg)

## ✨ Features

| Screen | What happens |
|---|---|
| 1. Secret Mission | Animated envelope, "Mission Accept karo" button, starts background music |
| 2. Verification | 3 funny questions. The **"Nahi"** button shows a new message on every tap (23 in total), then disappears 😄 |
| 3. Cake Reveal | Tap the cake → candles blow out → confetti + "Happy Birthday {name}" |
| 4. Scrapbook | Polaroid-style photo gallery with captions, full-screen viewer with swipe |
| 5. Awards | Flip cards with funny personalised awards |
| 6. Friendship Quiz | 4 questions with score, right/wrong reactions |
| 7. Final Gift | Gift box opens → personal letter → "One last secret" → replay |

Also included:
- "Isko mat dabana 👀" secret button
- Music on/off button (an original lofi tune is included)
- Soft sound effects and confetti
- Respects reduced-motion settings
- Self-hosted fonts (Baloo 2, Poppins, Caveat), so nothing is loaded from third-party servers
- Tested on a 390 × 844 phone viewport: no horizontal scroll, no console errors

## 🛠️ Make it your own (3 steps)

**1. Names:** open `js/data.js` and change the first two lines:
```js
name: "Your Friend",   // birthday person's name
from: "Your Name",     // your name
```
Every `{name}` and `{from}` in the texts is replaced automatically.

**2. Photos:** put your photos in `assets/images/` (full size) and a smaller copy (~640 px) in `assets/thumbs/` with the **same file name**. Then list them in `photos: [...]` inside `js/data.js`:
```js
{ file: "photo-01.jpg", caption: "Your caption 😄", alt: "Short description" },
```
Add `funny: true` to show a "LOL 😂" tag. You can use any number of photos.

**3. Text:** edit the awards, quiz questions, letter and secret messages in the same `js/data.js` file.

Optional: replace `assets/audio/music.mp3` with your own song (keep the same file name).

## ▶️ Run locally

Double-click `index.html`, or run a local server:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`. To test on a phone, connect it to the same Wi-Fi and open `http://<your-computer-IP>:8000`.

## 🚀 Deploy (free)

**Netlify:** Add new project → Import from GitHub → select this repo → leave the build command and publish directory empty → Deploy.

**GitHub Pages:** Settings → Pages → Branch `main` / root → Save.

> 🔒 **Privacy tip:** a deployed site is public to anyone with the link. If you use real photos, keep your repo **private**, and make sure the site's visitor access in Netlify is set to public so your friend can open the link without logging in.

## 📁 Structure

```
index.html            page structure (7 screens)
css/styles.css        design and animations
js/data.js            ALL text, names and photo list (edit this)
js/main.js            logic (navigation, quiz, gallery, music, confetti)
assets/images/        full-size photos
assets/thumbs/        small photos for the gallery
assets/audio/         background music
assets/fonts/         self-hosted fonts (SIL Open Font License)
```

The photos in this repo are generated placeholders, so you can replace them freely.
