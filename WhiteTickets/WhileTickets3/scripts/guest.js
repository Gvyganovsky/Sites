function viewDiv1(){
    const guests_forms_count = document.getElementsByClassName("form").length;
    let Guests = document.getElementsByClassName("form__wrapper");
    
    Guests = Guests[Guests.length -1];

    if (guests_forms_count !== 8) {
        if (Guests.childElementCount === 1 ||Guests.childElementCount === 2) {
            Guests.innerHTML += `<div class="form">
                    <div class="input__form">
                        <input type="text" placeholder="Имя">
                    </div>
                    <div class="input__form">
                        <input type="text" placeholder="Фамилия">
                    </div>
                    <div class="input__form">
                        <input type="date" placeholder="Дата рождения">
                    </div>
                    <div class="input__form">
                        <input type="number" placeholder="Номер документа">
                    </div>
                    <div class="input__form">
                        <input type="text" placeholder="Место в зале" value="1.10">
                    </div>
                </div>`
        }
        else {
            const GuestsForms = document.getElementById("GuestsForm");
            GuestsForms.innerHTML += `<div class="form__wrapper">
                    <div class="form">
                        <div class="input__form">
                            <input type="text" placeholder="Имя">
                        </div>
                        <div class="input__form">
                            <input type="text" placeholder="Фамилия">
                        </div>
                        <div class="input__form">
                            <input type="date" placeholder="Дата рождения">
                        </div>
                        <div class="input__form">
                            <input type="number" placeholder="Номер документа">
                        </div>
                        <div class="input__form">
                            <input type="text" placeholder="Место в зале" value="1.10">
                        </div>
                    </div>
                </div>`
        }
    }
    user_load()

};

function viewDiv2() {
    let guests_form = document.getElementsByClassName("form");
    let Guests = document.getElementsByClassName("form__wrapper");

    if (guests_form.length !== 0) {
        guests_form = guests_form[guests_form.length - 1];
        guests_form.remove();

        Guests = Guests[Guests.length -1];
        if (Guests.childElementCount === 0) Guests.remove()
    }

};