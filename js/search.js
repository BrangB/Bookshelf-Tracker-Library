import { apikey } from "./key.js";

const overlay  = document.querySelector(".overlay");
const leave = document.querySelector(".fa-arrow-right-from-bracket");
const search = document.querySelector(".search");
const searchBooks = document.querySelector(".searchBooks");
const inputbook = document.querySelector(".inputbook");
const buttonGroup = document.querySelector(".buttonGroup");
const libraryCase = document.querySelector(".libraryCase");

leave.addEventListener("click", () => {
  overlay.style.transform = "translateY(-100%)";
})

//search books and insert into html
search.addEventListener("click", () => {
  overlay.style.transform = "translateY(0)";
})

let todoArray = []
let totalPage = 0

let startIndex = 0;
const maxResults = 10;

searchBooks.addEventListener("click", () => {
  overlay.style.transform = "translateY(-100%)";

  const searchbBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputbook.value}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apikey}`;

  fetch(searchbBooksUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    totalPage = data.totalItems / 10
    todoArray = data.items
    console.log(todoArray)
    startIndex += maxResults;
    libraryCase.innerHTML = "";
    buttonGroup.innerHTML = "";
    const specific_values = [2000, 3000, 5000, 6000, 9000, 8000, 15000, 20000, 16000, 10000];
    todoArray.map(item => {
      const image = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';
        const title = item.volumeInfo.title;
        const random_index = Math.floor(Math.random() * specific_values.length);

        const itemElement = document.createElement('div');
        itemElement.classList.add('item', 'w-[130px]', 'md:w-[170px]', 'bg-white', 'h-auto', 'flex', 'flex-col', 'items-start', 'justify-start', 'overflow-hidden', 'rounded-md', 'transition-all', 'duration-200', 'shadow-md', 'hover:shadow-lg', 'p-2');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('w-full', 'h-[150px]', 'md:h-[200px]', 'bg-[#F5F5F5]', 'flex', 'items-center', 'justify-center');
        const img = document.createElement('img');
        img.src = image;
        img.alt = 'books';
        img.classList.add('object-cover', 'w-[70%]', 'h-[80%]');
        imageContainer.appendChild(img);

        const titleElement = document.createElement('h3');
        titleElement.classList.add('mt-4', 'px-2', 'title', 'font-bold', 'text-md', 'text-start', 'no-wrap', 'text-ellipsis', 'overflow-hidden', 'w-[90%]');
        titleElement.textContent = title;

        const priceAndPurchase = document.createElement('div');
        priceAndPurchase.classList.add('priceAndPurchase', 'flex', 'items-center', 'justify-between', 'w-full', 'p-2', 'mb-1');
        const price = document.createElement('div');
        price.classList.add('text-sm');
        price.innerHTML = `${specific_values[random_index]} <span class="font-bold">MMK</span>`;
        const bookmarkIcon = document.createElement('i');
        bookmarkIcon.classList.add('fa-regular', 'fa-bookmark', 'cursor-pointer', 'text-[#697988]');

        priceAndPurchase.appendChild(price);
        priceAndPurchase.appendChild(bookmarkIcon);

        itemElement.appendChild(imageContainer);
        itemElement.appendChild(titleElement);
        itemElement.appendChild(priceAndPurchase);

        libraryCase.appendChild(itemElement);

        itemElement.addEventListener('click', () => {
            localStorage.setItem("book_data_link", item.selfLink )
            window.location.href = "detailpage.html";
        });
    })
    for (let i = 0; i < totalPage; i++) {
      buttonGroup.innerHTML += `
      <button value=${i+1} class="bg-[#3E5CC8] py-2 px-3 m-2 text-white rounded-md hover:bg-[#3E5CC8] transition-all duration-200 text-sm lg:text-md" onclick="handleButtonClick(${i + 1})">${i + 1}</button>
    `;
    }
  })
  .catch(error => console.error("Error fetching data:", error));

})

