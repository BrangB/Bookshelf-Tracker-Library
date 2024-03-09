import { apikey } from "./key.js";

const libraryCase = document.querySelector(".libraryCase");
const menubar = document.querySelector(".menubar");
const closeMenu = document.querySelector(".fa-x");
const smallMenu = document.querySelector(".smallMenu");
const mainbody = document.querySelector(".mainbody");
const newReleased = document.querySelector(".newReleased");

let todoArray = []

let startIndex = 0;
const maxResults = 10;

window.addEventListener("load", () => {
  const recommendedBookUrl = `https://www.googleapis.com/books/v1/volumes?q=${"superman"}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apikey}`;
    
        fetch(recommendedBookUrl)
          .then(response => {
            return response.json();
          })
          .then(data => {
            todoArray = data.items
            console.log(todoArray)
            startIndex += maxResults;
            libraryCase.innerHTML = "";
            const specific_values = [2000, 3000, 5000, 6000, 9000, 8000, 15000, 20000, 16000, 10000];
            todoArray.map(item => {
              const image = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';
                const title = item.volumeInfo.title;
                const random_index = Math.floor(Math.random() * specific_values.length);

                const itemElement = document.createElement('div');
                itemElement.classList.add('item', 'w-[150px]', 'md:w-[170px]', 'bg-white', 'h-auto', 'flex', 'flex-col', 'items-start', 'justify-start', 'overflow-hidden', 'rounded-md', 'transition-all', 'duration-200', 'shadow-md', 'hover:shadow-lg', 'p-2');

                const imageContainer = document.createElement('div');
                imageContainer.classList.add('w-full', 'h-[200px]', 'bg-[#F5F5F5]', 'flex', 'items-center', 'justify-center');
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
                    console.log('Clicked item:', item.selfLink);
                    localStorage.setItem("book_data_link", item.selfLink )
                    window.location.href = "detailpage.html";
                });
            })
              
          
          })
          .catch(error => console.error("Error fetching data:", error));
})

window.addEventListener("load", () => {
  const newReleasedUrl = `https://www.googleapis.com/books/v1/volumes?q=${"batman"}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apikey}`;
    
        fetch(newReleasedUrl)
          .then(response => {
            return response.json();
          })
          .then(data => {
            todoArray = data.items
            startIndex += maxResults;
            newReleased.innerHTML = "";
            const specific_values = [2000, 3000, 5000, 6000, 9000, 8000, 15000, 20000, 16000, 10000];
            todoArray.map(item => {
              const image = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';
                const title = item.volumeInfo.title;
                const random_index = Math.floor(Math.random() * specific_values.length);

                const itemElement = document.createElement('div');
                itemElement.classList.add('item', 'w-[150px]', 'md:w-[170px]', 'bg-white', 'h-auto', 'flex', 'flex-col', 'items-start', 'justify-start', 'overflow-hidden', 'rounded-md', 'transition-all', 'duration-200', 'shadow-md', 'hover:shadow-lg', 'p-2');

                const imageContainer = document.createElement('div');
                imageContainer.classList.add('w-full', 'h-[200px]', 'bg-[#F5F5F5]', 'flex', 'items-center', 'justify-center');
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

                newReleased.appendChild(itemElement);

                itemElement.addEventListener('click', () => {
                    console.log('Clicked item:', item.selfLink);
                    localStorage.setItem("book_data_link", item.selfLink )
                    window.location.href = "detailpage.html";
                });
            })
          })
          .catch(error => console.error("Error fetching data:", error));
})

//open and close small navbar
menubar.addEventListener("click", () => {
  smallMenu.style.transform = "translateX(0)"
  mainbody.classList.toggle("overflow-hidden")
})

closeMenu.addEventListener("click", () => {
  smallMenu.style.transform = "translateX(-100%)"
  mainbody.classList.toggle("overflow-hidden")
})