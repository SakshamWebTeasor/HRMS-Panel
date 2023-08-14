export async function maintainlog(path, jwt) {
    const response = await (await fetch(`http://localhost:8000/api/user/logs/${path}`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':jwt,
        }
    })).json()
}