// $('.reviews__switcher-item').click(function(e) {
//     e.preventDefault();
//
//     const target = $(this);
//
//     if (!target.hasClass('interactive-avatar_active')) {
//         const id = target.attr('data-id-switcher');
//
//         // $(`.reviews__inner.reviews__inner_active`).removeClass('reviews__inner_active');
//         $(`.reviews__inner[data-id-card="${id}"]`).addClass('reviews__inner_active').siblings().removeClass('reviews__inner_active');
//
//         $(`.reviews__switcher-item.interactive-avatar_active`).removeClass('interactive-avatar_active');
//         target.addClass('interactive-avatar_active');
//     }
// });


$(".reviews__switcher-item").click(function (e){
    e.preventDefault();

    const target = $(this);

    if(!target.hasClass("interactive-avatar_active")) {
        const id = target.attr("data-id-switcher");
        const reviewsInner =  $(`.reviews__inner[data-id-card="${id}"]`);

        target.addClass("interactive-avatar_active").siblings().removeClass("interactive-avatar_active");

        reviewsInner.addClass("reviews__inner_active").siblings().removeClass("reviews__inner_active");
    }
});


