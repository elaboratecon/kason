export const readFromAPI = async (apiURL) => {
    try {
        const response = await fetch(apiURL).then()
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}
