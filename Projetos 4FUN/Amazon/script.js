
const images = ['assets/main-product.jpg', 'assets/thumb1.jpg', 'assets/thumb2.jpg', 'assets/thumb3.jpg'];
let currentIndex = 0;
const carouselImage = document.querySelector('#carousel-image');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    carouselImage.src = images[currentIndex];
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    carouselImage.src = images[currentIndex];
});

const thumbnails = document.querySelectorAll('.thumbnail');
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        carouselImage.src = images[index];
    });
});


let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartButton = document.querySelector('.cart-button');
cartButton.textContent = `Cart (${cartItems.length})`;

document.querySelector('.add-to-cart').addEventListener('click', () => {
    const product = {
        name: 'Product Title',
        price: 99.99,
        quantity: 1,
    };
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartButton.textContent = `Cart (${cartItems.length})`;
});


const hamburgerMenu = document.querySelector('.hamburger-menu');
hamburgerMenu.addEventListener('click', () => {
    alert('Hamburger menu clicked');
});

