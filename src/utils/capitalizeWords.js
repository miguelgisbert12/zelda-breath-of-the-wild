function capitalizeWords(text) {

    return text
        .split(' ')
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
}

export default capitalizeWords