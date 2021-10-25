import { ReactNode } from "react";

export interface Movie { 
    id: string,
    rank: string
    title: string,
    year: string,
    image: string,
    imdbRating: string,
    imdbRatingCount: string,
}

export interface MovieList {
    movies: Movie[]
}

export interface YearFilter {
    year: string,
}
