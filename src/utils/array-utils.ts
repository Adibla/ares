function groupBy<K, V>(list: V[], keyGetter: (input: V) => K): Map<string, Array<V>> {
    const map = new Map();
    list.forEach((item: V) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
export {
    groupBy
}
