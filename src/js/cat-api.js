const API_KEY =
  'live_PMwSu4UGH0FelmLd8JnwjtRE0MyKKUGOl6jORTWQ1hFX4IuUytq5ShWhOMEFPt6B';

const fetchBreeds = () => {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`).then(
    response => response.json()
  );
};

const fetchCatByBreed = id => {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${id}`
  ).then(response => response.json());
};

export { fetchBreeds, fetchCatByBreed };
