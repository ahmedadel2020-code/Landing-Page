
// Define Global variables

const getAllSections = document.querySelectorAll('section');
const mainUl = document.querySelector('ul');

// End Global variales



// create addItems function

function addItems() {
    /*
    - loop over sections and add 'li' then modify the 'anchor' element inside 'li' to be like that:
    -   <a data-link="section1" class="menu__link">Section 1</a>
    -  then add them to 'ul'
    */

    for(const section of getAllSections) {
        const createList = document.createElement('li');
        createList.innerHTML = '<a data-link="'+ section.id +'" class="menu__link">' + section.dataset.nav + '</a>';
    
        mainUl.appendChild(createList);
    
    }
} 

// End addItems function


// create scrollToview function

function scrollToView() {
     
    // loop over each link in the page and add event listner to scroll into view smoothly
    

    const getAllLinks = document.querySelectorAll(".menu__link");
        for(const link of getAllLinks) {

            link.addEventListener("click", function () {
                // get data-link
                const element = document.getElementById(link.getAttribute("data-link"));
            
                element.scrollIntoView({behavior: "smooth", block: "center"})
        })

    }
}

// End scrollToview function

// create scrollToTop function

function scrollToTop() {

    /*
     - add eventListener while scrolling
     - check the top space while scrolling 
     - if there is a space while scrolling will show the button
     - else will hide it
     - create another eventListener to scroll into the view which is the top of the body
     */
    const btn = document.getElementById("btn");

    window.addEventListener("scroll", function() {

        if(document.body.scrollTop > 500) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    })
    const toTopLink = document.querySelector(".to-top");
    toTopLink.addEventListener("click", function () {
    
        document.body.scrollIntoView({behavior: "smooth"});
    })
}

// End scrollToTop function

// create hideNav function

function hideNav() {

    /*
    - create a time counter and set it to null
    - create eventListener while scrolling
    - check if the user is scrolling will show the nav bar
    - if user is not scrolling will hide the nav bar by setTimeout 
    
    */ 
    let timeCounter = null;
        const getNav = document.querySelector("#navbar__list");
 
        window.addEventListener("scroll", function() {
            getNav.style.display = "block";

            if(timeCounter !== null) {
                clearTimeout(timeCounter);
            }
            timeCounter = setTimeout(() => {
                getNav.style.display = "none";
            }, 3000);
    }, false)

}

// End hideNav function


// create showItemInViewport function

function showItemInViewport() {
    /*
    - set counter to 0 
    - loop over each section in the page
    - get section name
    - create event listener to scroll
    - edintify the dimensions from top of the page to the section and from bottom to the section
    - make a condition to determine where is the position of each section that is located in the Viewport
    - loop over each section and remove your-active-class
    - loop over each link and remove the active-class
    - make a conditoin if the section name equal with link name then we can add the active-class
    - add  your-active-class to each section after make sure that it was deleted at first
    - increament the counter
    */

    let counter = 0;
    for(const section of getAllSections) {
        const getSectionName = getAllSections[counter].getAttribute("data-nav");
        const getAllLinks = document.querySelectorAll(".menu__link");
        
        window.addEventListener("scroll", function () {
            let dim = section.getBoundingClientRect();
            let top = dim.top;
            let bottom = dim.bottom;
 
            if(top >= -400 && bottom <= window.innerHeight) {
                for(const removeClass of getAllSections) {
                    removeClass.classList.remove("your-active-class");
                }
                for(const link of getAllLinks) {
                    link.classList.remove("active-class");
                    if(link.textContent === getSectionName) {
                        link.classList.add("active-class");
                    }
                }
                
                section.classList.add("your-active-class");
            }
        
        })
        counter++;
    }
}

// End showItemInViewport function

// call all functions

addItems();
scrollToView();
showItemInViewport();
scrollToTop();
hideNav();

// End call functions
