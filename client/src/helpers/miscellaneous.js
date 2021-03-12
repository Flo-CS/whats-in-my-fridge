function truncateString(str, size) {
    if (str.length <= size) return str;

    return str.slice(0, size) + "...";
}

export {truncateString};