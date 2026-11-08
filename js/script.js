
// MENGAMBIL DATA PROJECT
const projectCards = document.querySelectorAll(".project-card");
const filterButtons = document.querySelectorAll(".filter");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "all";

// FUNGSI FILTER KATEGORI
function filterProjects() {

    let visibleCount = 0;

    projectCards.forEach(card => {

        const category = card.dataset.category;

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesCategory) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }

    });

    if (emptyMessage) {
        emptyMessage.hidden = visibleCount !== 0;
    }
}

// FILTER KATEGORI
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterProjects();

    });

});

// MODAL DETAIL KARYA
const modal = document.getElementById("detailModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");

// MEMBUKA MODAL DETAIL
projectCards.forEach(card => {

    const detailButton = card.querySelector(".detail-button");

    if (!detailButton) return;

    detailButton.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();

        if (!modal || !modalTitle || !modalDescription) return;

        modalTitle.textContent = card.dataset.name;
        modalDescription.textContent = card.dataset.description;

        modal.classList.add("show");

    });

});

// MENUTUP MODAL
function hideModal() {
    if (modal) {
        modal.classList.remove("show");
    }
}

if (closeModal) {
    closeModal.addEventListener("click", hideModal);
}

// MENUTUP MODAL KETIKA KLIK DI LUAR
if (modal) {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            hideModal();
        }
    });
}

// MENUTUP MODAL DENGAN TOMBOL ESCAPE
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        hideModal();
    }
});
