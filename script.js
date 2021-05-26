const btnScrollTo = document.querySelector('.btn--scroll-to');

const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('section');
const section1 = document.querySelector('#projects');
const navLinks = document.querySelectorAll('.nav__link');

const Links = document.querySelector('.nav__links');
const openMenu = document.querySelector('.open__menu');
const closeMenu = document.querySelector('.close__menu');

// On click, Allow the nav links to go to their respectives sections

function makeNavLinksSmooth() {
    
    for (let n in navLinks) {
        if (navLinks.hasOwnProperty(n)) {
            navLinks[n].addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(navLinks[n].hash).scrollIntoView({ 
                    behavior: 'smooth' 
                });
                close();
            });
        }
    }
}

makeNavLinksSmooth();

// Allow the 'My achievements ? ↓' button to lead smoothly to 'the projects' section

btnScrollTo.addEventListener('click', function(e) {
    section1.scrollIntoView({ behavior: 'smooth' });
});

// Related to the stickiness of the nav bar

const stickyNav = function (entries) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) nav.classList.add('nav__sticky');
        else nav.classList.remove('nav__sticky');
    });
};

const headerObserver = new IntersectionObserver(stickyNav, {
    threshold: 1
});

headerObserver.observe(header);

// Related to the nav links sticking with the sections in the viewport

const navLinkCheck = function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                if (entry.target.id === link.dataset.nav) {
                    link.classList.add('nav__link--active');
                } else {
                    link.classList.remove('nav__link--active');
                }
            });
        }
    });
};

let sectionsObserver = new IntersectionObserver(navLinkCheck, {
    threshold: 0.7
});

sections.forEach(section => {
    sectionsObserver.observe(section);
});
sectionsObserver.observe(header);

// Related to the hamburger menu 

function show() {
    openMenu.style.display = 'none';
    closeMenu.style.display = 'block';
    Links.style.top = '0';
}

function close() {
    openMenu.style.display = 'block';
    closeMenu.style.display = 'none';
    Links.style.top = '-100%';
}

openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);

// The Caroussel part

const slides = document.querySelectorAll('.slide');
const slidesBtnLeft = document.querySelector('.slider__btn--left');
const slidesBtnRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;
const maxSlide = slides.length;

const goToSlide = function(slide) {
    slides.forEach((s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`));
}

const resetSlides = function() {
    slides.forEach((s, i) => (s.style.transform = `translate(0)`));
}

// Create a condition that targets viewports at least 1000px wide
const mediaQuery = window.matchMedia('(min-width: 1000px)')

function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    goToSlide(0);
    slidesBtnRight.addEventListener('click', function() {
        if (currentSlide === maxSlide - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
    });
    
    slidesBtnLeft.addEventListener('click', function() {
        if (currentSlide === 0) {
            currentSlide = maxSlide - 1;
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
    });
  } else {
    resetSlides();
  }
}

mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);