/*------------------- navigation menu ---------------------*/
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);
  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }
  // attach an event handler to document
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      /* make sure event.target.hash has a value before overridding default behaviour */
      if (event.target.hash !== "") {
        // prevent default anchor click behaviour
        event.preventDefault();
        const hash = event.target.hash;
        // deactivate existing active 'section'
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // activate new 'section'
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        /* deactivate existing active navigation menu 'link-item' */
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        /* if clicked 'link-item' is contained within the navigation menu */
        if (navMenu.classList.contains("open")) {
          // activate new navigation menu 'link-item'
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          // hide navigation menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // activate new navigation menu 'link-item'
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // add hash (#) to url
        window.location.hash = hash;
      }
    }
  });
})();

/*------------------ about section tabs-------------------- */
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    /* if event.target contains 'tab-item' class and not contain 'active' class */
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      // deactivate existing active 'tab item'
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // activate new 'tab-item'
      event.target.classList.add("active", "outer-shadow");
      // deactivate existing active 'tab-content'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // activate new 'tab-content'
      aboutSection.querySelector(target).classList.add("active");
    }
  });

  // Experience section
  const expTimelineWrapper = document.querySelector("#exp-timeline-wrapper");

  const getExperiences = async () => {
    await fetch("../../utils/experience.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        const { experiences } = data;
        for (let i = 0; i < experiences.length; i++) {
          const expBullets = experiences[i].details.map((detail) => detail);

          expTimelineWrapper.innerHTML += `
              <!-- timeline item start -->
              <div class="timeline-item">
                <div class="timeline-item-inner outer-shadow">
                  <i class="fas fa-briefcase icon"></i>
                  <span>${experiences[i].date}</span>
                  <h3>${experiences[i].role} ${experiences[i].company}</h3>
                  <h4>${experiences[i].location}</h4>
                  <p>${expBullets.join("</br>")}</p>
                  
                </div>
              </div>
            <!-- timeline item end -->
          `;
        }
      });
  };

  getExperiences();

  // Experience section
  const eduTimelineWrapper = document.querySelector("#edu-timeline-wrapper");

  const getEducation = async () => {
    await fetch("../../utils/education.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        const { educations } = data;
        for (let i = 0; i < educations.length; i++) {
          eduTimelineWrapper.innerHTML += `
          <!-- timeline item start -->
          <div class="timeline-item">
            <div class="timeline-item-inner outer-shadow">
              <i class="fas fa-graduation-cap icon"></i>
              <span>${educations[i].date}</span>
              <h3>${educations[i].name}</h3>
              <h4>${educations[i].institution}</h4>
              <p>${educations[i].info}</p>
            </div>
          </div>
        <!-- timeline item end -->
          `;
        }
      });
  };

  getEducation();
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

/*--------------- services section -------------*/
(() => {
  // Experience section
  const servicesTimelineWrapper = document.querySelector(
    "#services-items-wrapper"
  );

  const getServices = async () => {
    await fetch("../../utils/services.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        const { services } = data;
        for (let i = 0; i < services.length; i++) {
          servicesTimelineWrapper.innerHTML += `
          <!-- service item start -->
          <div class="service-item">
            <div class="service-item-inner outer-shadow">
              <div class="icon inner-shadow">
                ${services[i].icon}
              </div>
              <h3>${services[i].name}</h3>
              <p>${services[i].text}</p>
            </div>
          </div>
          <!-- services item end -->
        `;
        }
      });
  };

  getServices();
})();

