// const openText = item => {
//     const contentWrapper = item.find(".team__content");
//     const contentText = contentWrapper.find(".team__content-block");
//     const reqHeight = contentText.height();
//
//     contentWrapper.height(reqHeight);
// }
// const closeText = item => {
//     const contentWrapper = item.find(".team__content");
//
//     contentWrapper.height(0);
// }
//
// $(".team__item").click(function (e){
//     const target = $(this);
//
//     if(!target.hasClass("team__item_active")){
//         const itemActive = $(".team__item_active");
//         itemActive.removeClass("team__item_active");
//         closeText(itemActive);
//
//         target.addClass("team__item_active");
//         openText(target);
//     } else {
//         target.removeClass("team__item_active");
//         closeText(target);
//     }
// });

const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__content-block");
    const recHeight = textBlock.height();

    container.addClass("team__item_active");
    contentBlock.height(recHeight);
}

const closeItem = container => {
    const items = container.find(".team__content");
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("team__item_active");
    items.height(0);
}

$(".team__title").click((e) => {

    const target = $(e.currentTarget);
    const container = target.closest(".team");
    const elemContainer = target.closest(".team__item");

    if(elemContainer.hasClass("team__item_active")) {
        closeItem(container);
    } else {
        closeItem(container);
        openItem(target);
    }
});