import api from "./api";

// usado para ordenar os filmes por data
export const compare = (a, b) => {
  if (a.Year < b.Year) {
    return -1;
  }
  if (a.Year > b.Year) {
    return 1;
  }
  return 0;
};

//lista filmes por titulo
export const listMoviesByTitle = async (movieTitle, movieYear, search) => {
  let result = [];

  for (const [, item] of movieTitle.entries()) {
    let titleSearch = item.toLowerCase().replace(" ", "+");

    try {
      const { data } = await api.get("", {
        params: {
          s: titleSearch,
          y: movieYear
        }
      });

      const infos = [];

      infos["title"] = item;
      infos["subTitle"] = search ? "Search for:" : "Collection";
      infos["movies"] = data["Search"].sort(compare);

      result.push(infos);
    } catch (error) {
      console.log(error);
    }
  }

  return result;
};

//lista filmes por id
export const listMoviesById = async id => {
  try {
    const { data } = await api.get("", {
      params: {
        i: id,
        plot: "full"
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
