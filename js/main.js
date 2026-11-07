(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var screens = Array.prototype.slice.call(document.querySelectorAll(".screen"));
  var current = 0, maxReached = 0;

  /* ---------------- {name} / {from} placeholders ---------------- */
  function fill(v) {
    if (typeof v === "string") return v.replace(/\{name\}/g, S.name).replace(/\{from\}/g, S.from);
    if (Array.isArray(v)) return v.map(fill);
    if (v && typeof v === "object") { for (var k in v) if (Object.prototype.hasOwnProperty.call(v, k)) v[k] = fill(v[k]); }
    return v;
  }
  ["photos", "awards", "nahiMessages", "verify", "quiz", "secretMessages", "letter", "lastSecret", "revealNote"].forEach(function (k) { S[k] = fill(S[k]); });
  document.title = "A Surprise for " + S.name + " 🎁";
  Array.prototype.forEach.call(document.querySelectorAll("[data-name]"), function (el) {
    el.textContent = S.name;
    if (S.name.length > 7) el.classList.add("long"); // lambe naam ke liye chhota font
  });
  $("#sealInitial").textContent = (S.name.trim()[0] || "♥").toUpperCase();
  $("#revealNote").textContent = S.revealNote || "";

  /* ---------------- Stars ---------------- */
  (function stars() {
    var box = $("#stars"), n = window.innerWidth < 600 ? 40 : 70, html = "";
    for (var i = 0; i < n; i++) {
      html += '<span style="left:' + (Math.random() * 100).toFixed(2) + "%;top:" + (Math.random() * 100).toFixed(2) +
        "%;animation-delay:" + (Math.random() * 3).toFixed(2) + "s;opacity:" + (0.2 + Math.random() * 0.6).toFixed(2) + '"></span>';
    }
    box.innerHTML = html;
  })();

  /* ---------------- Progress dots + navigation ---------------- */
  var dots = $("#dots");
  screens.forEach(function (_, i) {
    var d = document.createElement("i");
    d.addEventListener("click", function () { if (i <= maxReached) go(i); });
    dots.appendChild(d);
  });
  function paintDots() {
    Array.prototype.forEach.call(dots.children, function (d, i) {
      d.className = i === current ? "on" : (i <= maxReached ? "done" : "");
    });
  }
  function go(i) {
    if (i === current) return;
    screens[current].classList.remove("active");
    current = i; maxReached = Math.max(maxReached, i);
    var sc = screens[i];
    sc.classList.add("active");
    sc.scrollTop = 0;
    paintDots();
    $("#secretBtn").hidden = !(i === 3 || i === 4);
    if (i === 3) observeGallery();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-go]");
    if (t) { sfx("tap"); go(+t.getAttribute("data-go")); }
  });
  paintDots();

  /* ---------------- Music ---------------- */
  var bgm = $("#bgm"), mBtn = $("#musicBtn"), wantMusic = false;
  bgm.volume = 0.55;
  function setMusicUI(on) {
    mBtn.classList.toggle("playing", on);
    mBtn.setAttribute("aria-pressed", on ? "true" : "false");
    $(".music-label", mBtn).textContent = on ? "Music on" : "Music off";
  }
  function playMusic() {
    wantMusic = true;
    var p = bgm.play();
    if (p && p.then) p.then(function () { setMusicUI(true); }).catch(function () { setMusicUI(false); });
    else setMusicUI(true);
  }
  function pauseMusic() { wantMusic = false; bgm.pause(); setMusicUI(false); }
  mBtn.addEventListener("click", function () { (bgm.paused ? playMusic : pauseMusic)(); });
  bgm.addEventListener("error", function () { mBtn.hidden = true; }); // site works without music
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) bgm.pause(); else if (wantMusic) bgm.play().catch(function () {});
  });
  setMusicUI(false);

  /* ---------------- Tiny sound effects (WebAudio, very soft) ---------------- */
  var actx = null;
  function sfx(type) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var notes = { tap: [880], right: [660, 880, 1320], wrong: [300, 220], pop: [520, 780, 1040, 1560], blow: [] }[type] || [];
      notes.forEach(function (f, k) {
        var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + k * 0.08;
        o.type = type === "wrong" ? "triangle" : "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
        o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + 0.3);
      });
    } catch (e) { /* ignore */ }
  }

  /* ---------------- Confetti ---------------- */
  var cv = $("#confetti"), cx = cv.getContext("2d"), parts = [], raf = null;
  function sizeCanvas() { var r = window.devicePixelRatio || 1; cv.width = innerWidth * r; cv.height = innerHeight * r; cx.setTransform(r, 0, 0, r, 0, 0); }
  sizeCanvas(); addEventListener("resize", sizeCanvas);
  var colors = ["#ff7aa8", "#ff4f8b", "#f3d49b", "#c9b6ff", "#ffffff", "#ffd1e1"];
  function confetti(count, hearts) {
    if (reduceMotion) return;
    count = count || 120;
    for (var i = 0; i < count; i++) {
      parts.push({
        x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.4, y: innerHeight * 0.35,
        vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 13 - 4, g: 0.28 + Math.random() * 0.1,
        s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        c: colors[(Math.random() * colors.length) | 0], heart: hearts && Math.random() < 0.35, life: 0
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(function (p) { return p.y < innerHeight + 40 && p.life < 400; });
    parts.forEach(function (p) {
      p.life++; p.vy += p.g; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c;
      if (p.heart) { cx.font = (p.s * 2.4) + "px serif"; cx.fillText("💗", -p.s, p.s); }
      else cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      cx.restore();
    });
    raf = parts.length ? requestAnimationFrame(tick) : null;
    if (!raf) cx.clearRect(0, 0, innerWidth, innerHeight);
  }

  /* ---------------- 1. Mission ---------------- */
  $("#startBtn").addEventListener("click", function () {
    sfx("pop"); playMusic(); go(1); renderVerify();
  });

  /* ---------------- 2. Verification ---------------- */
  var vi = 0;
  function renderVerify() {
    var item = S.verify[vi];
    $("#vCount").textContent = "· " + (vi + 1) + "/" + S.verify.length;
    $("#vQ").textContent = item.q;
    var resp = $("#vResp"); resp.textContent = ""; $("#vNext").hidden = true;
    var box = $("#vOpts"); box.innerHTML = "";
    item.options.forEach(function (o, k) {
      var b = document.createElement("button");
      b.className = "opt"; b.textContent = o.t;
      var isNahi = (vi === 0 && !o.ok), nahiN = 0; // "Nahi" — 23 clicks, har baar naya message, phir gayab
      if (isNahi) b.classList.add("nope");
      b.addEventListener("click", function () {
        if (isNahi) {
          var M = S.nahiMessages;
          say(resp, M[nahiN]); sfx(nahiN === M.length - 1 ? "pop" : "wrong");
          b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
          nahiN++;
          if (nahiN >= M.length) {
            b.disabled = true; b.classList.add("gone");
            setTimeout(function () { b.remove(); }, 650);
          }
          return;
        }
        if (o.ok) {
          b.classList.add("right"); sfx("right"); confetti(40);
          Array.prototype.forEach.call(box.children, function (x) { x.disabled = true; });
          say(resp, o.r); $("#vNext").hidden = false; $("#vNext").focus({ preventScroll: true });
        } else {
          b.classList.remove("wrong"); void b.offsetWidth; b.classList.add("wrong"); sfx("wrong");
          say(resp, o.r);
        }
      });
      box.appendChild(b);
    });
  }
  $("#vNext").addEventListener("click", function () {
    sfx("tap");
    vi++;
    if (vi < S.verify.length) renderVerify();
    else go(2);
  });
  function say(el, text) { el.classList.remove("pop"); void el.offsetWidth; el.textContent = text; el.classList.add("pop"); }

  /* ---------------- 3. Reveal ---------------- */
  var cake = $("#cake"), blown = false;
  cake.addEventListener("click", function () {
    if (blown) return; blown = true;
    cake.classList.add("out"); sfx("pop");
    setTimeout(function () {
      $(".reveal").classList.add("done");
      confetti(180, true);
      setTimeout(function () { confetti(90, true); }, 700);
    }, 550);
  });

  /* ---------------- 4. Gallery ---------------- */
  var gal = $("#gallery"), cards = [], rot = [-3, 2.5, -1.5, 3, -2.5, 1.5, -1, 2];
  S.photos.forEach(function (p, i) {
    var b = document.createElement("button");
    b.className = "polaroid";
    b.style.setProperty("--r", rot[i % rot.length] + "deg");
    b.setAttribute("aria-label", "Open photo " + (i + 1) + ": " + p.caption);
    var ratio = p.w && p.h ? ' style="aspect-ratio:' + p.w + "/" + p.h + '"' : "";
    b.innerHTML = (i % 3 === 0 ? '<span class="tape"></span>' : "") +
      (p.funny ? '<span class="tag">LOL 😂</span>' : "") +
      '<div class="ph"' + ratio + '><img loading="lazy" decoding="async" src="assets/thumbs/' + p.file + '" alt="' + p.alt.replace(/"/g, "&quot;") +
      '"' + (p.w ? ' width="' + p.w + '" height="' + p.h + '"' : "") + "></div>" +
      '<div class="cap"></div>';
    $(".cap", b).textContent = p.caption;
    var img = $("img", b);
    img.addEventListener("error", function () {
      console.warn("Photo load failed:", p.file);
      img.remove(); $(".ph", b).classList.add("broken");
    });
    b.addEventListener("click", function () { openLB(i); });
    cards.push(b);
  });
  // Row-wise masonry: photo 1 left, 2 right, 3 left… (same-outfit photos door rehti hain)
  var colCount = 0;
  function layoutGallery() {
    var n = window.innerWidth >= 700 ? 3 : 2;
    if (n === colCount) return; colCount = n;
    gal.innerHTML = "";
    var cols = [];
    for (var c = 0; c < n; c++) { var d = document.createElement("div"); d.className = "gcol"; gal.appendChild(d); cols.push(d); }
    cards.forEach(function (b, i) { cols[i % n].appendChild(b); });
  }
  layoutGallery();
  addEventListener("resize", layoutGallery);
  var io = null;
  function observeGallery() {
    var cards = gal.querySelectorAll(".polaroid:not(.in)");
    if (!("IntersectionObserver" in window) || reduceMotion) { Array.prototype.forEach.call(cards, function (c) { c.classList.add("in"); }); return; }
    if (!io) io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { root: $("#s-gallery"), threshold: 0.08 });
    Array.prototype.forEach.call(cards, function (c) { io.observe(c); });
  }

  /* Lightbox */
  var lb = $("#lightbox"), lbImg = $("#lbImg"), lbi = 0, lastFocus = null;
  function showLB(i) {
    lbi = (i + S.photos.length) % S.photos.length;
    var p = S.photos[lbi];
    lbImg.src = "assets/images/" + p.file; lbImg.alt = p.alt;
    lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
    $("#lbCap").textContent = p.caption;
    $("#lbCount").textContent = (lbi + 1) + " / " + S.photos.length;
    // preload next
    var n = new Image(); n.src = "assets/images/" + S.photos[(lbi + 1) % S.photos.length].file;
  }
  function openLB(i) { lastFocus = document.activeElement; lb.hidden = false; showLB(i); $("#lbClose").focus(); sfx("tap"); }
  function closeLB() { lb.hidden = true; lbImg.src = ""; if (lastFocus) lastFocus.focus({ preventScroll: true }); }
  $("#lbClose").addEventListener("click", closeLB);
  $("#lbPrev").addEventListener("click", function () { showLB(lbi - 1); });
  $("#lbNext").addEventListener("click", function () { showLB(lbi + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
  lbImg.addEventListener("error", function () { $("#lbCap").textContent = "📷 Ye photo load nahi ho payi — next try karo"; });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") showLB(lbi - 1);
    if (e.key === "ArrowRight") showLB(lbi + 1);
  });
  var sx = null, sy = null;
  lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showLB(lbi + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) closeLB();
    sx = null;
  });

  /* ---------------- 5. Awards ---------------- */
  var aw = $("#awards");
  S.awards.forEach(function (a, i) {
    var b = document.createElement("button");
    b.className = "award";
    b.setAttribute("aria-label", "Award " + (i + 1) + ", tap to reveal");
    b.innerHTML = '<div class="award-inner">' +
      '<div class="face front"><span class="trophy">🏆</span><div class="ft">Award #' + (i + 1) + "<small>Tap karke dekho kaunsa award hai</small></div></div>" +
      '<div class="face back"><span class="icon"></span><div><h3></h3><p></p></div></div></div>';
    $(".icon", b).textContent = a.icon; $("h3", b).textContent = a.title; $("p", b).textContent = a.desc;
    b.addEventListener("click", function () {
      var was = b.classList.contains("flipped");
      b.classList.toggle("flipped");
      if (!was) { sfx("right"); if (!b.dataset.seen) { b.dataset.seen = 1; confetti(30); } }
      b.setAttribute("aria-label", was ? "Award " + (i + 1) + ", tap to reveal" : a.title + ". " + a.desc);
    });
    aw.appendChild(b);
  });

  /* ---------------- 6. Challenge ---------------- */
  var gi = 0, score = 0;
  function renderGame() {
    var q = S.quiz[gi];
    $("#gCount").textContent = "· " + (gi + 1) + "/" + S.quiz.length;
    $("#gQ").textContent = q.q;
    $("#gScore").textContent = "⭐ " + score;
    var resp = $("#gResp"); resp.textContent = ""; $("#gNext").hidden = true;
    var box = $("#gOpts"); box.innerHTML = "";
    var firstTry = true;
    q.options.forEach(function (t, k) {
      var b = document.createElement("button");
      b.className = "opt"; b.textContent = t;
      b.addEventListener("click", function () {
        if (k === q.answer) {
          b.classList.add("right"); sfx("right"); confetti(50, true);
          if (firstTry) score++;
          $("#gScore").textContent = "⭐ " + score;
          Array.prototype.forEach.call(box.children, function (x) { x.disabled = true; });
          say(resp, q.right);
          $("#gNext").textContent = gi < S.quiz.length - 1 ? "Next →" : "Final gift kholo 🎁";
          $("#gNext").hidden = false;
        } else {
          firstTry = false; b.disabled = true;
          b.classList.add("wrong"); sfx("wrong"); say(resp, q.wrong);
        }
      });
      box.appendChild(b);
    });
  }
  $("#gNext").addEventListener("click", function () {
    sfx("tap"); gi++;
    if (gi < S.quiz.length) renderGame(); else go(6);
  });
  renderGame();

  /* ---------------- 7. Final gift ---------------- */
  var gift = $("#gift"), opened = false;
  gift.addEventListener("click", function () {
    if (opened) return; opened = true;
    gift.classList.add("open"); sfx("pop");
    confetti(200, true);
    $("#giftLead").hidden = true; $("#giftHint").textContent = "Tumhare liye ek chitthi 💌";
    setTimeout(function () {
      var l = $("#letter"); l.innerHTML = S.letter; l.hidden = false;
      $("#endActions").hidden = false;
      setTimeout(function () { l.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }, 150);
    }, 700);
  });
  $("#lastSecretBtn").addEventListener("click", function () {
    sfx("pop"); confetti(80, true); say($("#lastSecret"), S.lastSecret);
  });
  $("#replayBtn").addEventListener("click", function () {
    vi = 0; gi = 0; score = 0; blown = false; opened = false; secretN = 0;
    cake.classList.remove("out"); $(".reveal").classList.remove("done");
    gift.classList.remove("open"); $("#letter").hidden = true; $("#endActions").hidden = true; $("#lastSecret").textContent = "";
    $("#giftLead").hidden = false; $("#giftHint").textContent = "Aakhri surprise 🎁";
    Array.prototype.forEach.call(aw.children, function (b) { b.classList.remove("flipped"); });
    renderVerify(); renderGame();
    go(1);
  });

  /* ---------------- Secret button ---------------- */
  var secretN = 0, toastT = null;
  $("#secretBtn").addEventListener("click", function () {
    var msg = S.secretMessages[Math.min(secretN, S.secretMessages.length - 1)];
    secretN++;
    sfx("pop"); confetti(40, true);
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("show"); }, 3800);
  });
})();
