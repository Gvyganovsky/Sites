async function orders() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let concerts;
    await fetch("http://tickets.сделай.site/user/booking", requestOptions)
    .then(response => response.text())
    .then(result => {
        result = JSON.parse(result).data.items;
        concerts = result;
    })
    .catch(error => console.log('error', error));

    const concerts_div = document.getElementById("stocks");
    concerts.forEach(element => {
        let concert_number = element.code;


        fetch(`http://tickets.сделай.site/api/order/${concert_number}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result).ticket;

            let classes = "three_by_two";
            if ((concerts_div.children.length)%2 === 0) { classes += " reverse"}
            if (concerts_div.children.length === 1) { classes += " start"}

            let concert_img;
            let ConcertName = result.name_concert;
            if (ConcertName === "Анастасия Волочкова") concert_img = "./assets/volockova.png";
            else if (ConcertName === "Ирина Алегрова") concert_img = "./assets/alegrova.png";
            else if (ConcertName === "Надежда Бабкина") concert_img = "./assets/nbabkina.png";
            else if (ConcertName === "Олег Газманов") concert_img = "./assets/gazmanov.png";
            else if (ConcertName === "Сергей Шнуров") concert_img = "./assets/shnurov.png";
            else if (ConcertName === "Елена Ваенга") concert_img = "./assets/evaenga.png";
            else if (ConcertName === "Пелагея") concert_img = "./assets/pelagea.png";
            else if (ConcertName === "Лобода") concert_img = "./assets/loboda.png";
            else concert_img = "./assets/macan.jpeg";

            concerts_div.innerHTML += 
            `<div class="${classes} block__concert">
                <div class="stocks__item-head">
                    <img src="${concert_img}" class="concert__img" alt="1+1=3">
                    <div class="stocks_text">
                        <p class="search__text">${ConcertName}</p>
                        <p class="search__text-date">Номер билета: ${result.ticket_code}</p>
                        <p class="search__text-date">Дата концерта: ${result.date_concert}</p>
                        <p class="search__text-date">Время: ${result.time_start}</p>
                        <p class="search__text-date">Место концерта: ${result.venue}</p>
                    </div>
                </div>
            </div>`
        })
        .catch(error => console.log('error', error));
    });
}

orders();

`<div class="block__concert">
                <div class="stocks__item-head">
                <img src="${concert__image}" alt="" class="concert__img">
                <div class="stocks__item-info">
                    <div class="search__text">${concert__name}</div>
                    <div class="search__text-date">Город: Санкт-Петербург</div>
                </div>
            </div>
            <div class="stocks__item-text">
                <p class="search__text-add">Номер: ${concert.code}</p>
                <p class="search__text-add">Дата: ${concert["tickets"]["date_concert"]}</p>
                <p class="search__text-add search__text-add-end">Время: ${concert["tickets"]["time_start"]}</p>
            </div>
        </div>`