
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movie_stars').del()
    .then(function () {
      // Inserts seed entries
      return knex('movie_stars').insert([
        {movie_id: 1, star_id: 1},
        {movie_id: 1, star_id: 2},
        {movie_id: 1, star_id: 3},
        {movie_id: 2, star_id: 4},
        {movie_id: 2, star_id: 5},
        {movie_id: 2, star_id: 6},
        {movie_id: 3, star_id: 7},
        {movie_id: 3, star_id: 8},
        {movie_id: 3, star_id: 9},
        {movie_id: 4, star_id: 10},
        {movie_id: 4, star_id: 11},
        {movie_id: 4, star_id: 12},
        {movie_id: 5, star_id: 13},
        {movie_id: 5, star_id: 14},
        {movie_id: 5, star_id: 15},
        {movie_id: 6, star_id: 16},
        {movie_id: 6, star_id: 17},
        {movie_id: 6, star_id: 18},
      ]);
    });
};
