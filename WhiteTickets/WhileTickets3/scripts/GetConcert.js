async function get_concert(bill_code) {
    var myHeaders = new Headers();

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch(`http://tickets.сделай.site/api/order/${bill_code}`, requestOptions);
    let guests = await response.json();
    guests = guests.guest;
    
    return guests;
}