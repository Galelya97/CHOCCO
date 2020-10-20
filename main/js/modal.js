const validateFields = (form, arr) => {
    arr.forEach((filed) => {
        filed.removeClass("input_error");
        if(filed.val().trim() === "") {
            filed.addClass("input_error");
        }
    });

    const errorFiled = form.find(".input_error");

    return errorFiled.length === 0;
}

$(".forms").submit( e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const street = form.find("[name='street']");
    const home = form.find("[name='home']");
    const building = form.find("[name='building']");
    const apartment = form.find("[name='apartment']");
    const floor = form.find("[name='floor']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");
    const formArr = [name,phone,street,home,building,apartment,floor,comment,to];

    const modal = $(".modal");
    const content = modal.find(".modal__title");

    content.removeClass("error_modal");

    const isValid = validateFields(form,formArr)

    if(isValid) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                street: street.val(),
                home: home.val(),
                building: building.val(),
                apartment: apartment.val(),
                floor: floor.val(),
                comment: comment.val(),
                to: to.val(),
            },

            success: (data) => {
                console.log(data);
                content.text(data.message);

                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                });

                $('.forms').trigger('reset');
            },
            error: data => {
                console.log('fghj');
                const message = data.responseJSON.message;
                console.log(message);
                console.log(content);
                console.log(modal);
                content.text(message);
                content.addClass("error_modal");

                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                });
            },
        });
    }
});

$(".app-close-modal").click(e => {
    e.preventDefault();

    $.fancybox.close();
})