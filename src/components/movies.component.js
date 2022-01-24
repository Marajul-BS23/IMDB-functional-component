import Table from "./common/table.component";
import Rating from "./rating.component";
import getMovies from "../service/get-movies.service";
import getGenres from "../service/get-genres.service";
import _ from "lodash";
import Pagination from "./common/pagination.component";
import Filter from "./common/filtering.component";
import { useState } from "react";
import { useEffect } from "react";

function Movies() {
    const [movies, setmovies] = useState([]);
    const [sortColumn, setsortColumn] = useState({ path: "id", order: "asc" });
    const [activePage, setactivePage] = useState(1);
    const [pageCount] = useState(5);
    const [genres, setgenres] = useState([]);
    const [selectedGenre, setselectedGenre] = useState("All Genres");
    // state = {
    //     movies: [],
    //     sortColumn: { path: "id", order: "asc" },
    //     activePage: 1,
    //     pageCount: 5,
    //     genres: [],
    //     selectedGenre: "All Genres",
    // };

    useEffect(() => {
        const movies = getMovies();
        const genres = ["All Genres", ...getGenres()];
        setmovies(movies);
        setgenres(genres);
    }, []);
    console.log(movies);

    const handleToggleRating = (movieRank) => {
        const movies_1 = [...movies];
        const movie = movies_1.find((movie) => movie.id === movieRank);
        movie.your_rating = !movie.your_rating;
        setmovies(movies);
    };

    const handleSort = (sortColumn) => {
        console.log(sortColumn);
        setsortColumn(sortColumn);
    };

    const handleClickPage = (activePage) => {
        setactivePage(activePage);
    };

    const handleClickFilter = (selectedGenre) => {
        setselectedGenre(selectedGenre);
    };

    const paginateMovies = (movies) => {
        const start = (activePage - 1) * pageCount;
        const paginatedMovies = movies.slice(start, start + pageCount);
        return paginatedMovies;
    };

    const filterMovies = () => {
        const filteredMovies = movies.filter((movie) => {
            if (selectedGenre === "All Genres") return true;

            if (movie.genres.includes(selectedGenre)) return true;
            return false;
        });
        return filteredMovies;
    };

    const sortMovies = (movies) => {
        const sortedMovies = _.orderBy(
            movies,
            [sortColumn.path],
            [sortColumn.order]
        );
        return sortedMovies;
    };
    const filteredMovies = filterMovies();
    const paginatedMovies = paginateMovies(filteredMovies);
    const movies_final = sortMovies(paginatedMovies);
    const columns = [
        {
            label: "Rank",
            path: "id",
            sorting: true,
            content: (movie, key) => <td>{movie[key]}</td>,
        },
        {
            label: "Title",
            path: "title",
            sorting: true,
            content: (movie, key) => <td>{movie[key]}</td>,
        },
        {
            label: "Poster",
            path: "posterUrl",
            content: (movie, key) => (
                <td>
                    <img
                        alt=""
                        src={movie[key]}
                        style={{ height: "100px", width: "auto" }}
                    />
                </td>
            ),
        },
        {
            label: "Your Rating",
            path: "your_rating",
            content: (movie, key) => (
                <td>
                    <Rating
                        isRated={movie[key]}
                        rank={movie.id}
                        handleToggleRating={handleToggleRating}
                    />
                </td>
            ),
        },
        {
            label: "Action",
            path: "action",
            content: (movie, key) => <td>{movie[key]}</td>,
        },
    ];

    return (
        <>
            <div className="container">
                <div className="row">
                    <Filter
                        items={genres}
                        selectedGenre={selectedGenre}
                        onClickFilter={handleClickFilter}
                    />
                    <div className="col-lg-8">
                        <Table
                            items={movies_final}
                            columns={columns}
                            onSort={handleSort}
                            sortColumn={sortColumn}
                        />
                        <Pagination
                            totalItems={filteredMovies.length}
                            pageCount={pageCount}
                            activePage={activePage}
                            onClickPage={handleClickPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Movies;
