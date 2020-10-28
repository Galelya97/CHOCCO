const countWidth = (elem) => {
  const isMobile = window.matchMedia("(max-width: 480px)").matches;
  let reqWidth = 0;

  const screenWidth = $(window).width();
  const list = elem.closest(".menu__list");
  const links = list.find(".menu__link");
  const titleWidth = links.width() * (isMobile? 1 : links.length);

  const reqTextContainer = elem.find(".menu__box");
  const paddingLeft = parseInt(reqTextContainer.css("padding-left"));
  const paddingRight = parseInt(reqTextContainer.css("padding-right"));

  const isTablet = window.matchMedia("(max-width: 768px)").matches;

  if (isTablet) {
    reqWidth = screenWidth - titleWidth;
  } else {
    reqWidth = 524;
  }

  return {
    container: reqWidth,
    textContainer: reqWidth - paddingLeft - paddingRight,
  };
};

const openContent = (elem) => {
  const isMobile = window.matchMedia("(max-width: 480px)").matches;
  const reqWidthElem = countWidth(elem);
  const textBlock = elem.find(".menu__box");

  elem.closest(".menu__list").find(".menu__item").removeClass("menu__item_active");
  elem.closest(".menu__item").find(".menu__content").removeClass("menu__content_active").width(0);

  if (isMobile) {
    elem.closest(".menu__item").addClass("menu__item_active");
    elem.closest(".menu__item").find(".menu__content").addClass("menu__content_active").width(reqWidthElem.container);
    textBlock.width(reqWidthElem.textContainer);
  } else {
    elem.closest(".menu__item").find(".menu__content").addClass("menu__content_active").width(reqWidthElem.container);
    textBlock.width(reqWidthElem.textContainer);
  }
};

const closeContent = (elem) => {
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  if (isMobile) {
    elem.closest(".menu__list").find(".menu__item").removeClass("menu__item_active");
    elem.closest(".menu__item").find(".menu__content").removeClass("menu__content_active").width(0);
  } else {
    elem.closest(".menu__item").find(".menu__content").removeClass("menu__content_active").width(0);
  }
};

$(".menu__item").click(function (e) {
  const target = $(e.currentTarget);
  const targetContent = target.find(".menu__content");
  const isTargetOpen = targetContent.css("width").replace("px", "") !== "0";
  const items = $(".menu__item");
  const openedItems = items.filter((item) => {
    return $(items[item]).find(".menu__content").css("width").replace("px", "") !== "0";
  });

  if (isTargetOpen) {
    closeContent(target);
  } else {
    openedItems.map((index, item) => closeContent($(item)));
    openContent(target);
  }
});

// $(".menu__content-close").click( e => {
//   e.preventDefault();
//
//   closeContent($('.menu__content'));
// })
