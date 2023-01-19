import vars from './vars'

export async function generateURL(id, url, custom_url) {
    try {
        const res = await fetch(`${vars.host}shorten`, {
            method: "POST",
            body: JSON.stringify({ id, url, custom_url }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await res.json()

    } catch (err) {
        console.log(err)
    }
}

export async function removeURL(user_id, alias) {
    try {
        const res = await fetch(`${vars.host}remove/${user_id}/${alias}`, {
            method: "POST",
            body: JSON.stringify({ user_id, alias }),
            headers: {
                "Content-Type": "application/json",
            },
        })

    } catch (err) {
        console.log(err)
    }
}

export async function updateEvilURL(user_id, evil_url) {
    try {
        const res = await fetch(`${vars.host}evil/${user_id}`, {
            method: "PUT",
            body: JSON.stringify({ user_id, evil_url }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        return res
    } catch (err) {
        console.log(err)
    }
}

export async function toggleEvilMode(user_id) {
    try {
        const res = await fetch(`${vars.host}evil/toggle/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })

        return res
    } catch (err) {
        console.log(err)
    }
}