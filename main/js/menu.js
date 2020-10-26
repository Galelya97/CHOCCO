const countWidth = (elem) => {
  let reqWidth = 0;

  const screenWidth = $(window).width();
  const list = elem.closest(".menu__list");
  const links = list.find(".menu__link");
  const titleWidth = links.width() * links.length;

  const reqTextContainer = elem.find(".menu__box");
  const paddingLeft = parseInt(reqTextContainer.css("padding-left"));
  const paddingRight = parseInt(reqTextContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqWidth = screenWidth - titleWidth;
  } else {
    reqWidth = 524;
  }

  return {
    container : reqWidth,
    textContainer: reqWidth - paddingLeft - paddingRight
  }
};

const openContent = (elem) => {
  const reqWidthElem = countWidth(elem);
  const textBlock = elem.find(".menu__box");

  elem.css({
    visibility: "visible",
    width: reqWidthElem.container,
    opacity: "1",
  });
  textBlock.width(reqWidthElem.textContainer);
};

const closeContent = (elem) => {

  elem.css({
    visibility: "hidden",
    width: "0px",
    opacity: "0",
  });
};

$(".menu__item").click(function (e) {
  const target = $(e.currentTarget);
  const targetContent = target.find(".menu__content");
  const isTargetOpen = targetContent.css("width").replace("px", "") !== "0";
  const items = $(".menu__content");
  const openedItems = items.filter((item) => {
    return $(items[item]).css("width").replace("px", "") !== "0";
  });

  if (isTargetOpen) {
    closeContent(targetContent);
  } else {
    openedItems.map((index, item) => closeContent($(item)));
    openContent(targetContent);
  }
});

// $(".menu__content-close").click( e => {
//   e.preventDefault();
//
//   closeContent($('.menu__content'));
// })
