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
        window._projects = projects;

        for (let i = 0; i < projects.length; i++) {
          // Create a URL-friendly slug from the project name
          // e.g., "Velin AI" becomes "velin-ai"
          const projectSlug = projects[i].name
            .toLowerCase()
            .split(" ")
            .join("-")
            .replace(/[^a-z0-9-]/g, "");

            const badge      = projects[i].badge || '';
          const badgeColor = projects[i].badgeColor || 'var(--skin-color)';
          const tools      = projects[i].tools || [];
          const chips      = tools.slice(0, 4).map(t => `<span class="port-tool-chip">${t}</span>`).join('') +
            (tools.length > 4 ? `<span class="port-tool-chip">+${tools.length - 4}</span>` : '');
          const cats       = projects[i].categories.filter(c => c !== 'all').join(' · ');

          projectsItemsWrapper.innerHTML += `
          <div class="portfolio-item" data-category="${projects[i].categories.join(' ')}" data-slug="${projectSlug}">
            <div class="portfolio-item-inner outer-shadow">
              <div class="portfolio-item-img">
                <img src="${projects[i].thumbnail}" alt="${projects[i].name}" data-screenshots="${projects[i].imgs}" loading="lazy" decoding="async">
                ${badge ? `<span class="port-card-badge" style="color:${badgeColor};border-color:${badgeColor}">${badge}</span>` : ''}
              </div>
              <div class="portfolio-item-body">
                <div class="portfolio-item-name">${projects[i].name}</div>
                <div class="portfolio-item-sub">${cats}</div>
                <p class="portfolio-item-desc">${projects[i].description}</p>
                <div class="port-card-tools">${chips}</div>
                <span class="port-view-link">View project <i class="fas fa-arrow-right" style="font-size:9px"></i></span>
              </div>
            </div>
          </div>
        `;
        }

        const filterContainer = document.querySelector(".portfolio-filter"),
          portfolioItemsContainer = document.querySelector(".portfolio-items"),
          portfolioItems = document.querySelectorAll(".portfolio-item"),
          noData = document.querySelector(".no-data"),
          popup = document.querySelector(".portfolio-popup"),
          prevBtn = popup.querySelector(".pp-prev"),
          nextBtn = popup.querySelector(".pp-next"),
          closeBtn = popup.querySelector(".pp-close");

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

        // Normalize image path helper
        function normalizeImgPath(src) {
          if (!src) return null;
          let s = src.trim();
          // remove any surrounding quotes
          s = s.replace(/^"|"$/g, "");
          // ignore empty
          if (!s) return null;
          // if path starts with 'portfolio/' remove that prefix
          if (s.startsWith("portfolio/")) {
            s = s.replace(/^portfolio\//, "");
          }
          // ensure leading slash for absolute paths under /img/
          if (
            !s.startsWith("/") &&
            (s.startsWith("img/") ||
              s.startsWith("/img/") ||
              s.includes("/img/"))
          ) {
            if (!s.startsWith("/")) s = "/" + s;
          }
          return s;
        }

        // Helper function to handle opening logic (reused for click and load)
        function openPopup() {
          const raw =
            portfolioItems[itemIndex]
              .querySelector(".portfolio-item-img img")
              .getAttribute("data-screenshots") || "";

          screenshots = raw
            .split(",")
            .map((s) => normalizeImgPath(s))
            .filter(Boolean);

          if (screenshots.length <= 1) {
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
          window.location.hash = "portfolio";
        });

        // Click outside modal closes popup
        popup.addEventListener("click", (e) => {
          if (!e.target.closest(".pp-modal")) {
            popupToggle();
            window.location.hash = "portfolio";
          }
        });

        // ---- Fullscreen expand logic ----
        const expandBtn   = popup.querySelector(".pp-expand-btn");
        const fsOverlay   = document.getElementById("pp-img-fullscreen");
        const fsImg       = document.getElementById("pp-fs-img");
        const fsClose     = document.getElementById("pp-fs-close");
        const fsPrev      = document.getElementById("pp-fs-prev");
        const fsNext      = document.getElementById("pp-fs-next");

        function openFullscreen() {
          if (!fsOverlay) return;
          fsImg.src = screenshots[slideIndex];
          fsOverlay.classList.add("open");
          updateFsNav();
        }
        function closeFullscreen() {
          if (!fsOverlay) return;
          fsOverlay.classList.remove("open");
        }
        function updateFsNav() {
          if (!fsPrev || !fsNext) return;
          fsPrev.style.display = screenshots.length > 1 ? "" : "none";
          fsNext.style.display = screenshots.length > 1 ? "" : "none";
        }

        if (expandBtn) expandBtn.addEventListener("click", openFullscreen);
        if (fsClose)   fsClose.addEventListener("click", closeFullscreen);
        if (fsPrev) fsPrev.addEventListener("click", () => {
          slideIndex = slideIndex === 0 ? screenshots.length - 1 : slideIndex - 1;
          popupSlideshow();
          fsImg.src = screenshots[slideIndex];
        });
        if (fsNext) fsNext.addEventListener("click", () => {
          slideIndex = slideIndex === screenshots.length - 1 ? 0 : slideIndex + 1;
          popupSlideshow();
          fsImg.src = screenshots[slideIndex];
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
          const counter = popup.querySelector(".pp-counter");
          if (screenshots.length > 1) {
            counter.textContent = `${slideIndex + 1} / ${screenshots.length}`;
            counter.style.display = "";
          } else {
            counter.style.display = "none";
          }
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
          const p = (window._projects || [])[itemIndex];
          if (!p) return;

          popup.querySelector(".pp-modal-title").textContent = p.name;
          popup.querySelector(".pp-modal-sub").textContent =
            p.categories.filter(c => c !== "all").join(" · ");
          popup.querySelector(".pp-modal-cats").textContent =
            `${p.date}  ·  ${p.client}`;
          popup.querySelector(".pp-brief-text").textContent = p.description;

          // Action buttons
          const actionBtns = popup.querySelector(".pp-action-btns");
          actionBtns.innerHTML = "";
          if (p.link && p.link !== "#") {
            actionBtns.innerHTML += `<a href="${p.link}" target="_blank" rel="noreferrer" class="pp-live-btn"><i class="fas fa-external-link-alt"></i> Live Site</a>`;
          }
          if (p.github && p.github !== "#") {
            actionBtns.innerHTML += `<a href="${p.github}" target="_blank" rel="noreferrer" class="pp-gh-btn"><i class="fab fa-github"></i> GitHub</a>`;
          }

          // Info rows
          popup.querySelector(".pp-info-rows").innerHTML = `
            <div class="pp-info-row"><span class="pp-info-lbl">Date</span><span class="pp-info-val">${p.date}</span></div>
            <div class="pp-info-row"><span class="pp-info-lbl">Client</span><span class="pp-info-val">${p.client}</span></div>
          `;

          // Tech stack
          popup.querySelector(".pp-tools-wrap").innerHTML =
            (p.tools || []).map(t => `<span class="pp-tool-chip">${t}</span>`).join("");
        }

        /* ----------------------------------------------------- */
        /* FIX 3 part 2: Check URL on Load for Project Deep Link */
        /* ----------------------------------------------------- */
        const currentHash = window.location.hash.substring(1); // remove '#'
        if (
          currentHash &&
          currentHash !== "portfolio" &&
          currentHash !== "home" &&
          currentHash !== "about" &&
          currentHash !== "contact" &&
          currentHash !== "services" &&
          currentHash !== "posts" &&
          currentHash !== "media"
        ) {
          // Find project with matching slug
          portfolioItems.forEach((item, index) => {
            if (item.getAttribute("data-slug") === currentHash) {
              // Activate portfolio section first (in case we landed here directly)
              document
                .querySelector(".section.active")
                .classList.remove("active");
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
    if (
      document.querySelector(hash) &&
      document.querySelector(hash).classList.contains("section")
    ) {
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
          navMenu
            .querySelector(".active")
            .classList.add("outer-shadow", "hover-in-shadow");
          navMenu
            .querySelector(".active")
            .classList.remove("active", "inner-shadow");
          // Activate this one
          item.classList.add("active", "inner-shadow");
          item.classList.remove("outer-shadow", "hover-in-shadow");
        }
      });
    }
  }
});

