// Show or hide the WhatsApp chat button based on scroll position
window.addEventListener("scroll", () => {
    const whatsappButton = document.getElementById("whatsapp-chat");
    if (document.documentElement.scrollTop > 100) {
        whatsappButton.style.display = "block";
    } else {
        whatsappButton.style.display = "none"; // Updated for clarity
    }
});

// Dynamically set the current year
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear();
});

// Search and Filter Logic
const filterResults = () => {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const locationFilter = document.getElementById("filterLocation").value;
    const ageFilter = document.getElementById("filterAge").value;
    const genderFilter = document.getElementById("filterGender").value;
    const sinceFilter = document.getElementById("filterSince").value;

    const cards = document.querySelectorAll(".result-card");

    cards.forEach(card => {
        const matchesSearch = card.textContent.toLowerCase().includes(searchQuery);
        const matchesLocation = !locationFilter || card.dataset.location === locationFilter;
        const matchesAge = !ageFilter || card.dataset.age === ageFilter;
        const matchesGender = !genderFilter || card.dataset.gender === genderFilter;
        const matchesSince = !sinceFilter || card.dataset.since === sinceFilter;

        card.style.display = matchesSearch && matchesLocation && matchesAge && matchesGender && matchesSince
            ? "block"
            : "none";
    });
};

// Attach filterResults to relevant inputs
["searchInput", "filterLocation", "filterAge", "filterGender", "filterSince"].forEach(id => {
    document.getElementById(id).addEventListener("input", filterResults);
});

// Pagination Logic
document.addEventListener("DOMContentLoaded", () => {
    const resultsPerPage = 12;
    const resultCards = document.querySelectorAll(".result-card");
    const totalResults = resultCards.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    let currentPage = 1;

    const pageIndicator = document.getElementById("pageIndicator");

    const updatePageIndicator = () => {
        pageIndicator.textContent = `${currentPage} of ${totalPages}`;
    };

    const showPage = (page) => {
        const start = (page - 1) * resultsPerPage;
        const end = start + resultsPerPage;

        resultCards.forEach((card, index) => {
            card.style.display = index >= start && index < end ? "block" : "none";
        });

        document.getElementById("prevButton").disabled = page === 1;
        document.getElementById("nextButton").disabled = page === totalPages;

        updatePageIndicator();
    };

    document.getElementById("prevButton").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById("nextButton").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    showPage(currentPage); // Initialize the first page
});


