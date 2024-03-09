let bookStatusCategories = [
    {
        id: 1,
        status: "Book List",
        color: "blue",
        quantity: 5,
    },
    {
        id: 2,
        status: "Currently Reading",
        color: "orange",
        quantity: 1,
    },
    {
        id: 3,
        status: "Stopped Reading",
        color: "red",
        quantity: 4,
    },
    {
        id: 4,
        status: "Complete",
        color: "green",
        quantity: 0,
    },
    {
        id: 5,
        status: "Highly Recommended",
        color: "yellow",
        quantity: 3,
    }
];

let bookActivities = [
    {
        id: 1,
        bookTitle: "The Shining",
        status: "Currently Reading",
        color: "green",
        feedback: "Enjoyed the suspense and horror elements.",
        rating: 4.5,
        datetime: new Date("January 7, 2024"),
    },
    {
        id: 2,
        bookTitle: "To Kill a Mockingbird",
        status: "In Progress",
        color: "orange",
        feedback: "Captivating story with deep themes.",
        rating: null, // No rating assigned yet
        datetime: new Date("February 15, 2024"),
    },
    {
        id: 3,
        bookTitle: "1984",
        status: "Paused",
        color: "yellow",
        feedback: "Intense dystopian narrative, need a break.",
        rating: 3.0,
        datetime: new Date("March 1, 2024"),
    }
];


const summeryBody = document.querySelector(".body");
const activityContainer = document.querySelector(".activityContainer");
const activityFilter = document.querySelector(".activityFilter");
const editoverlay = document.querySelector(".editoverlay");
const menuoverlay = document.querySelector(".menuoverlay");
const menubar = document.querySelector(".menubar");
const closeMenu = document.querySelector(".fa-x");
const smallMenu = document.querySelector(".smallMenu")
const closeEditoverlay = document.querySelector(".closeEditoverlay")

//insert categories into html
bookStatusCategories.map(item => {
    summeryBody.innerHTML += `
    <div class="flex flex-col items-start p-4 m-3 bg-gray-100 md:bg-transparent rounded-lg min-w-full sm:min-w-[130px] justify-center">
        <h2 class="font-semibold text-${item.color}-500 text-md md:text-lg uppercase">${item.status}</h2>
        <p class="flex items-center justify-center text-gray-700 font-normal"><span class="text-2xl font-semibold me-2">${item.quantity}</span>${item.quantity > 0 ? "books" : "book"}</p>
    </div>
    `
})

//insert bookActivities into html
bookActivities.map(item => {
    activityContainer.innerHTML += ` 
    <div class="activity relative m-4 p-6 transition-all duration-200 shadow-md hover:shadow-lg bg-gray-100 rounded-lg min-w-full sm:min-w-[270px] min-h-[180px]">
        <h1 class="font-bold text-lg mb-3">${item.bookTitle}</h1>
        <p class="py-1 px-3 inline-block items-center justify-center bg-${item.color}-500 text-white text-sm rounded-md font-normal"><span>${item.status}</span></p>
        <div class="datetime flex items-center justify-between px-6 absolute bottom-0 left-0 w-full bg-gray-200 h-[50px]">
            <p class="relative">
                <span>Created at ${item.datetime.toLocaleDateString('en-US')}</span>
            </p>
            <i class="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
        </div>
    </div>
    `
    const ellipses = document.querySelectorAll(".fa-ellipsis-vertical");
    ellipses.forEach(ellipsis => {
        ellipsis.addEventListener("click", () => {
            editoverlay.style.transform = "scale(1)";
        });
    });
    
})

//open and close small navbar
closeEditoverlay.addEventListener("click", () => {
    editoverlay.style.transform = "scale(0)";
})

menubar.addEventListener("click", () => {
    smallMenu.style.transform = "translateX(0)"
})

closeMenu.addEventListener("click", () => {
    smallMenu.style.transform = "translateX(-100%)"
})