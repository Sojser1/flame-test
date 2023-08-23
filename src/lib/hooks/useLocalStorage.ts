const useLocalStorage = <T>(key: string) => {
    const getItems = (): T[] => {
        const localStorageData = JSON.parse(localStorage.getItem(key) ?? '""');

        return localStorageData || [] as T[];
    }

    const setItems = (items: T[]): void => {
        localStorage.setItem(key, JSON.stringify(items));
    }

    return {
        getItems,
        setItems,
    }
}


export default useLocalStorage;