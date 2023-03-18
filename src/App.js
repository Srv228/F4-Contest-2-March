import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import MovieList from './Components/MovieList';
import GenreFilter from './Components/GenreFilter';
import "./Components/style.css"


const movies = [
  { title: 'The Shawshank Redemption', genre: 'Drama', year: 1994 },
  { title: 'The Godfather', genre: 'Crime', year: 1972 },
  { title: 'The Dark Knight', genre: 'Action', year: 2008 },
  { title: '12 Angry Men', genre: 'Drama', year: 1957 },
  { title: "Schindler's List", genre: 'Drama', year: 1993 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    genre: 'Fantasy',
    year: 2003
  },
  { title: 'The Good, the Bad and the Ugly', genre: 'Western', year: 1966 },
  { title: 'Forrest Gump', genre: 'Drama', year: 1994 },
  { title: 'Inception', genre: 'Science Fiction', year: 2010 },
  { title: 'The Matrix', genre: 'Science Fiction', year: 1999 },
  { title: 'The Silence of the Lambs', genre: 'Thriller', year: 1991 },
  { title: 'Saving Private Ryan', genre: 'War', year: 1998 },
  { title: 'Jurassic Park', genre: 'Science Fiction', year: 1993 },
  { title: 'Terminator 2: Judgment Day', genre: 'Science Fiction', year: 1991 },
  { title: 'The Lion King', genre: 'Animation', year: 1994 }
];

const genres = [
  'Drama',
  'Crime',
  'Action',
  'Fantasy',
  'Western',
  'Science Fiction',
  'Thriller',
  'War',
  'Animation'
];

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreSelect = (genre) => {
    console.log(`Selected genre: ${genre}`);
    setSelectedGenre(genre);
  };

  const filteredMovies =
    selectedGenre === ''
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  return (
    <div className="App">
      <GenreFilter genres={genres} onGenreSelect={handleGenreSelect} />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;
