let page = 0

const handleWindowResize = () => {
    if(page != 1) return;
    $("body").scrollTop($(".splash-container").height())
}

const closeModal = () => {
    $(".modal").removeClass("active")
    $("body").removeClass("modal-active").removeClass("inactive")
}

const preloadImages = (imgs) => {
    imgs.forEach((i) => {
        $("<img/>")[0].src = i
    })
}

$(document).keydown((e) => {
    if(e.keyCode === 27) {
        if($(".fullscreen-image-container").hasClass("show")) {
            $(".fullscreen-image-container").removeClass("show")
        } else {
            closeModal();
        }
    }
})

$(() => { // SCROLL LOCK TO DIFFERENT PAGES
    let isScrolling = false;

    const scrollUp = () => {
        if($('body').hasClass("inactive")) return;
        if(isScrolling) return;
        isScrolling = true;
        $("body").animate({
            scrollTop: 0
        }, 300, () => {
            isScrolling = false;
            page = 0
        })
    }

    const scrollDown = () => {
        if($('body').hasClass("inactive")) return;
        if(isScrolling) return;
        isScrolling = true;
        $("body").animate({
            scrollTop: $(".splash-container").height()
        }, 300, () => {
            isScrolling = false;
            page = 1
        })
    }

    $("body").bind('mousewheel', (e) => {
        const y = e.originalEvent.deltaY
        if(y > 0 && page === 0) {
            scrollDown()
        } else if (y < 0 && page === 1) {
            scrollUp()
        }
    })

    $(document).keydown((e) => {
        if(e.keyCode === 38 && page === 1) scrollUp();
        if(e.keyCode === 40 && page === 0) scrollDown();
    })
})

$(".modal .close-btn, .modal-overlay").click(closeModal)

$(".down-arrow").click(() => {
    $("body").animate({
        scrollTop: $(".splash-container").height()
    }, 300, () => {
        page = 1
    })
})

$(".up-arrow").click(() => {
    $("body").animate({
        scrollTop: 0
    }, 300, () => {
        page = 0
    })
})

$(".splash-container .about").click(() => {
    $(".about-modal").addClass("active")
    $("body").addClass("modal-active").addClass("inactive")
})

$(window).on("resize", handleWindowResize)

$(window).on('beforeunload', function() {
    $("body").stop()
    $(window).scrollTop(0);
});

$(() => { // Projects Page
    let projectTransition = false;

    const setInfo = (data, index) => {
        let p = data;
        const s3Link = `https://s3-us-west-2.amazonaws.com/jacksonlawrence.dev-portfolio-assets/projects/${p.s3Folder}/`
        $(".project-container .project-basic-info-container .project-title h1").text(p.title)
        $(".project-container .project-basic-info-container .project-title .logo").css("background-image", `url(${s3Link}${p.logo})`)
        $(".project-container .project-basic-info-container .project-basic-info-content .runner").text(p.runner)
        $(".project-container .project-pictures-container .picture").attr("src", s3Link + p.imgs[0])
        $(".project-container .project-basic-info-container .info-btn").attr("data-project", index)
    }

    const changeProject = (data, index) => {
        $(".project-container .project-basic-info-container .project-title, .project-basic-info-container .project-basic-info-content").animate({
            marginLeft: "+=10",
            opacity: 0
        }, 300, function() {
            $(this).css("margin-left", "0")
            setTimeout(() => {
                $(this).animate({
                    opacity: 1,
                    marginLeft: "+=10"
                }, 300)
            }, 400)
        })
        $(".project-container .project-pictures-container .picture").animate({
            marginTop: "+=10",
            opacity: 0
        }, 300, function() {
            $(this).css("margin-top", "-10px")
            setTimeout(() => {
                $(this).animate({
                    opacity: 1,
                    marginTop: "+=10"
                }, 300)
            }, 400)
        })
        let dividerWidth = $(".project-container .project-basic-info-container .divider")[0].clientWidth
        $(".project-container .project-basic-info-container .divider").animate({
            width: 0
        }, 300, () => {
            setTimeout(() => {
                $(".project-container .project-basic-info-container .divider").animate({
                    width: dividerWidth
                })
            }, 400)
        })
        setTimeout(() => {
            setInfo(data,index)
            setTimeout(() => {
                projectTransition = false;
            }, 750)
        }, 350)
    }

    $(document).on("click", ".projects-select-container .select-wrap .option", (e) => {
        if(projectTransition) return;
        const elem = $(e.target).is("p") ? $(e.target).parent() : $(e.target);
        if(elem.hasClass("active")) return;
        projectTransition = true;
        const index = elem.attr("data-project");
        $(".projects-select-container .option").removeClass('active');
        elem.addClass('active');
        changeProject(projects[index], index);
    })

    $(document).keydown((e) => {
        const kc = e.keyCode
        const l = projects.length - 1;
        let projN = parseInt($(".projects-select-container .option.active").attr("data-project"))
        if(page != 1) return;
        if($("body").hasClass("inactive")) return;
        if(kc >= 49 && kc <=57 ) {
            let n = parseInt(e.key) - 1
            if($(`.projects-select-container .option[data-project="${n}"]`).length >= 0) {
                $(`.projects-select-container .option[data-project="${n}"]`).click()
            }
        }
        if(kc === 39) {
            projN = projN === l ? 0 : projN + 1;
            $(`.projects-select-container .option[data-project="${projN}"]`).click();
        }
        if(kc === 37) {
            projN = projN === 0 ? l : projN - 1;
            $(`.projects-select-container .option[data-project="${projN}"]`).click();
        }
    })

    $(document).ready(() => {
        if(!projects) return;
        projects.forEach((p, i) => {
            preloadImages(p.imgs)
            $(".projects-select-container .select-wrap").append(`
                <div class="option${i === 0 ? " active" : ""}" data-project="${i}">
                    <p>${i + 1}</p>
                </div>
            `)
        })
        setInfo(projects[0], 0)
    })
})

