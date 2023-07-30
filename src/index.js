import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const refs = {
  select: document.querySelector('.breed-select'),
  pLoader: document.querySelector('.loader'),
  pError: document.querySelector('.error'),
  divInfo: document.querySelector('.cat-info'),
};

// const select = document.querySelector('.breed-select');
// const pLoader = document.querySelector('.breed-select');
// const pError = document.querySelector('.breed-select');
// const divInfo = document.querySelector('.breed-select');

// 1. Ховаємо селектор ++
// 2. викликаємо фетч + зен, в яких:   ++
// 2.1 ховаємо лоадер, відображаємо селектор ++
// 3. робимо розмітку селектору й вставляємо її ++
// 4. створюємо кетч ++
// 5. накидуємо слухача подій на селектор на подію інпута ++
// 5.1 виводимо лоадер ++
// 5.2 перевіряємо чи відмальований вже кіт, якщо відмальований - прибираємо ++
// 5.3 створююємо option й визначаємо його як обране значення
// const option = breedSelect.options[breedSelect.selectedIndex].value;
// 5.4 викликаємо fetchCatByBreed(option) + then, в якому ховаємо лоадер
// 5.5 створюємо шаблон розмітки й викликаємо її в дів
// 5.6 створюємо кетч

// const markup = cats.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
// =========================================================

// const select = document.querySelector('.breed-select');

refs.select.style.display = 'none';
fetchBreeds()
  .then(cats => {
    refs.pLoader.style.display = 'none';
    refs.select.style.display = 'block';

    const markup = cats
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    refs.select.insertAdjacentHTML('beforeend', markup);
  })
  .catch(() =>
    Notify.failure('Oops! Something went wrong! Try reloading the page!')
  );

refs.select.addEventListener('input', e => {
  refs.pLoader.style.display = 'block';

  const isCardDrawn = document.querySelector('.cat-card');
  if (isCardDrawn) isCardDrawn.remove();

  const option = refs.select.options[refs.select.selectedIndex].value;
  fetchCatByBreed(option)
    .then(cats => {
      refs.pLoader.style.display = 'none';

      const markup = cats
        .map(
          cat =>
            `<div class="cat-card">
                    <img src="${cat.url}" width="360" />
                    <div class="info">
                        <h1>${cat.breeds[0].name}</h1>
                        <p>${cat.breeds[0].description}</p>
                        <p><b>Temperament: </b>${cat.breeds[0].temperament}</p>
                    </div>
                </div>`
        )
        .join('');
      refs.divInfo.insertAdjacentHTML('beforeend', markup);
    })
    .catch(() =>
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
    );
});
