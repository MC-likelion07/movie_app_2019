import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    //console.log(movies.data.data.movies);
    //const {data:{data:{movies}}}
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    ); //
    console.log(movies);
    this.setState({ movies: movies, isLoading: false }); // state 안의 movies 배열 : axios로부터 가져온 movies 정보
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state; // state로 부터 isLoading값을 가져온다. movies from the state
    return (
      <section className="container">
        <div>
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : (
            <div className="movies">
              {movies.map(movie => (  
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default App;
