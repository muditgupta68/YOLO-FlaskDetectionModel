// website pages

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function

    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');

        //main Nav
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // to the top
    const topBtn = document.body.querySelector('.topBtn');
    topBtn.addEventListener("click",homeSec)

    function homeSec (){
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          });
    }


    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    const secNav = document.body.querySelector('#secNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
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


setTimeout(function() {
    bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
}, 2000)

function reveal() {
    var reveals = document.querySelectorAll(".animate__animated");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("animate__fadeIn");
      } else {
        reveals[i].classList.remove("animate__fadeIn");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);


