let addBtn = document.getElementById('addBtn');
let sidebar = document.getElementById('sidebar');
let span = document.getElementById('span');
//Book Class
class Book {
    constructor(bookName, author, imgUrl, price, pubDate, bookDes, isbn) {
        this.bookName = bookName,
            this.author = author,
            this.imgUrl = imgUrl,
            this.price = price,
            this.pubDate = pubDate,
            this.bookDes = bookDes,
            this.isbn = isbn

    }
}
//UI Class

class UI {
    static displayBooks() {



        // const StoredBooks = [{

        //         bookName: 'Code Your Own Games!: 20 Games to Create with Scratch',
        //         author: 'Max Wainewright',
        //         imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61P07hjuZwL._SX384_BO1,204,203,200_.jpg',
        //         price: '11',
        //         pubDate: '03-07-2017',
        //         bookDes: 'Calling all creative young gamers! With its easy-to-follow, illustrated step-by-step instructions, this book will teach you key concepts—like drawing shapes—so you can code your own games. By the end, any kid will be able to make 20 popular games, from Snake to Brick Bouncer.',
        //         isbn: '1454923318'

        //     },
        //     {
        //         bookName: 'Eloquent JavaScript, 3rd Edition: A Modern Introduction to Programming',
        //         author: 'Marijn Haverbeke',
        //         imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/51-5ZXYtcML._SX377_BO1,204,203,200_.jpg',
        //         price: '27',
        //         pubDate: '12-04-2018',
        //         bookDes: 'JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
        //         isbn: '1593279507'
        //     },
        //     {
        //         bookName: 'HTML and CSS: Design and Build Websites',
        //         author: 'Jon Duckett ',
        //         imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41p7u2kJACL._SX396_BO1,204,203,200_.jpg',
        //         price: '25',
        //         pubDate: '11-08-2011',
        //         bookDes: 'Every day, more and more people want to learn some HTML and CSS. Joining the professional web designers and programmers are new audiences who need to know a little bit of code at work (update a content management system or e-commerce store) and those who want to make their personal blogs more attractive.',
        //         isbn: ' 1118008189'
        //     },
        //     {
        //         bookName: 'JavaScript and JQuery: Interactive Front-End Web Development',
        //         author: 'Jon Duckett ',
        //         imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41y31M-zcgL._SX400_BO1,204,203,200_.jpg',
        //         price: '30',
        //         pubDate: '12-04-2018',
        //         bookDes: 'This full-color book will show you how to make your websites more interactive and your interfaces more interesting and intuitive.',
        //         isbn: ' 9781118531648'
        //     },];

        // const books = StoredBooks;
        // localStorage.setItem('books',JSON.stringify(StoredBooks));
        // Store.addBook(StoredBooks)
        const books = Store.getBooks();


        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        // const list = document.querySelector('#book-list');
        const parent = document.querySelector('.main-body');
        // const row = document.createElement('tr');
        const divbook = document.createElement('div');
        divbook.classList.add('div-book');

        const bookImg = document.createElement('div');
        bookImg.classList.add('bookImg');
        let imgB = document.createElement('img');
        imgB.src = book.imgUrl;

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
        bookInfo.innerHTML = `
        <div class="bookName">
                <h3>${book.bookName}</h3>
            </div>
            <div class="bookAuthor">
                <p> By : <strong>${book.author}</strong></p>
           </div>
           <div class="bookPrice">
    <p> Price : <strong>$${book.price}</strong></p>
           </div>
           <div class="bookDate">
           <p> Published : <strong>${book.pubDate}</strong></p>
       </div>
       <div class="bookIsbn">
               <p> ISBN : <strong>${book.isbn}</strong></p>
       </div>
        `;
        parent.appendChild(divbook);
        divbook.appendChild(bookImg);
        bookImg.appendChild(imgB);
        divbook.appendChild(bookInfo);
    };




    static clearFileds() {

        document.querySelector('#bookName').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#imgUrl').value = '';
        document.querySelector('#price').value = '';
        document.querySelector('#pubDate').value = '';
        document.querySelector('#bookDes').value = '';
        document.querySelector('#isbn').value = '';

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-from');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }
}

//Store Class

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') == null) {
            books = [];

        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }


}

//Events display book
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Events add book
document.getElementById('book-from').addEventListener('submit', (e) => {

    e.preventDefault();

    let bookName = document.querySelector('#bookName').value;
    let author = document.querySelector('#author').value;
    let imgUrl = document.querySelector('#imgUrl').value;
    let price = document.querySelector('#price').value;
    let pubDate = document.querySelector('#pubDate').value;
    let bookDes = document.querySelector('#bookDes').value;
    let isbn = document.querySelector('#isbn').value;

    if (bookName == '' || author == '' || price == '' || pubDate == '' || bookDes == '' || isbn == '') {
        Swal.fire({
            type: 'error',
            title: 'Empty fields are not allowed',
            showConfirmButton: true,
            timer: 1500
        })
    } else {
        if (imgUrl == '') {
            imgUrl = 'https://www.jetstereo.com/images/no_image.png';
        }
        const book = new Book(bookName, author, imgUrl, price, pubDate, bookDes, isbn)

        Store.addBook(book);
        //Addto UI
        UI.addBookToList(book);

       

        //clear flieds
        UI.clearFileds();
        Swal.fire({
            type: 'success',
            title: 'New book has been saved',
            showConfirmButton: false,
            timer: 1500
        })
        sidebar.style.right = '-310px';
    };



});





addBtn.onclick = (ev) => {
    sidebar.style.right = '0';
    document.body.style.overflow = "hidden";

}
span.onclick = (ev) => {
    sidebar.style.right = '-310px';
    document.body.style.overflow = "scroll";

}