/*------------------ typing animation -------------------*/
(() => {
  const TYPING_STRINGS = ['Fullstack Engineer (All Ends)', 'AI Engineer (LLMS)', 'Product Engineer (SaaS/Indie)'];
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  let stringIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = TYPING_STRINGS[stringIdx];
    typedEl.textContent = current.slice(0, charIdx);

    if (!deleting) {
      charIdx++;
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIdx--;
      if (charIdx < 0) {
        deleting = false;
        charIdx = 0;
        stringIdx = (stringIdx + 1) % TYPING_STRINGS.length;
      }
    }
    setTimeout(tick, deleting ? 28 : 55);
  }

  tick();
})();

/*------------------ skill category filter (from skills.json) -------------------*/
(() => {
  const grid = document.getElementById('skill-pill-grid');
  const filterContainer = document.querySelector('.skill-cat-filter');
  if (!grid || !filterContainer) return;

  const CATEGORY_ORDER = ['Languages & Frameworks', 'Tools & Technologies', 'Concepts & Knowledge'];

  function renderSkills(tabId, allSkills) {
    const tabSkills = allSkills.filter(s => s.tabs.includes(tabId));
    if (!tabSkills.length) { grid.innerHTML = ''; return; }

    // Group by category
    const groups = {};
    CATEGORY_ORDER.forEach(c => { groups[c] = []; });
    tabSkills.forEach(s => {
      if (groups[s.category]) groups[s.category].push(s);
      else { groups[s.category] = groups[s.category] || []; groups[s.category].push(s); }
    });

    grid.innerHTML = Object.entries(groups)
      .filter(([, skills]) => skills.length > 0)
      .map(([cat, skills]) => `
        <div class="skill-group">
          <div class="skill-group-label">${cat}</div>
          <div class="skill-group-pills">
            ${skills.map(s => `<span class="skill-pill" style="background:${s.color}">${s.name}</span>`).join('')}
          </div>
        </div>`)
      .join('');
  }

  fetch('../../utils/skills.json')
    .then(r => r.json())
    .then(data => {
      window._skillsData = data;

      // Render tabs from JSON
      filterContainer.innerHTML = data.tabs.map((t, i) =>
        `<span class="skill-cat-btn${i === 0 ? ' active' : ''}" data-cat="${t.id}">${t.label}</span>`
      ).join('');

      // Initial render
      renderSkills('all', data.skills);

      // Tab click
      filterContainer.addEventListener('click', e => {
        const btn = e.target.closest('.skill-cat-btn');
        if (!btn) return;
        filterContainer.querySelectorAll('.skill-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSkills(btn.getAttribute('data-cat'), data.skills);
      });
    })
    .catch(() => {});
})();

/*------------------ posts tag filter -------------------*/
(() => {
  const tagBtns = document.querySelectorAll('.post-tag-btn');
  const postItems = document.querySelectorAll('.post-item[data-tag]');
  const featPost = document.getElementById('featured-post');
  if (!tagBtns.length) return;

  const TAG_COLORS = {
    'AI Engineering': '#fb839e',
    'SaaS': '#ec9412',
    'Product': '#1fc586',
    'Workflow': '#2eb1ed',
  };

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tagBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.color = '';
      });
      btn.classList.add('active');
      const tag = btn.getAttribute('data-tag');
      const color = TAG_COLORS[tag];
      if (color) {
        btn.style.background = color;
        btn.style.color = '#fff';
      } else {
        btn.style.background = 'var(--skin-color)';
        btn.style.color = '#fff';
      }

      if (featPost) {
        featPost.style.display = tag === 'all' ? '' : 'none';
      }

      postItems.forEach(item => {
        const show = tag === 'all' || item.getAttribute('data-tag') === tag;
        item.style.display = show ? '' : 'none';
      });
    });
  });
})();

