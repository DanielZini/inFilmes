import axios from 'axios';
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

// usado para ordenar os filmes por data
export const compare = (a, b) => {
  if (a.Year < b.Year) {
    return -1;
  }
  if (a.Year > b.Year) {
    return 1;
  }
  return 0;
}

//lista filmes por titulo
export const listMoviesByTitle = async (movieTitle) => {
  let result = []

  for (const [index, item] of movieTitle.entries()) {

    let titleSearch = item.toLowerCase().replace(" ", "+");

    try {
      const { data } = await axios(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${titleSearch}&type=movie`);

      const infos = [];

      infos['title'] = item;
      infos['movies'] = data['Search'].sort(compare);

      result.push(infos);

    } catch (error) {
      console.log(error);
    }
  }

  return result;
}

//lista filmes por titulo na busca
export const searchMoviesByTitle = async (movieTitle) => {
  let result = []

  let titleSearch = movieTitle.toLowerCase().replace(" ", "+");

  try {
    const { data } = await axios(`http://www.omdbapi.com/?apikey=a10c59bc&s=${titleSearch}&type=movie`);

    result = data['Search'].sort(compare);

    return result;

  } catch (error) {
    console.log(error);
  }
}