$(() => { // Fullscreen Image Preview

    let previousChanges = "width";

    let resizeImage = () => {
        let img = $(".fullscreen-image-container img")
        let imgW = img.width()
        let imgH = img.height()
        let windowW = window.innerWidth
        let windowH = window.innerHeight
        if(imgW > windowW && imgH <= windowH) {
            img.attr("style", `width: ${windowW}px;`)
            previousChanges = "width"
        } else if (imgW <= windowW && imgH > windowH) {
            img.attr("style", `height: ${windowH}px;`)
            previousChanges = "height"
        } else if (imgW <= windowW && imgH <= windowH) {
            if(previousChanges === "width") {
                img.attr("style", `width: ${windowW}px;`)
            } else {
                img.attr("style", `height: ${windowH}px;`)
            }
        } else if (imgW > windowW && imgH > windowH) {
            if(previousChanges === "width") {
                img.attr("style", `width: ${windowW}px;`)
            } else {
                img.attr("style", `height: ${windowH}px;`)
            }
        }
    }

    let setImage = (src) => {
        $(".fullscreen-image-container img").attr("src", src)
        $(".fullscreen-image-container img").on("load", () => {
            let img = $(".fullscreen-image-container img")
            let windowW = window.innerWidth
            let windowH = window.innerHeight
            img.width(window.innerWidth)
            $(".fullscreen-image-container").addClass("show")
            if(img.height() >= windowH) {
                previousChanges = "height"
            }
            resizeImage()
        })
    }

    $(".project-info-modal .pictures-container .fullscreen-btn").click(() => {
        const src = $(".project-info-modal .pictures-container .current-img").attr('src')
        setImage(src)
    })

    $(".fullscreen-image-container .close-btn").click(() => {
        $(".fullscreen-image-container").removeClass("show")
        $(".fullscreen-image-container img").removeAttr("")
    })

    window.onresize = resizeImage
})

$(() => { // Project Modal
    let p;

    const setModalInfo = (data) => {
        p = data
        let showLinks = false;
        const s3Link = `https://s3-us-west-2.amazonaws.com/jacksonlawrence.dev-portfolio-assets/projects/${p.s3Folder}/`
        $(".project-info-modal .title-wrap .logo").css("background-image", `url(${s3Link}${p.logo})`)
        $(".project-info-modal .title-wrap p").text(p.title)

        $(".project-info-modal .pictures-container .no-pictures").hide()
        $(".project-info-modal .pictures-container .img-wrap, .project-info-modal .pictures-container .change-img-wrap").show()

        if(p.imgs.length === 1) {
            $(".project-info-modal .pictures-container .change-img-wrap").hide()
        } else {
            $(".project-info-modal .pictures-container .change-img-wrap").show()
        }

        if(p.imgs && p.imgs.length > 0) {

            $(".project-info-modal .pictures-container .current-img").attr("src", `${s3Link}${p.imgs[0]}`).attr("data-img-index", "0")
        } else {
            $(".project-info-modal .pictures-container .img-wrap, .project-info-modal .pictures-container .change-img-wrap").hide()
            $(".project-info-modal .pictures-container .no-pictures").show()
        }

        if(p.links.github) {
            showLinks = true
            $(".project-info-modal .link.github").attr("href", p.links.github).show()
        } else {
            $(".project-info-modal .link.github").hide()
        }
        if(p.links.website) {
            showLinks = true
            $(".project-info-modal .link.website").attr("href", p.links.website).show()

        } else {
            $(".project-info-modal .link.website").hide()
        }
        if(showLinks) {
            $(".links-wrap").show()
        } else {
            $(".links-wrap").hide()
        }
    }

    $(".project-info-modal .pictures-container .change-img-wrap div").click(function() {
        let imgs = p.imgs
        const s3Link = `https://s3-us-west-2.amazonaws.com/jacksonlawrence.dev-portfolio-assets/projects/${p.s3Folder}/`
        let imgIndex = parseInt($(".project-info-modal .pictures-container .current-img").attr("data-img-index"))
        if($(this).hasClass("previous-btn")) {
            imgIndex = imgIndex - 1 < 0 ? imgs.length - 1 : imgIndex - 1
        } else {
            imgIndex = imgIndex + 1 >= imgs.length ? 0 : imgIndex + 1
        }
        $(".project-info-modal .pictures-container .current-img").attr("src", s3Link + imgs[imgIndex]).attr("data-img-index", "" + imgIndex)
    })

    $(document).keydown((e) => {
        const kc = e.keyCode
        if(!$(".project-info-modal").hasClass("active") || page != 1) return;
        if(kc === 39) {
            $(`.project-info-modal .pictures-container .change-img-wrap .previous-btn`).click();
        }
        if(kc === 37) {
            $(`.project-info-modal .pictures-container .change-img-wrap .next-btn`).click();
        }
    })


    $(".info-btn").click(function() {
        const i = $(this).attr("data-project")
        setModalInfo(projects[i])
        $(".project-info-modal").addClass("active")
        $("body").addClass("modal-active").addClass("inactive")
    })
})
