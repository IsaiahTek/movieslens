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
    genre_ids:number[]|undefined,
    genres:{id:number, name:string}[] | undefined
}
type MovieTypes = "UPCOMING" | "NOWPLAYING" | "POPULAR" | "TOPRATED" | "SIMILAR"

interface Video {
    "iso_639_1": string,
    "iso_3166_1": string,
    "name": string,
    "key": string,
    "site": string,
    "size": number,
    "type": string,
    "official": boolean,
    "published_at": string,
    "id": string
}
interface ApiCollectionType{
    dates: { maximum: string, minimum: string } | undefined,
    page: number,
    results:Video[] | Movie[],
    total_pages: number,
    total_results: number
}
interface MoviesApiType extends ApiCollectionType {
    results: Movie[]
}
interface VideosApiType extends ApiCollectionType{
    results: Video[]
}
type PageType = {
    page:number,
    movies:Movie[],
    dates: { maximum: string, minimum: string } | undefined,
}
interface PaginatedMoviesType{
    pages: PageType[],
    total_pages: number,
    total_results: number
}