const books = document.querySelector(".books");

let todoArray = []
let startIndex = 0;
const maxResults = 4;

//google_bookapi with userkey
const url = `https://www.googleapis.com/books/v1/volumes?q=superman&startIndex=${startIndex}&maxResults=${maxResults}&key=AIzaSyBnOWXlOT5bebhzCvnCxjT2ecAC8E9jZ4o`;

//fetching data from google_bookapi and insert into html
window.addEventListener("load", () => {
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
        books.innerHTML = ""
        todoArray = data.items
        todoArray.map(item => {
            const image = item.volumeInfo.imageLinks.thumbnail;
            const title = item.volumeInfo.title;

            const itemElement = document.createElement('div');
            itemElement.classList.add('item', 'w-[150px]', 'md:w-[200px]', 'bg-[#f2f3fc]', 'h-auto', 'flex', 'flex-col', 'items-center', 'justify-center', 'overflow-hidden', 'rounded-sm', 'shadow-sm', 'transition-all', 'duration-300', 'hover:shadow-lg', 'p-2', 'md:p-4');

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('w-full', 'h-[160px]', 'md:h-[200px]', 'bg-[#f2f3fc]', 'flex', 'items-center', 'justify-center');
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'books';
            img.classList.add('object-cover', 'w-[85%]', 'h-[90%]', 'md:w-[70%]', 'md:h-[80%]');
            imageContainer.appendChild(img);

            const titleElement = document.createElement('h3');
            titleElement.classList.add('mt-4', 'title', 'font-bold', 'text-md', 'text-start', 'no-wrap', 'text-ellipsis', 'overflow-hidden', 'w-[90%]');
            titleElement.textContent = title;

            const readNow = document.createElement('button');
            readNow.classList.add('hover:bg-[#3E5CC8]', 'text-[#203377]', 'hover:text-white', 'border', 'border-[#3E5CC8]', 'duration-300', 'md:px-4', 'md:py-2', 'px-3', 'py-1', 'mt-6')
            readNow.textContent = "Read Now";


            itemElement.appendChild(imageContainer);
            itemElement.appendChild(titleElement);
            itemElement.appendChild(readNow)

            books.appendChild(itemElement);

            itemElement.addEventListener('click', () => {
                localStorage.setItem("book_data_link", item.selfLink )
                window.location.href = "pages/detailpage.html";
            });
        })
    })

})