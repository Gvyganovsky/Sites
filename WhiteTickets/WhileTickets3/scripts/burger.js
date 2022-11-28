const iconMenu = document.querySelector('.menu__icon2');
if (iconMenu) {
    const menu__list = document.querySelector('.menu__list2');
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active');
        menu__list.classList.toggle('_active');
    });
}

if (iconMenu) {
    const menu__list = document.querySelector('.menu__list2');
    menu__list.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active');
        menu__list.classList.toggle('_active');
    });
}


var circle = document.querySelectorAll('.circle');
circle.forEach(element=> (element.addEventListener("click", function (e) {
  element.style.background = 'linear-gradient(to top, #190B40, #472C7B)';
})));

``