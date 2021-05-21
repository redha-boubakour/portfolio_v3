const btnScrollTo = document.querySelector('.btn--scroll-to');

const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('section');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelectorAll('.nav__link');

// On click, Allow the nav links to go to their respectives sections

const makeNavLinksSmooth = () => {
    
    for (let n in navLinks) {
        if (navLinks.hasOwnProperty(n)) {
            navLinks[n].addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(navLinks[n].hash).scrollIntoView({ 
                    behavior: 'smooth' 
                });
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

    });
};

let sectionsObserver = new IntersectionObserver(navLinkCheck, {
    threshold: 0.7
});

sections.forEach(section => {
    sectionsObserver.observe(section);
});