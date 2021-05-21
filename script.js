const navLinkHome = document.querySelector('.nav__link--home');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLinkProjects = document.querySelector('.nav__link--projects');
const navLinkJourney = document.querySelector('.nav__link--journey');
const navLinkContact = document.querySelector('.nav__link--contact');

const navLinkActive = document.querySelector('.nav__link--btn');

const header = document.querySelector('#header');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');


navLinkHome.addEventListener('click', function(e) {
    header.scrollIntoView({ behavior: 'smooth' });
});

btnScrollTo.addEventListener('click', function(e) {
    section1.scrollIntoView({ behavior: 'smooth' });
});

navLinkProjects.addEventListener('click', function(e) {
    section1.scrollIntoView({ behavior: 'smooth' });
});

navLinkJourney.addEventListener('click', function(e) {
    section2.scrollIntoView({ behavior: 'smooth' });
});

navLinkContact.addEventListener('click', function(e) {
    section3.scrollIntoView({ behavior: 'smooth' });
});

/*
window.addEventListener('scroll', function () {
    nav.classList.toggle('nav__sticky', window.scrollY > 0)
});
*/

/////////////////////////////

const stickyNav = function (entries) {
        const [entry] = entries;
        if (!entry.isIntersecting) nav.classList.add('nav__sticky');
        else nav.classList.remove('nav__sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 1
});
headerObserver.observe(header);
