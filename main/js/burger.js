const burger = document.querySelector(".hamburger");
const navBurger = document.querySelector(".nav__burger");
const body = document.querySelector("body");

function toggleMenu(e) {
    e.preventDefault();
    burger.classList.toggle("hamburger_active");
    navBurger.classList.toggle("nav__burger_active");
    body.classList.toggle("body__burger-active");
}

burger.addEventListener("click", toggleMenu);



burger.addEventListener("click", toggleMenu );
