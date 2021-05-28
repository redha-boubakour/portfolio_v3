const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__link');

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

// On click, Allow the nav links to go to their respectives sections

const makeNavLinksSmooth = function() {
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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionProject = document.querySelector('#projects');

btnScrollTo.addEventListener('click', function(e) {
    sectionProject.scrollIntoView({ behavior: 'smooth' });
});

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

// The Caroussel of the 'projects' section

const projects = document.querySelectorAll('.slide__project');
const projectBtnLeft = document.querySelector('.slider__project__btn--left');
const projectBtnRight = document.querySelector('.slider__project__btn--right');
const maxProject = projects.length;
let currentProject = 0;

const goToProject = function(project) {
    projects.forEach((s, i) => (s.style.transform = `translate(${100 * (i - project)}%)`));
}

const resetSlidesProject = function() {
    projects.forEach((s) => (s.style.transform = `unset`));
    currentProject = 0;
}

projectBtnRight.addEventListener('click', function() {
    if (currentProject === maxProject - 1) {
        currentProject = 0;
    } else {
        currentProject++;
    }
    goToProject(currentProject);
});

projectBtnLeft.addEventListener('click', function() {
    if (currentProject === 0) {
        currentProject = maxProject - 1;
    } else {
        currentProject--;
    }
    goToProject(currentProject);
});

// The 'Journey' section

const containerLinks = document.querySelector('.container__journey');
const periodsLinks = document.querySelectorAll('.period__link');
const periodsContents = document.querySelectorAll('.period__content');

containerLinks.addEventListener('click', function (e) {
    // Reach the closest element to the click
    const closestElementClicked = e.target.closest('.period__link');
    if (!closestElementClicked) return;

    // Removing all the 'active' elements
    periodsLinks.forEach(periodLink => periodLink.classList.remove('period__link--active'));
    periodsContents.forEach(periodContent => periodContent.classList.remove('period__content--active'));

    // Adding the 'active' elements depending on the click
    closestElementClicked.classList.add('period__link--active');
    document.querySelector(`.period__content--${closestElementClicked.dataset.tab}`).classList.add('period__content--active');
})

// Related to the hamburger menu 

const openMenu = document.querySelector('.open__menu');
const closeMenu = document.querySelector('.close__menu');
const Links = document.querySelector('.nav__links');

const show = function() {
    openMenu.style.display = 'none';
    closeMenu.style.display = 'block';
    Links.style.top = '0';
}

const close = function() {
    openMenu.style.display = 'block';
    closeMenu.style.display = 'none';
    Links.style.top = '-100%';
}

openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);

/* ////// MEDIA QUERY ////// */

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