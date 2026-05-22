/* ════════════════════════════════════
   UNDANGAN PERNIKAHAN — SCRIPT.JS
════════════════════════════════════ */

// ── Buka Undangan ──
function bukaUndangan() {
  const cover = document.getElementById("cover");
  const main = document.getElementById("main-content");

  cover.style.transition = "opacity .9s ease, transform .9s ease";
  cover.style.opacity = "0";
  cover.style.transform = "scale(1.06)";

  setTimeout(function () {
    cover.style.display = "none";
    main.classList.remove("hidden");
    window.scrollTo(0, 0);

    startCountdown();
    initReveal();
    tryAutoplay();
    startFlowerRain();
  }, 900);
}

// ── Countdown ──
function startCountdown() {
  var target = new Date(2026, 9, 15, 8, 0, 0);

  function tick() {
    var now = new Date();
    var diff = target - now;

    if (diff <= 0) {
      document.getElementById("cd-d").textContent = "00";
      document.getElementById("cd-h").textContent = "00";
      document.getElementById("cd-m").textContent = "00";
      document.getElementById("cd-s").textContent = "00";
      return;
    }

    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var minutes = Math.floor((diff % 3600000) / 60000);
    var seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById("cd-d").textContent = String(days).padStart(2, "0");
    document.getElementById("cd-h").textContent = String(hours).padStart(
      2,
      "0",
    );
    document.getElementById("cd-m").textContent = String(minutes).padStart(
      2,
      "0",
    );
    document.getElementById("cd-s").textContent = String(seconds).padStart(
      2,
      "0",
    );
  }

  tick();
  setInterval(tick, 1000);
}

// ── Scroll Reveal ──
function initReveal() {
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    obs.observe(el);
  });
}

// ── Kelopak Jatuh di Cover ──
(function spawnPetals() {
  var container = document.getElementById("petals-cover");
  if (!container) return;
  for (var i = 0; i < 20; i++) {
    var p = document.createElement("div");
    p.className = "petal";
    var size = 6 + Math.random() * 10;
    p.style.left = Math.random() * 100 + "vw";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.animationDuration = 4 + Math.random() * 7 + "s";
    p.style.animationDelay = Math.random() * 6 + "s";
    container.appendChild(p);
  }
})();

// ── Musik ──
var musicPlaying = false;

function tryAutoplay() {
  var audio = document.getElementById("bgMusic");
  audio.volume = 0.4;
  audio
    .play()
    .then(function () {
      musicPlaying = true;
    })
    .catch(function () {});
}

function toggleMusic() {
  var audio = document.getElementById("bgMusic");
  var fab = document.getElementById("musicFab");
  var icon = document.getElementById("musicIcon");

  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    fab.classList.add("paused");
    icon.className = "fas fa-pause";
  } else {
    audio.play();
    musicPlaying = true;
    fab.classList.remove("paused");
    icon.className = "fas fa-music";
  }
}

// ── Pilih Kehadiran ──
function pilihKehadiran(val) {
  document.getElementById("label-hadir").classList.remove("selected-hadir");
  document.getElementById("label-tidak").classList.remove("selected-tidak");
  if (val === "hadir")
    document.getElementById("label-hadir").classList.add("selected-hadir");
  if (val === "tidak")
    document.getElementById("label-tidak").classList.add("selected-tidak");
}

// ── Kirim Kehadiran ──
function kirimKehadiran() {
  var nama = document.getElementById("uc-nama").value.trim();
  var radio = document.querySelector('input[name="kehadiran"]:checked');

  if (!nama) {
    alert("Mohon isi nama Anda.");
    return;
  }
  if (!radio) {
    alert("Mohon pilih kehadiran Anda.");
    return;
  }

  document.getElementById("uc-nama").value = "";
  radio.checked = false;
  document.getElementById("label-hadir").classList.remove("selected-hadir");
  document.getElementById("label-tidak").classList.remove("selected-tidak");

  var btn = document.querySelector(".btn-kirim");
  var originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i>&nbsp; Terima Kasih!';
  btn.style.background = "#2d7a3e";
  btn.style.color = "#fff";
  btn.disabled = true;

  setTimeout(function () {
    btn.innerHTML = originalText;
    btn.style.background = "";
    btn.style.color = "";
    btn.disabled = false;
  }, 2500);
}

// ── Bunga Jatuh di Main Content ──
function startFlowerRain() {
  var container = document.getElementById("flower-rain");
  if (!container) {
    console.warn("flower-rain container tidak ditemukan!");
    return;
  }

  // Warna-warna kelopak
  var colors = ["#d4af6e", "#e8c87a", "#f0ddb0", "#c9a96e", "#b8974a"];

  function buatKelopak() {
    var el = document.createElement("div");

    var size = 8 + Math.random() * 16;
    var left = Math.random() * 100;
    var dur = 5 + Math.random() * 8;
    var delay = Math.random() * 3;
    var drift = (Math.random() - 0.5) * 180;
    var color = colors[Math.floor(Math.random() * colors.length)];
    var shape = Math.floor(Math.random() * 4);

    el.style.position = "absolute";
    el.style.top = "-20px";
    el.style.left = left + "vw";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
    el.style.setProperty("--drift", drift + "px");

    // Bentuk kelopak bervariasi
    if (shape === 0) {
      el.style.borderRadius = "50% 0 50% 0";
      el.style.background = color;
    } else if (shape === 1) {
      el.style.borderRadius = "50%";
      el.style.background = color;
      el.style.opacity = "0";
    } else if (shape === 2) {
      el.style.borderRadius = "50% 10% 50% 10%";
      el.style.background = color;
    } else {
      el.style.borderRadius = "0 50% 0 50%";
      el.style.background = color;
    }

    el.style.animation =
      "flowerFall " + dur + "s " + delay + "s linear forwards";

    container.appendChild(el);

    // Hapus setelah selesai
    setTimeout(
      function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      },
      (dur + delay) * 1000 + 500,
    );
  }

  // Spawn 30 kelopak langsung
  for (var i = 0; i < 30; i++) {
    buatKelopak();
  }

  // Terus spawn setiap 600ms
  setInterval(buatKelopak, 600);
}
