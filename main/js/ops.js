const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionsEq) => {
  const position = sectionsEq * -100;

  if (isNaN(position)) {
    console.error("передано не верное значение в countSectionPosition");
    return 0;
  }
  return position;
};

const changeMenuColorFixed = (sectionsEq) => {
  const currrentSection = sections.eq(sectionsEq);
  const menuColor = currrentSection.attr("data-fixed-color");
  const activeClass = "fixed-menu_black";

  if (menuColor === "black") {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = (sectionsEq) => {
  if (inScroll === false) {
    const transitionOver = 1000;
    const mouseInertiaOver = 300;

    inScroll = true;

    const position = countSectionPosition(sectionsEq);

    changeMenuColorFixed(sectionsEq);

    display.css({
      transform: `translateY(${position}%)`,
    });

    resetActiveClassForItem(sections, sectionsEq, "active");

    setTimeout(() => {
      inScroll = false;
      resetActiveClassForItem(menuItems, sectionsEq, "fixed-menu__item_active");
    }, transitionOver + mouseInertiaOver);
  }
};

const scrollViewport = (direction) => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(window).on("wheel", (e) => {
  const deltaY = e.originalEvent.deltaY;

  console.log("wheel");

  if (deltaY > 0) {
    scrollViewport("next");
  }

  if (deltaY < 0) {
    scrollViewport("prev");
  }
});

$(window).on("keydown", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName !== "input" && tagName !== "textarea";

  if (userTypingInInputs) {
    switch (e.keyCode) {
      case 38: //prev
        scrollViewport("prev");
        break;

      case 40: //next
        scrollViewport("next");
        break;
    }
  }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-set-id=${target}]`);

  performTransition(reqSection.index());
});

//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
$("body").swipe({
  swipe: function (event, direction) {
    const scroller = scrollViewport();
    let scrollDirection = "";

    if(direction === "up") scrollDirection = "next";
    if(direction === "down") scrollDirection = "prev";

    scroll[scrollDirection]();
  },
});
