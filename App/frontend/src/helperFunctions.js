export const readFromAPI = async (apiURL) => {
    try {
        const response = await fetch(apiURL)
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export const writeToAPI = async ({
    apiURL,
    method,
    data,
}) => {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    try {
        const response = await fetch(apiURL, config)
        return await response.json()
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

// reducer to update react state
export const updateField = (e, setState) => {
    const { target } = e
    const { name, value } = target

    setState((prevState) => ({
        ...prevState,
        [name]: value,
    }))
}
