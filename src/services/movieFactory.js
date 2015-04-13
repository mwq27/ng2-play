export default class movieFactory {
    movieList: array;
    constructor() {
        this.movieList = [];
    }

    getMovies() {
        return fetch('../movies.json')
            .then((res) => {
                return res.json();
            })
            .then(json => {
                return json;
            });
    }
}