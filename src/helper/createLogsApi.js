export async function maintainlog(path, jwt) {
    const response = await (await fetch(`https://52.65.168.252:8000/api/user/logs/${path}`, { //http://localhost:8000/
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':jwt,
        }
    })).json()
}