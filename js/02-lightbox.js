import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryTemplate = ({ preview, original, description }) => `
    <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}"/>
    </a>`;

const refs = {
  gallery: document.querySelector(".gallery"),
};

const galleryRender = () => {
  const galleryMarkup = galleryItems
    .map((galleryItem) => galleryTemplate(galleryItem))
    .join("");

  refs.gallery.innerHTML = "";
  refs.gallery.insertAdjacentHTML("beforeend", galleryMarkup);
};

galleryRender();

new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const handleItemClick = (event) => {
  if (event.target === event.currentTarget) return;
};

refs.gallery.addEventListener("click", handleItemClick);
