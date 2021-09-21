export const checkMovie = (api, currentPage = "") =>
  fetch(api + currentPage).then((res) => res.json());
