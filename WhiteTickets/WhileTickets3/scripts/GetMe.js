async function get_me(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch("http://tickets.сделай.site/user", requestOptions);

    let status = await response.status;
    if (status === 401) return false;
    return await response.json()
}