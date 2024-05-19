export const readFromAPI = async (apiURL) => {
    try {
        const response = await fetch(apiURL).then()
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const formatDate = (unformattedDate) => (
    new Date(unformattedDate).toLocaleDateString('en-us', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    })
)
