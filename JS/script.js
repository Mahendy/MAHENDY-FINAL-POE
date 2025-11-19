document.addEventListener('DOMContentLoaded', function() {
  // Safe hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  } else if (!hamburger && navLinks) {
    // Create a simple hamburger button for small screens if not present
    const btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label','Toggle navigation');
    btn.innerHTML = '<span></span><span></span><span></span>';
    // insert before navLinks
    navLinks.parentNode.insertBefore(btn, navLinks);
    btn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      btn.classList.toggle('active');
    });
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (href.length>1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth'});
        }
      }
    });
  });

  // Basic contact form validation (if a form exists)
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e){
      const required = contactForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(inp=>{
        if (!inp.value.trim()) {
          valid = false;
          inp.classList.add('input-error');
        } else {
          inp.classList.remove('input-error');
        }
      });
      if (!valid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  }
});

const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isActive = content.style.display === 'block';

        // Close all content
        const allContents = document.querySelectorAll('.accordion-content');
        allContents.forEach(content => {
            content.style.display = 'none';
        });

        // Toggle current section
        if (!isActive) {
            content.style.display = 'block';
        }
    });
});

function openTab(evt, tabName) {
    // Hide all tabs
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Show the clicked tab and add active class to button
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

// Default open the first tab
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tab-button').click();  // Simulate click to open first tab
});
/* 
===========================================
ACCORDION INTERACTIVE ELEMENT
This script allows the accordion items to
expand and collapse on click.
===========================================
*/

document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(acc => {
        acc.addEventListener("click", function () {
            
            // Toggle active class
            this.classList.toggle("active");

            // Select next element (content panel)
            const content = this.nextElementSibling;

            // Expand or collapse the accordion
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});
/* ============================================================
   ENQUIRY FORM VALIDATION & USER FEEDBACK
   Validates name, email, and message fields.
   Displays success or error messages on submission.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    
    const form = document.getElementById("enquiryForm");
    const feedback = document.getElementById("feedback-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop page reload

        // Get user inputs
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Simple email pattern
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        // Validate Name
        if (name === "") {
            feedback.style.color = "red";
            feedback.textContent = "Please enter your name.";
            return;
        }

        // Validate Email
        if (!email.match(emailPattern)) {
            feedback.style.color = "red";
            feedback.textContent = "Please enter a valid email address.";
            return;
        }

        // Validate Message
        if (message.length < 10) {
            feedback.style.color = "red";
            feedback.textContent = "Message must be at least 10 characters long.";
            return;
        }

        // SUCCESS
        feedback.style.color = "green";
        feedback.textContent = "Thank you! Your enquiry has been submitted successfully.";

        // Optional: clear fields after success
        form.reset();
    });
});
/* =============================================================
   CONTACT FORM VALIDATION + EMAIL PROCESSING (MAILTO)
   Validates user inputs and opens email client with user message.
   ============================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const feedback = document.getElementById("contact-feedback");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // GET VALUES
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        // EMAIL FORMAT
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;

        // VALIDATION
        if (name === "") {
            feedback.style.color = "red";
            feedback.textContent = "Please enter your name.";
            return;
        }

        if (!email.match(emailPattern)) {
            feedback.style.color = "red";
            feedback.textContent = "Please enter a valid email address.";
            return;
        }

        if (subject.length < 3) {
            feedback.style.color = "red";
            feedback.textContent = "Subject must be at least 3 characters long.";
            return;
        }

        if (message.length < 10) {
            feedback.style.color = "red";
            feedback.textContent = "Message must be at least 10 characters long.";
            return;
        }

        // SUCCESS FEEDBACK
        feedback.style.color = "green";
        feedback.textContent = "Message ready to send! Your email app will open now.";

        // PREPARE EMAIL CONTENT FOR MAILTO
        const mailtoLink =
            "mailto:info@GreenValleyEcoTechWasteSolution.co.za"
            + "?subject=" + encodeURIComponent(subject)
            + "&body=" + encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );

        // OPEN EMAIL APPLICATION
        window.location.href = mailtoLink;

        // RESET FORM
        contactForm.reset();
    });
});
// SERVICE PAGE SEARCH FUNCTION
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("serviceSearch");

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const filter = searchInput.value.toLowerCase();
            const services = document.querySelectorAll(".service-box");

            services.forEach(service => {
                const text = service.innerText.toLowerCase();
                service.style.display = text.includes(filter) ? "block" : "none";
            });
        });
    }
});
// Lightbox functionality
document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close");

    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            lightbox.style.display = "block";
            lightboxImg.src = item.src;
            captionText.innerText = item.alt;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Close when clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});
