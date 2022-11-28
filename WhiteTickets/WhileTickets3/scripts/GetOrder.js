function get_order(bill_code) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    const concert_duration = document.getElementById("ConcertDuration");
    const concert_number = document.getElementById("ConcertNumber");
    const concert_price = document.getElementById("ConcertPrice");
    const concert_place = document.getElementById("ConcertPlace");
    const concert_code = document.getElementById("ConcertCode");
    const concert_name = document.getElementById("ConcertName");
    const concert_date = document.getElementById("ConcertDate");
    const concert_time = document.getElementById("ConcertTime");
    const concert_img = document.getElementById("ConcertImage");

    concert_code.textContent = `Код заказа: ${bill_code}`;

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`http://tickets.сделай.site/api/order/${bill_code}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        result = JSON.parse(result);

        let ConcertName = result.ticket.name_concert;
        if (ConcertName === "Анастасия Волочкова") concert_img.src = "./assets/anasvol.png";
        else if (ConcertName === "Ирина Алегрова") concert_img.src = "./assets/ialegrova.png";
        else if (ConcertName === "Надежда Бабкина") concert_img.src = "./assets/nbabkina.png";
        else if (ConcertName === "Олег Газманов") concert_img.src = "./assets/gazmanov.png";
        else if (ConcertName === "Сергей Шнуров") concert_img.src = "./assets/shnurov.png";
        else if (ConcertName === "Елена Ваенга") concert_img.src = "./assets/evaenga.png";
        else if (ConcertName === "Пелагея") concert_img.src = "./assets/pelagea.png";
        else if (ConcertName === "Лобода") concert_img.src = "./assets/loboda.png";
        else concert_img.src = "./assets/macan.jpeg";

        concert_price.textContent = `Стоимость: ${result.data.cost}`;
        concert_duration.textContent = `Длительность: ${result.ticket.duration}`;
        concert_place.textContent = `Место концерта: ${result.ticket.venue}`;
        concert_name.textContent = ConcertName;
        concert_date.textContent = `Дата концерта: ${result.ticket.date_concert}`;
        concert_time.textContent = `Время концерта: ${result.ticket.time_start}`;
        concert_number.textContent = `Номер билетов: ${result.ticket.ticket_code}`;

        result.guest.forEach(element => {
            let Guests = document.getElementsByClassName("form__wrapper");
            Guests = Guests[Guests.length -1];

            let place = element.place_from.split(" row ");
            let row = place[0];
            place = place[1].split(" ")[0];
            place = `${row}.${place}`;

            if (Guests.childElementCount === 1 ||Guests.childElementCount === 2) {
                Guests.innerHTML += disabled
                    `<div class="form">
                        <div class="input__form">
                            <input class="order__input" type="text" placeholder="Имя" value="Имя: ${element.first_name}" disabled>
                        </div>
                        <div class="input__form">
                            <input class="order__input" type="text" placeholder="Фамилия" value="фамилия: ${element.last_name}" disabled>
                        </div>
                        <div class="input__form">
                            <input class="order__input" type="number" placeholder="Номер документа" value="Документ№: ${element.document_number}" disabled>
                        </div>
                        <div class="input__form">
                            <input class="order__input" type="text" placeholder="Место в зале" value="Место в зале: ${place}" disabled>
                        </div>
                    </div>`
            }
            else {
                const GuestsForms = document.getElementById("GuestsForm");
                GuestsForms.innerHTML += 
                    `<div class="form__wrapper">
                        <div class="form">
                            <div class="input__form">
                                <input class="order__input" type="text" placeholder="Имя" value="Имя: ${element.first_name}" disabled>
                            </div>
                            <div class="input__form">
                                <input class="order__input" type="text" placeholder="Фамилия" value="фамилия: ${element.last_name}" disabled>
                            </div>
                            <div class="input__form">
                                <input class="order__input" type="text" placeholder="Номер документа" value="Документ№: ${element.document_number}" disabled>
                            </div>
                            <div class="input__form">
                                <input class="order__input" type="text" placeholder="Место в зале" value="Место в зале: ${place}" disabled>
                            </div>
                        </div>
                    </div>`
            }
        });
    })
    .catch(error => console.log('error', error));



}

get_order(findGetParameter("billcode"));