/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import { spyOn } from "jest-mock";
import FavoriteMovieIdb from "../src/scripts/data/favorite-movie-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Liking A Movie", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();

    spyOn(FavoriteMovieIdb, "searchMovies");
  });

  it("should show the like button when the movie has not been liked before", async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this movie"]')
    ).toBeTruthy();
  });

  it("should not show the unlike button when the movie has not been liked before", async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this movie"]')
    ).toBeFalsy();
  });

  it("should be able to like the movie", async () => {
    // document.body.innerHTML = '<div id="likeButtonContainer"></div>';

    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    // memastikan film berhasil disukai
    const movie = await FavoriteMovieIdb.getMovie(1);
    expect(movie).toEqual({ id: 1 });

    await FavoriteMovieIdb.deleteMovie(1);
  });

  it("should not add a movie again when its already liked", async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    // tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteMovieIdb.putMovie({ id: 1 });

    // simulasikan pengguna menekan tombol suka film
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    // Tidak ada film yang ganda
    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1 }]);

    await FavoriteMovieIdb.deleteMovie(1);
  });

  // Menggunakan metode xit, bukan it, untuk menonaktifkan sebuah test case
  it("should not add a movie to the when it has no id", async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({});

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
