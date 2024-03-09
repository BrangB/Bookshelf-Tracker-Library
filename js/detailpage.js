import { apikey } from "./key.js";

const menubar = document.querySelector(".menubar");
const closeMenu = document.querySelector(".fa-x");
const smallMenu = document.querySelector(".smallMenu");
const mainbody = document.querySelector(".mainbody");

//getting the bookdetail class to add item from js to html
const bookcover = document.querySelector(".bookcover");
const bookinfo = document.querySelector(".bookinfo");

//getting the recommendBook class
const recommendBook = document.querySelector(".recommendBook");

let booklink = localStorage.getItem("book_data_link")
let bookData;

window.addEventListener("load", () => {
  fetch(booklink)
  .then(res => {
      return res.json()
  })
  .then(data => {
      bookData = data;
      let bookCoverPhoto = bookData.volumeInfo.imageLinks && bookData.volumeInfo.imageLinks.large ? bookData.volumeInfo.imageLinks.large : "https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg";
      let description = bookData.volumeInfo.description;
      let shortDesc = "";
      
      const handleDescription = (param) => {
        const maxLength = 300;
        if(param.length > maxLength){
          shortDesc = param.slice(0, maxLength);
        }
      }
      handleDescription(description)
      console.log(bookData)
      
      // displaying the fetched data in HTML

      bookcover.innerHTML = `
        <img class="w-full h-full object-cover" src='${bookCoverPhoto}' alt="bookCoverPhoto">
      `
      bookinfo.innerHTML = `
        <h1 class="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 p-2">${bookData.volumeInfo.title}</h1>
        <div class="px-2">
          <h2 class="text-md lg:text-lg text-gray-700 p-2"> Author: ${bookData.volumeInfo.authors[0]} / Publisher: ${bookData.volumeInfo.publisher}</h2>
          <h2 class="text-md lg:text-lg text-gray-700 px-2"> Categories: ${bookData.volumeInfo.categories[0]} / ${bookData.volumeInfo.maturityRating}</h2>
          <p class="uppercase m-3 p-2 w-[60px] h-[35px] text-lg lg:text-xl bg-[#3E5CC8] text-white flex items-center justify-center">${bookData.volumeInfo.language}</p>
          <div class="lg:max-w-[600px] xl:max-w-[700px]"><p class="descriptionText p-2 text-md lg:text-[16px] text-[#383838]">${shortDesc} <span class="readmore text-[#3E5CC8] cursor-pointer">Read More...</span></p></div>
          <div class="flex flex-col md:flex-row gap-4 p-2 mt-5">
            <button class="py-3 px-3 lg:py-4 lg:px-5 lg:text-[16px] font-medium lg:font-normal uppercase hover:text-white hover:bg-[#3E5CC8] duration-200 text-sm border border-[#3E5CC8] ">Add List</button>
            <button class="py-3 px-3 lg:py-4 lg:px-5 lg:text-[16px] font-medium lg:font-normal uppercase text-sm border border-[#3E5CC8] bg-[#3E5CC8] text-white">Read Now</button>
          </div>
        </div>
      `

      //readmore or seeless description
      const readmore = document.querySelector(".readmore");
      const descriptionText = document.querySelector(".descriptionText")
      readmore.addEventListener("click", () => {
        descriptionText.innerHTML = `
          ${description} <span class="seeless text-[#3E5CC8] cursor-pointer">See less...</span>
        `
        const seeless = document.querySelector(".seeless");
        seeless.addEventListener('click', () => {
          descriptionText.innerHTML = `
          ${shortDesc} <span class="readmore text-[#3E5CC8] cursor-pointer">Read More...</span>
        `
        })
      })

  })
  .catch(err => {
      console.log(err)
  })
})

//fetching data to  display recommmended movies
let todoArray = []
let startIndex = 0;
const maxResults = 5;
window.addEventListener("load", () => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${"batman"}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apikey}`;
    
        fetch(url)
          .then(response => {
            return response.json();
          })
          .then(data => {
            todoArray = data.items
            startIndex += maxResults;
            recommendBook.innerHTML = "";
            todoArray.map(item => {
              const image = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';
                const title = item.volumeInfo.title;

                const itemElement = document.createElement('div');
                itemElement.classList.add('item', 'w-[150px]', 'md:w-[170px]', 'bg-white', 'h-auto', 'flex', 'flex-col', 'items-start', 'justify-start', 'overflow-hidden', 'rounded-md', 'transition-all', 'duration-200', 'hover:shadow-md', 'p-2');

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
                price.innerHTML = '20000 <span class="font-bold">MMK</span>';
                const bookmarkIcon = document.createElement('i');
                bookmarkIcon.classList.add('fa-regular', 'fa-bookmark', 'cursor-pointer', 'text-[#697988]');

                priceAndPurchase.appendChild(price);
                priceAndPurchase.appendChild(bookmarkIcon);

                itemElement.appendChild(imageContainer);
                itemElement.appendChild(titleElement);
                itemElement.appendChild(priceAndPurchase);

                recommendBook.appendChild(itemElement);

                itemElement.addEventListener('click', () => {
                    localStorage.setItem("book_data_link", item.selfLink )
                    window.location.href = "detailpage.html";
                });
            })

          })
          .catch(error => console.error("Error fetching data:", error));
})
  
//open or close small navbar
menubar.addEventListener("click", () => {
  smallMenu.style.transform = "translateX(0)"
  mainbody.classList.toggle("overflow-hidden")
})

closeMenu.addEventListener("click", () => {
  smallMenu.style.transform = "translateX(-100%)"
  mainbody.classList.toggle("overflow-hidden")
})

