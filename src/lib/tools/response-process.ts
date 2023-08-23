import { PeopleItem } from "../../api/interfaces";
import useLocalStorage from '../../lib/hooks/useLocalStorage';

export const isFavoriteItem = ({ url }: PeopleItem): boolean => {
    const { getItems } = useLocalStorage<PeopleItem>('favorite_list');
    return getItems().filter(localStorageItem => url === localStorageItem.url).length > 0
}