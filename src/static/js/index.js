$("#about-nav-link").click(() => {
    $("body").animate({
        scrollTop: $("#main")[0].offsetTop + $("#main .about-me-container")[0].offsetTop - 50
    }, 500)
})

$("#scroll-down-button").click(() => {
    $("body").animate({
        scrollTop: $("#main")[0].offsetTop - 50
    }, 500)
})

$("#projects-nav-link, .view-projects-button").click(() => {
    $("body").animate({
        scrollTop: $("#main")[0].offsetTop + $("#main .projects-container")[0].offsetTop - 50
    }, 500)
})

$("#contact-me-container .form-container input").focusin(function() {
    $(this).parent().addClass("active")
})

$("#contact-me-container .form-container input").focusout(function() {
    $("#contact-me-container .form-container .input-container").removeClass("active")
})