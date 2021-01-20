$("#about-nav-link").click(() => {
    $("body").animate({
        scrollTop: $("#main")[0].offsetTop + $("#main .about-me-container")[0].offsetTop - 50
    }, 400)
})

$("#scroll-down-button").click(() => {
    $("body").animate({
        scrollTop: $("#main")[0].offsetTop - 50
    }, 400)
})

$("#projects-nav-link, .view-projects-button").click(() => {
    $("body").animate({
        scrollTop: $("#main")[0].offsetTop + $("#main .projects-container")[0].offsetTop - 50
    }, 500)
})

$("#nav .lets-talk-button, .about-me-container .contact-me-link").click(() => {
    $("body").animate({
        scrollTop: $("#main")[0].offsetTop + $("#contact-container")[0].offsetTop - 50
    }, 600)
})

$("#contact-container .input-container").click(function() {
    $(this).find("input, textarea").focus()
})

$("#contact-container .label").click(function(e) {
    e.preventDefault()
})

$("#contact-container input, #contact-container textarea").focusin(function() {
    $(this).parent().addClass("active")
})

$("#contact-container input, #contact-container textarea").focusout(function() {
    if($(this).val().trim().length > 0) return;
    $(this).parent().removeClass("active")
})


