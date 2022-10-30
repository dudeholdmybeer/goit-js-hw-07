// 1 - Импорт галереи из внешнего файлa JS
import { galleryItems } from "./gallery-items.js";

// 2 - Функция создания разметки при помощи метода шаблонной строки
const galleryTemplate = ({ preview, original, description }) => `
<div class="gallery__item">
    <a class="gallery__link" href="${original}" onclick="event.preventDefault()">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"/>
    </a>
</div>`;

// 3 - Ссылка DOM узел контейнера галереи в разметке
const refs = {
  gallery: document.querySelector(".gallery"),
};

// 4 - Функция рендера галереи
const galleryRender = () => {
  const galleryMarkup = galleryItems
    .map((galleryItem) => galleryTemplate(galleryItem))
    .join("");

  refs.gallery.innerHTML = "";
  refs.gallery.insertAdjacentHTML("beforeend", galleryMarkup);
};

galleryRender();

// 7 - Открытие модального окна
const viewItem = (originalImage) => {
  const instance = basicLightbox.create(`
  <div class="modal">
  <img
  src="${originalImage}"
  alt="${parent.alt}"/>
  </div>
  `);

  instance.show();

  // var lightbox = new SimpleLightbox('.gallery a', { /* options */ });

  // 8 - Закрытие модального окна (клавиша ESC)

  window.addEventListener("keydown", onEscKeyPress);

  function onEscKeyPress(evt) {
    if (evt.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", onEscKeyPress);
    }
  }
};

// 6 - Колбек для обработчика события
const handleItemClick = (event) => {
  if (event.target === event.currentTarget) return;

  const parent = event.target.closest("img");
  const originalImage = parent.dataset.source;

  viewItem(originalImage);
};

// 5 - Обработчик событий (делегируем все события на контейнер галереи)

refs.gallery.addEventListener("click", handleItemClick);
