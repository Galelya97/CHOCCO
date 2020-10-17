const item = document.querySelector(".slider__blocks");
const items = document.querySelectorAll(".product");

function loop(direction, a){
    a.preventDefault();

    if(direction === "right") {
        item.appendChild(item.firstElementChild);
    } else {
        item.insertBefore(item.lastElementChild, item.firstElementChild);
    }
};

$(".arrows__left").click((a) => {
    loop("right", a)
});

$(".arrows__right").click((a) => {
    loop("left", a);
});
