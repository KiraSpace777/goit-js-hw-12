// ============ 1. Імпорт бібліотек ================//
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// ============ 2. Глобальні змінні ================//
const galleryContainer = document.querySelector('.gallery');
const loaderOverlay = document.querySelector('.loader-overlay');
const loadMoreBtn = document.querySelector('.load-more'); // Нова кнопка

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

/**
 * createGallery(images) - Створює та оновлює розмітку галереї.
 *
 * Функція використовується як для початкового рендерингу, так і для додавання нових зображень до існуючого списку. Масив об'єктів зображень отримуємо з бібліотеки Pixabay API
 */

export function createGallery(images) {
  // ПЕРЕВІРКА: якщо контейнера немає, просто виходимо з функції
  if (!galleryContainer) return;

  // Використовуємо деструктуризацію параметрів об'єкта image для читабельності
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-card">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
      <div class="card-info">
        <div class="info-block"><span class="info-label">Likes</span><span class="info-value">${likes}</span></div>
        <div class="info-block"><span class="info-label">Views</span><span class="info-value">${views}</span></div>
        <div class="info-block"><span class="info-label">Comments</span><span class="info-value">${comments}</span></div>
        <div class="info-block"><span class="info-label">Downloads</span><span class="info-value">${downloads}</span></div>
      </div>
    </li>`
    )
    .join('');

  // Вставляємо в DOM і оновлюємо лайтбокс
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  // Відсутній return! Функція просто виконала роботу.
}

export function clearGallery() {
  if (galleryContainer) {
    galleryContainer.innerHTML = '';
  }
}

//  Керування анімацією "Loader" (відобразити / приховати)
export function showLoader() {
  if (loaderOverlay) loaderOverlay.classList.add('is-active');
}

export function hideLoader() {
  if (loaderOverlay) loaderOverlay.classList.remove('is-active');
}

//  Керування кнопкою "Load more"
export function showLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('is-hidden');
  }
}
// ========================================================
// Для організації коду використовуй модульність та синтаксис export/import.
//
//У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:
// -----------------------------
// createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
// clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
// showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
// hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
// showLoadMoreButton(). Ця функція нічого не приймає, повинна додавати клас для відображення кнопки Load more. Нічого не повертає.
// hideLoadMoreButton(). Ця функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more. Нічого не повертає.
//

// ------------------------------------------------------------------------------
//  ================ Завдання -4— Галерея і картки зображень  ==================
// ------------------------------------------------------------------------------
// Елемент галереї (список однотипних елементів <ul class=”gallery”>) уже має бути в HTML-документі. Після виконання HTTP-запитів у нього потрібно додавати розмітку карток зображень.
// -------------------------------
// Кожне зображення описується об'єктом, з якого тебе цікавлять лише такі властивості:
// -------------------------------
// webformatURL — посилання на маленьке зображення для списку карток у галереї
// largeImageURL — посилання на велике зображення для модального вікна
// tags — рядок з описом зображення. Підійде для атрибута alt
// likes — кількість вподобайок
// views — кількість переглядів
// comments — кількість коментарів
// downloads — кількість завантажень
// -------------------------------
// Перед пошуком за новим ключовим словом необхідно повністю очищати вміст галереї, щоб не змішувати результати запитів.
//
// -----------------------------------------------------------------------------
//  ================ Завдання --5-- Бібліотека SimpleLightbox  ===================
// -----------------------------------------------------------------------------
// Додай відображення великої версії зображення з бібліотекою SimpleLightbox для повноцінної галереї.
// https://github.com/andreknieriem/simplelightbox
//
// Щоб підключити CSS-код бібліотеки до проєкту, необхідно додати ще один імпорт, окрім того, що описаний у документації.
// -------------------------------
// // Описаний у документації
// import SimpleLightbox from "simplelightbox";
// // Додатковий імпорт стилів
// import "simplelightbox/dist/simple-lightbox.min.css";
// -------------------------------
// У розмітці необхідно буде обгорнути кожну картку зображення в посилання, як зазначено в документації в секції Markup.
// https://github.com/andreknieriem/simplelightbox#markup
//
// Бібліотека містить метод refresh(), який обов'язково потрібно викликати щоразу після додавання нових елементів до галереї.
// https://github.com/andreknieriem/simplelightbox#public-methods
//
// Робота модального вікна пов'язана з самою галереєю, тому використання бібліотеки SimpleLightbox і методу екземпляру refresh() буде доцільним у файлі render-functions.js.
//
/**
  |=======================================
  | IMPORT/EXPORT VIA ECMAScript Modules (ESM)
  |=======================================
*/
// ---------------------------------
// ECMAScript Modules (ESM) — сучасний стандарт системи модулів JavaScript, який відповідає за організацію та уніфікований підхід до імпорту та експорту даних між різними файлами в проєкті.
// ---------------------------------/named/ ---------------------------------
// Іменований експорт (named export) — це спосіб експортування одного або кількох значень з модуля під конкретними іменами.
// ---------------------------------
// За допомогою іменованого експорту можна отримати доступ до будь-якого значення: змінної, функції або об'єкта тощо під певним ім'ям. Пізніше ці значення можна імпортувати в іншому файлі за допомогою цього самого імені.
// --------------------------------------
// **************/export/**************/
// Операція іменованого експорту реалізована конструкцією з export.
// Ось так виглядає синтаксис для іменованого експорту.
// ----------------
// export const makeMessage = username => {
// 	return `Welcome, ${username}!`;
// };
// ----------------
// export const levels = ["easy", "medium", "hard"];
// ------------------------------------------
// Зверни увагу! Кількість іменованих експортів в одному модулі не обмежена, на відміну від експорту за замовчуванням, який може бути тільки один.
// --------------------------------------
//**************/ import /**************/
// Операція іменованого імпорту реалізована конструкцією з import.
// ----------------
// import { name } from "..."
// ----------------
// У будь-якому іншому файлі проєкту можна імпортувати конкретні елементи з іншого файлу (модуля), використовуючи їх імена в конструкції іменованого імпорту.
// ----------------
// import { makeMessage, levels } from "./makeMessage";
// console.log(makeMessage("Jacob")); // "Welcom, Jacob!"
// console.log(levels); // ["easy", "medium", "hard"]
// ------------------------------------------
// Зверни увагу, що при імпорті ми вказуємо конкретні імена, які були використані при експорті. Це дозволяє точно вказати, які значення ми хочемо імпортувати з модуля.