/*------------------ navigate to portfolio project -------------------*/
window.navigateToProject = function (slug) {
  const portfolioSection = document.querySelector("#portfolio");
  const currentActive = document.querySelector(".section.active");
  if (portfolioSection && currentActive !== portfolioSection) {
    currentActive.classList.add("hide");
    currentActive.classList.remove("active");
    portfolioSection.classList.remove("hide");
    portfolioSection.classList.add("active");
    // update nav active state
    const navMenu = document.querySelector(".nav-menu");
    const navActive = navMenu.querySelector(".active");
    if (navActive) {
      navActive.classList.add("outer-shadow", "hover-in-shadow");
      navActive.classList.remove("active", "inner-shadow");
    }
    const portNav = navMenu.querySelector('[href="#portfolio"]');
    if (portNav) {
      portNav.classList.add("active", "inner-shadow");
      portNav.classList.remove("outer-shadow", "hover-in-shadow");
    }
  }
  // find matching item and trigger click
  const item = document.querySelector(`.portfolio-item[data-slug="${slug}"]`);
  if (item) {
    item.querySelector(".portfolio-item-inner").click();
  }
};

/*------------------ featured project card clicks -------------------*/
(() => {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".feat-card[data-project-slug]");
    if (!card) return;
    const slug = card.getAttribute("data-project-slug");
    if (slug) window.navigateToProject(slug);
  });
})();

/*------------------ socials loader -------------------*/
(() => {
  const CONTAINERS = {
    'home-socials-container':         { cls: 'home-social-link outer-shadow hover-in-shadow', tag: 'a' },
    'about-socials-container':        { cls: 'outer-shadow hover-in-shadow', tag: 'a' },
    'posts-socials-container':        { cls: 'post-social-link', tag: 'a' },
    'posts-footer-socials-container': { cls: 'post-social-link', tag: 'a' },
  };

  fetch('../../utils/socials.json')
    .then(r => r.json())
    .then(({ socials }) => {
      Object.entries(CONTAINERS).forEach(([id, cfg]) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = socials.map(s =>
          `<a href="${s.url}" target="_blank" rel="noreferrer" class="${cfg.cls}" title="${s.label}"><i class="${s.icon}"></i></a>`
        ).join('');
      });
    })
    .catch(() => {});
})();

/*------------------ contact loader -------------------*/
(() => {
  const wrapper = document.getElementById('contact-items-wrapper');
  if (!wrapper) return;

  fetch('../../utils/contact.json')
    .then(r => r.json())
    .then(({ contact }) => {
      wrapper.innerHTML = contact.map(item => {
        const lines = item.lines.map(line =>
          item.url ? `<p><a href="${item.url}" target="_blank" rel="noreferrer" style="color:inherit;text-decoration:none">${line}</a></p>` : `<p>${line}</p>`
        ).join('');
        return `
          <div class="contact-item">
            <div class="contact-item-inner outer-shadow">
              <i class="${item.icon}"></i>
              <span>${item.label}</span>
              ${lines}
            </div>
          </div>`;
      }).join('');
    })
    .catch(() => {});
})();
