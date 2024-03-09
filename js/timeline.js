const menubar = document.querySelector(".menubar");
const overlaybackground = document.querySelector(".overlaybackground");
const closeMenu = document.querySelector(".fa-x");
const smallMenu = document.querySelector(".smallMenu");
const timeline = document.querySelector(".timeline");
const timelinebody = document.querySelector(".timelinebody");

const cards = [
    {
        title: "New Book",
        date: "March 30 2023",
        text: "Started reading a new book and completed the first chapter.",
        backgroundColor: "#FFD700" // Gold
    },
    {
        title: "Reading",
        date: "April 15 2023",
        text: "Continued reading the novel I started last week. Reached halfway through the book.",
        backgroundColor: "#87CEEB" // Sky Blue
    },
    {
        title: "Stop Reading",
        date: "May 2 2023",
        text: "Paused reading the thriller novel as I got busy with work projects.",
        backgroundColor: "#FFA07A" // Light Salmon
    },
    {
        title: "Coding",
        date: "May 20 2023",
        text: "Spent the weekend working on a coding project, implementing new features and fixing bugs.",
        backgroundColor: "#90EE90" // Light Green
    },
    {
        title: "Exercise",
        date: "June 5 2023",
        text: "Went for a jog in the morning and did a home workout session in the evening.",
        backgroundColor: "#FFC0CB" // Pink
    },
    {
        title: "Cooking",
        date: "June 20 2023",
        text: "Tried out a new recipe for dinner – Thai green curry. Turned out delicious!",
        backgroundColor: "#F0E68C" // Khaki
    }
];

//open or close small navbar
menubar.addEventListener("click", () => {
    smallMenu.style.transform = "translateX(0)"
    timelinebody.classList.toggle("overflow-hidden")
})

closeMenu.addEventListener("click", () => {
    smallMenu.style.transform = "translateX(-100%)"
    timelinebody.classList.toggle("overflow-hidden")
})

window.onload = () => {
    timeline.classList.add("adding");
    
    cards.forEach((item, index) => {
        setTimeout(() => {
            const content = document.createElement("div");
            content.classList.add("timeline__content");
            content.innerHTML = `
                <div class="card_container">
                    <span class="content_tag bg-[${item.backgroundColor}]">${item.title}</span>
                    <span class="content_date">${item.date}</span>
                </div>
                <p class="content_p">${item.text}</p>
                <a href="#" class="content_link">
                    View Profile
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.78413 5.49505L1.25827 9.79476C0.970375 10.0684 0.503596 10.0684 0.215837 9.79476C-0.0719456 9.52135 -0.0719456 9.0779 0.215837 8.80451L4.22052 4.99993L0.215953 1.19548C-0.0718292 0.921955 -0.0718292 0.478552 0.215953 0.205141C0.503736 -0.0683804 0.970491 -0.0683804 1.25839 0.205141L5.78424 4.50492C5.92814 4.64169 6 4.82075 6 4.99991C6 5.17915 5.928 5.35835 5.78413 5.49505Z" fill="#1F1F1F" />
                    </svg>
                </a>
            `;
            timeline.appendChild(content);

            // Trigger the transition for the added content after a delay
            setTimeout(() => {
                content.classList.add("show"); // Apply the transition class
            }, 100);
        }, index * 300); // Adjust the delay (in milliseconds) for a staggered effect

    });
};