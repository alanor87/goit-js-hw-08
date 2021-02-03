import images from "./gallery-items.js";

let imgIndex;
const galleryParentRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.lightbox');
const modalCloseBtnRef = modalRef.querySelector('button[data-action="close-lightbox"]');
const lightboxImgRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

function renderGalleryHandler(images) {
    const imagesArray = images.map((element, index) => {
        return `<li class="gallery__item"><a class="gallery__link" href="${element.original}">
            <img
                class="gallery__image" src="${element.preview}"
                data-source="${element.original}"
                data-index="${index}"
                alt="${element.description}"
            />
        </a>
    </li>`
    });
    galleryParentRef.insertAdjacentHTML('beforeend', imagesArray.join(''));
}

function lightboxOpenHandler(event) {
    if (event.target.nodeName !== 'IMG') return;
    const imgSource = event.target.dataset.source;
    const imgAlt = event.target.alt;
    imgIndex = Number(event.target.dataset.index);
    event.preventDefault();
    modalRef.classList.add('is-open');
    lightboxImgRef.src = imgSource;
    lightboxImgRef.dataset.index = imgIndex;
    lightboxImgRef.alt = imgAlt;
    window.addEventListener('keydown', lightboxKeypressHandler);
}

function lightboxCloseHandler(event) {
    if (event.target !== event.currentTarget) return;
    window.removeEventListener('keydown', lightboxKeypressHandler);
    modalRef.classList.remove('is-open');
    lightboxImgRef.src = '';
}

function arrowClickHandler(indexShift) {
    const nextImgIndex = imgIndex + indexShift;
    console.log(nextImgIndex);
    if (nextImgIndex !== -1 && nextImgIndex < images.length) {
        const nextImg = images[nextImgIndex];
        lightboxImgRef.src = nextImg.original;
        lightboxImgRef.alt = nextImg.description;
        imgIndex = nextImgIndex;
    }
}

function lightboxKeypressHandler(event) {
    const key = event.code;
    switch (key) {

        case 'Escape': lightboxCloseHandler();
            break;
        case 'ArrowRight':
            arrowClickHandler(1);
            break;
        case 'ArrowLeft':
            arrowClickHandler(-1);
            break;

        default: return;
    }
}

renderGalleryHandler(images);
galleryParentRef.addEventListener('click', lightboxOpenHandler);
lightboxOverlayRef.addEventListener('click', lightboxCloseHandler);
modalCloseBtnRef.addEventListener('click', lightboxCloseHandler); 