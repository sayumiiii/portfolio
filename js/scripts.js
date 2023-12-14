/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


var items = document.querySelectorAll(".list__item")

items.forEach(item => {
  var itemTitle = item.querySelector(".list__item__title")
  var itemTitleOutline = item.querySelector(".list__item__titleOutline")
  var itemImg = item.querySelector(".list__item img")
  
  var itemTL = gsap.timeline({scrollTrigger: {
    trigger: item,
    start: "0% 75%",
    end: "25% 50%",
    scrub: 3,
  }})
  
  itemTL.fromTo(itemTitle, {scale: 2, y: "100%"}, {scale: 1, y: "0%", ease: "power2.inOut"}, 0)
  itemTL.fromTo(itemTitleOutline, {scale: 2, y: "100%"}, {scale: 1, y: "0%", ease: "power2.inOut"}, 0)
  
  gsap.fromTo(itemImg, {x: "60vw", y : "60vh", rotate: -30}, {x: "-60vw", y: "-60vh", rotate: 30, ease: "none", scrollTrigger: {
    trigger: item,
    start: "50% 100%",
    end: "100% 50%",
    scrub: 3,
  }})
})
