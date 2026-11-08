
// =================================
// VIDEO POPUP ELEMENTS
// =================================

const videoCards = document.querySelectorAll(".video-card");

const videoModal = document.getElementById("videoModal");

const popupVideo = document.getElementById("popupVideo");

const closeVideo = document.getElementById("closeVideo");


// =================================
// OPEN VIDEO POPUP
// =================================

videoCards.forEach(card => {

    card.addEventListener("click", () => {

        const videoSource = card.dataset.video;

        if (!videoSource) {
            console.error("Alamat video tidak ditemukan.");
            return;
        }

        // Mengatur sumber video
        popupVideo.src = videoSource;

        // Menampilkan popup
        videoModal.classList.add("active");

        videoModal.setAttribute("aria-hidden", "false");

        // Mengunci scroll halaman belakang
        document.body.style.overflow = "hidden";

        // Memuat video
        popupVideo.load();

        // Memulai pemutaran video
        popupVideo.play().catch(error => {
            console.log(
                "Video siap diputar melalui tombol play.",
                error
            );
        });

    });

});


// =================================
// CLOSE VIDEO POPUP
// =================================

function closeVideoModal() {

    // Menutup popup
    videoModal.classList.remove("active");

    videoModal.setAttribute("aria-hidden", "true");

    // Menghentikan video
    popupVideo.pause();

    // Menghapus sumber video
    popupVideo.removeAttribute("src");

    popupVideo.load();

    // Mengembalikan scroll halaman
    document.body.style.overflow = "";

}


// =================================
// CLOSE BUTTON
// =================================

closeVideo.addEventListener("click", closeVideoModal);


// =================================
// CLICK OUTSIDE VIDEO
// =================================

videoModal.addEventListener("click", event => {

    if (event.target === videoModal) {
        closeVideoModal();
    }

});


// =================================
// ESCAPE KEY
// =================================

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        videoModal.classList.contains("active")
    ) {
        closeVideoModal();
    }

});
