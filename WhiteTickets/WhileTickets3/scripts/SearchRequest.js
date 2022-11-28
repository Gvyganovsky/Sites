async function search_req() {
    let concert_type = findGetParameter("type")
    if (concert_type === "Хип-хоп") concert_type = "Поп-музыка"
    else if (concert_type === "народная/фолк") concert_type = "Фольклор"
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    let response = await fetch(`http://tickets.сделай.site/api/concert?type=${concert_type}&date1=${findGetParameter("date_st")}&date2=${findGetParameter("date_en")}`, requestOptions)
    
    return await response.json()
}