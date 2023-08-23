export interface PeoplesListDTO {
    results: PeopleItem[],
    count: number,
}
export interface PeopleItem {
    [key: string]: any;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    url: string;
    isFavorite?: boolean;
}