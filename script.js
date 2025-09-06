document.addEventListener("DOMContentLoaded", function() {
    const openButton = document.getElementById("open-invitation-btn");
    const landingPage = document.getElementById("landing-page");
    const mainContent = document.getElementById("main-content");
    const backgroundMusic = document.getElementById("background-music");
    const body = document.body;

    // --- Logika Tombol Buka Undangan dan Musik ---
    openButton.addEventListener("click", function() {
        // 1. Sembunyikan landing page dengan transisi fade out
        landingPage.style.opacity = "0";
        landingPage.style.visibility = "hidden";

        // 2. Tampilkan konten utama setelah transisi selesai
        setTimeout(() => {
            mainContent.style.display = "block";
            landingPage.style.display = "none"; // Sembunyikan sepenuhnya setelah transisi
            body.style.overflowY = "auto"; // Aktifkan scrolling pada body
        }, 1500); // Sesuaikan durasi ini dengan transisi CSS (transition: opacity 1.5s)

        // 3. Putar musik.
        backgroundMusic.volume = 0.6; // Atur volume agar tidak terlalu keras
        backgroundMusic.play().catch(error => {
            console.warn("Autoplay music failed:", error);
            // Penanganan jika browser memblokir autoplay
        });
    });

    // --- Bagian 2: Animasi Fade-in Saat Scroll ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1 // elemen dianggap terlihat jika 10% areanya masuk viewport
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Hentikan observasi setelah animasi berjalan sekali
                observer.unobserve(entry.target);
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Terapkan observer ke semua elemen dengan class .fade-in
    document.querySelectorAll(".fade-in").forEach(element => {
        intersectionObserver.observe(element);
    });

    // --- Bagian 3: Simulasi Pengiriman Form (Placeholder) ---
    const rsvpForm = document.getElementById("rsvp-form");
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Terima kasih atas konfirmasi Anda!");
            rsvpForm.reset();
        });
    }

    const wishesForm = document.getElementById("wishes-form-input");
    if (wishesForm) {
        wishesForm.addEventListener("submit", function(e) {
            e.preventDefault();
            // Di aplikasi nyata, data ini akan dikirim ke server.
            alert("Ucapan Anda berhasil dikirim!");
            wishesForm.reset();
        });
    }
});