/*--------------- portfolio filter and popup -----------------*/
(() => {
  const projectsItemsWrapper = document.querySelector(
    "#projects-items-wrapper"
  );

  const getProjects = async () => {
    await fetch("../../utils/projects.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        const { projects } = data;

        for (let i = 0; i < projects.length; i++) {
          // Create a URL-friendly slug from the project name
          // e.g., "Velin AI" becomes "velin-ai"
          const projectSlug = projects[i].name.toLowerCase().split(" ").join("-").replace(/[^a-z0-9-]/g, '');


          projectsItemsWrapper.innerHTML += `
          <!-- portfolio item start -->
          <div class="portfolio-item" data-category="${projects[
            i
          ].categories.join(" ")}" data-slug="${projectSlug}">
            <div class="portfolio-item-inner outer-shadow">
              <div class="portfolio-item-img">
                <img src="${
                  projects[i].thumbnail
                }" alt="portfolio image" data-screenshots="${projects[i].imgs}">
                <!-- view project btn -->
                <span class="view-project">view project</span>
              </div>
              <p class="portfolio-item-title">${projects[i].name}</p>
              <!-- portfolio item details start -->
              <div class="portfolio-item-details">
                <div class="row">
                  <div class="description">
                    <h3>Project Brief</h3>
                    <p>${projects[i].description}</p>
                  </div>
                  <div class="info">
                    <h3>Project Info</h3>
                    <ul>
                      <li>Date - <span>${projects[i].date}</span></li>
                      <li>Client - <span>${projects[i].client}</span></li>
                      <li>Tools - <span>${projects[i].tools.join(
                        ", "
                      )}</span></li>
                      <li>Github - <span><a href="${projects[i].github}">${
            projects[i].github
          }</a></span></li>
                      <li>Link - <span><a href="${projects[i].link}">${
            projects[i].link
          }</a></span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- portfolio item details end -->
            </div>
          </div>
          <!-- portfolio item end -->
        `;
        }

        const filterContainer = document.querySelector(".portfolio-filter"),
          portfolioItemsContainer = document.querySelector(".portfolio-items"),
          portfolioItems = document.querySelectorAll(".portfolio-item"),
          noData = document.querySelector(".no-data"),
          popup = document.querySelector(".portfolio-popup"),
          prevBtn = popup.querySelector(".pp-prev"),
          nextBtn = popup.querySelector(".pp-next"),
          closeBtn = popup.querySelector(".pp-close"),
          projectDetailsContainer = popup.querySelector(".pp-details"),
          projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

        let itemIndex, slideIndex, screenshots;

        /* filter portfolio items */
        // // no data click
        // noData.addEventListener("click", )
        filterContainer.addEventListener("click", (event) => {
          if (
            event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")
          ) {
            // deactivate existing 'filter-item'
            filterContainer
              .querySelector(".active")
              .classList.remove("outer-shadow", "active");
            // activate new 'filter-item
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            let checkIfNoData = true;
            portfolioItems.forEach((item) => {
              // 1. Get the categories string and split it into an array
              const itemCategories = item
                .getAttribute("data-category")
                .split(" ");

              // 2. Check if the array INCLUDES the target (or if target is 'all')
              if (itemCategories.includes(target) || target === "all") {
                item.classList.remove("hide");
                item.classList.add("show");
                checkIfNoData = false;
              } else {
                item.classList.remove("show");
                item.classList.add("hide");
              }
            });
            // if 'no-data' in 'filter-item' show 'no-data'
            if (checkIfNoData === false) {
              noData.classList.remove("show");
              noData.classList.add("hide");
            } else {
              noData.classList.remove("hide");
              noData.classList.add("show");
            }
          }
        });

        portfolioItemsContainer.addEventListener("click", (event) => {
          if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(
              ".portfolio-item-inner"
            ).parentElement;
            // get the porfolioItem index
            itemIndex = Array.from(
              portfolioItem.parentElement.children
            ).indexOf(portfolioItem);

            // FIX 3: Set URL Hash when opening project
            const slug = portfolioItems[itemIndex].getAttribute("data-slug");
            window.location.hash = slug;


            openPopup();
          }
        });

        // Helper function to handle opening logic (reused for click and load)
        function openPopup() {
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
              prevBtn.style.display = "none";
              nextBtn.style.display = "none";
            } else {
              prevBtn.style.display = "block";
              nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }

        closeBtn.addEventListener("click", () => {
          popupToggle();
          if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
          }

          // FIX 3: Reset URL to #portfolio when closing
          window.location.hash = "portfolio";

        });

        function popupToggle() {
          popup.classList.toggle("open");
          bodyScrollingToggle();
        }

        function popupSlideshow() {
          const imgSrc = screenshots[slideIndex];
          const popupImg = popup.querySelector(".pp-img");
          /* activate loader until the popupImg loaded */
          popup.querySelector(".pp-loader").classList.add("active");
          popupImg.src = imgSrc;
          popupImg.onload = () => {
            // deactivate loader after the popupImg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
          };
          popup.querySelector(".pp-counter").innerHTML = `${
            slideIndex + 1
          } of ${screenshots.length}`;
        }

        // next slide
        nextBtn.addEventListener("click", () => {
          if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
          } else {
            slideIndex++;
          }
          popupSlideshow();
        });

        // prev slide
        prevBtn.addEventListener("click", () => {
          if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
          } else {
            slideIndex--;
          }
          popupSlideshow();
        });

        function popupDetails() {
          // if portfolio-item-details not exist
          if (
            !portfolioItems[itemIndex].querySelector(".portfolio-item-details")
          ) {
            projectDetailsBtn.style.display = "none";
            return; /* end function execution */
          }
          projectDetailsBtn.style.display = "block";
          // get the project details
          const details = portfolioItems[itemIndex].querySelector(
            ".portfolio-item-details"
          ).innerHTML;
          // set the project details
          popup.querySelector(".pp-project-details").innerHTML = details;
          // get the project title
          const title = portfolioItems[itemIndex].querySelector(
            ".portfolio-item-title"
          ).innerHTML;
          // set the project title
          popup.querySelector(".pp-title h2").innerHTML = title;
          // get the project category
          const category =
            portfolioItems[itemIndex].getAttribute("data-category");
          // set the project category
          popup.querySelector(".pp-project-category").innerHTML = category
            .split("-")
            .join(" ");
        }

        projectDetailsBtn.addEventListener("click", () => {
          popupDetailsToggle();
        });

        function popupDetailsToggle() {
          if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");

            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
          } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight =
              projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
          }
        }

         /* ----------------------------------------------------- */
        /* FIX 3 part 2: Check URL on Load for Project Deep Link */
        /* ----------------------------------------------------- */
        const currentHash = window.location.hash.substring(1); // remove '#'
        if(currentHash && currentHash !== 'portfolio' && currentHash !== 'home' && currentHash !== 'about' && currentHash !== 'contact' && currentHash !== 'services') {
            // Find project with matching slug
            portfolioItems.forEach((item, index) => {
                if(item.getAttribute('data-slug') === currentHash) {
                    // Activate portfolio section first (in case we landed here directly)
                    document.querySelector(".section.active").classList.remove("active");
                    document.querySelector("#portfolio").classList.add("active");
                    document.querySelector("#portfolio").classList.remove("hide");
                    
                    itemIndex = index;
                    openPopup();
                }
            });
        }
      });
  };

  getProjects();

  // console.log("1")
})();
/* testimonial sliding feature coming soon */

/*------------------ hide all sections except active -------------------*/
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

window.addEventListener("load", () => {
  //preloader
  // document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);

  // Check if there is a hash in the URL (e.g., #portfolio)
  if (window.location.hash) {
    const hash = window.location.hash;
    // Check if a section with this ID exists
    if (document.querySelector(hash) && document.querySelector(hash).classList.contains("section")) {
      // Deactivate Home (or currently active section)
      document.querySelector(".section.active").classList.add("hide");
      document.querySelector(".section.active").classList.remove("active");
      
      // Activate the requested section
      document.querySelector(hash).classList.add("active");
      document.querySelector(hash).classList.remove("hide");

      // Update Navigation Menu Active State
      const navMenu = document.querySelector(".nav-menu");
      const navItems = navMenu.querySelectorAll(".link-item");
      navItems.forEach((item) => {
        if (hash === item.hash) {
          // Deactivate others
          navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
          navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
          // Activate this one
          item.classList.add("active", "inner-shadow");
          item.classList.remove("outer-shadow", "hover-in-shadow");
        }
      });
    }
  }
});
