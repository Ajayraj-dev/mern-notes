export const GetInitial = (name) => {
    if (!name) return null

    const words = name.split(' ')
    let initials = ''

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        if (words.length <= 1) {
            initials += words[i].slice(0, 2)
        } else {
            initials += words[i][0]
        }
    }

    return initials.toUpperCase()
}