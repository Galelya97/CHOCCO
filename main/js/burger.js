const burger = document.querySelector(".hamburger");
const navBurger = document.querySelector(".nav__burger");
const link = document.querySelectorAll(".nav__link");
const body = document.querySelector("body");

link.forEach(function (elem){
    elem.addEventListener("click",toggleMenu);
})

function toggleMenu(e) {
    e.preventDefault();
    burger.classList.toggle("hamburger_active");
    navBurger.classList.toggle("nav__burger_active");
    body.classList.toggle("body__burger-active");
}

burger.addEventListener("click", toggleMenu);
