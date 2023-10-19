/* eslint-disable no-new */
/* eslint-disable quotes */
import FavoriteMovieIdb from "../../data/favorite-movie-idb";
import FavoriteMovieSearchPresenter from "./liked-movie/favorite-movie-search-presenter";
import FavoriteMovieShowPresenter from "./liked-movie/favorite-movie-show-presenter";
import FavoriteMovieView from "./liked-movie/favorite-movie-view";

const view = new FavoriteMovieView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteMovieShowPresenter({ view, favoriteMovies: FavoriteMovieIdb });
    new FavoriteMovieSearchPresenter({
      view,
      favoriteMovies: FavoriteMovieIdb,
    });
  },
};

export default Like;
