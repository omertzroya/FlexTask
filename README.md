
# Movie Explorer App

##
link -> https://flex-task-three.vercel.app

## Overview

Movie Explorer is a React-based web application that allows users to explore movies and TV shows. The app fetches movie and TV data from The Movie Database (TMDb) API, and provides features like viewing popular movies, airing-now TV shows, and adding movies to a personal favorites list. Users can navigate through the app using keyboard shortcuts, and the app stores favorites in localStorage for persistence.

## Features

- **Explore Movies and TV Shows**: Browse popular movies and TV shows airing today.
- **Favorites List**: Add/remove movies from your favorites list. Favorites are stored in localStorage to persist across sessions.
- **Keyboard Navigation**: The app supports keyboard navigation, allowing users to browse movies and pages with arrow keys, select a movie with the Enter key, and reset selection with the Escape key.
- **Pagination**: Navigate through movie listings with previous/next buttons.
- **Responsive Design**: Works across devices with a responsive layout.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Axios**: HTTP client for making API requests to TMDb.
- **TMDb API**: The Movie Database API to fetch movie and TV show data.
- **CSS**: Custom styles for the app layout.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/movie-explorer.git
   ```

2. Install the dependencies:

   ```bash
   cd movie-explorer
   npm install
   ```

3. Start the app:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Browse Movies**: Select the "Popular" button to view the latest popular movies.
2. **Browse Airing TV Shows**: Select the "Airing Now" button to view TV shows currently airing.
3. **View Favorites**: Select the "My Favorites" button to see movies added to your favorites list.
4. **Add to Favorites**: Click the "Add to Favorites" button next to a movie to add it to your favorites. The button text will change to "Remove from Favorites" if the movie is already in the list.
5. **Keyboard Navigation**:
   - **Arrow Up / Arrow Down**: Navigate through movie selections.
   - **Arrow Right**: Go to the next page of movies (not available on the Favorites page).
   - **Arrow Left**: Go to the previous page of movies (not available on the Favorites page).
   - **Enter**: View more details for the selected movie.
   - **Escape**: Reset the movie selection.

## API Integration

The app uses the [TMDb API](https://www.themoviedb.org/documentation/api) to fetch movie and TV show data. You can get your own API key from TMDb by registering an account and creating an API key.

To integrate your own API key:

1. Replace the current API key in the code with your own key (found in the `Authorization` header inside `PopularMovies.js`).

## Contribution

If you'd like to contribute to the project, feel free to fork the repository, make changes, and submit a pull request. Please make sure to follow the coding style and write clear commit messages.


---

Feel free to modify or expand this README according to any additional features or details you’d like to include!
