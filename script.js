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

const slidesProjects = document.querySelectorAll('.slide__project');
const projectBtnLeft = document.querySelector('.slider__project__btn--left');
const projectBtnRight = document.querySelector('.slider__project__btn--right');

const maxProject = slidesProjects.length;
let currentProject = 0;

const goToProject = function(slideProject) {
    slidesProjects.forEach((s, i) => (s.style.transform = `translate(${100 * (i - slideProject)}%)`));
}

const resetSlidesProject = function() {
    slidesProjects.forEach((s) => (s.style.transform = `unset`));
    currentProject = 0;
}

projectBtnRight.addEventListener('click', function() {
    console.log(currentProject);
    if (currentProject === maxProject - 1) {
        currentProject = 0;
    } else {
        currentProject++;
    }
    goToProject(currentProject);
});

projectBtnLeft.addEventListener('click', function() {
    console.log(currentProject);
    if (currentProject === 0) {
        currentProject = maxProject - 1;
    } else {
        currentProject--;
    }
    goToProject(currentProject);
});

/* ////// MEDIA ////// 
   ////// QUERY ////// */

// Create a condition that targets viewports at least 1000px wide
const mediaQuery = window.matchMedia('(min-width: 1000px)')

function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    goToProject(0);


  } else {
    resetSlidesProject();
  }
}

mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);