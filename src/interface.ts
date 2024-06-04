interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path:string;
    vote_average:number;
    vote_count:number;
    release_date:string;
    original_language:string;
    backdrop_path:string;
    genre_ids:number[]
}
type MovieTypes = "UPCOMING" | "NOWPLAYING" | "POPULAR" | "TOPRATED" | "SIMILAR"