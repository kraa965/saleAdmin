export const handleFilter = (query, list) => {
    const result = list.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return result;
}

export const handleFilterManager = (query, list) => {
    const result = list.filter(el => el.name.concat(el.surname).toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return result;
}
