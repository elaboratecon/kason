// Code Based on Starter Code accessed 5/24/2024
// by Devin Daniels and Zachary Maes under the supervision of Dr. Michael Curry and Dr. Danielle Safonte
// https://github.com/osu-cs340-ecampus/react-starter-app

export const readFromAPI = async (apiURL) => {
    try {
        const response = await fetch(apiURL)
        const data = await response.json()
        return data
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
        if (response.status === 204){
            return  }
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

export const formatDateForDateInput = (date) => {
    return date.substring(0, 10)
}

// reducer to update react state
export const updateField = (e, setState) => {
    const { target } = e
    const { name, value } = target

    setState((prevState) => ({
        ...prevState,
        [name]: value,
    }))
}

export const updateDropdown = (e, setState) => {
    const { target } = e
    const { name, value } = target
    const valueInt = value === 'null' ? null : Number(value)

    setState((prevState) => ({
        ...prevState,
        [name]: valueInt,
    }))
}
