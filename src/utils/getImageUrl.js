const getImageUrl = (name, index = 0) => {
    if (name !== undefined) {
        let newName = encodeURIComponent(name);
        return `${import.meta.env.VITE_FILE_URL}/${newName}${index}.jpg`;
    }
};

export default getImageUrl;