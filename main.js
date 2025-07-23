// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Active State
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for section animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Image loading animation
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            // Add loading spinner
            const originalContent = this.innerHTML;
            this.classList.add('loading');
            this.innerHTML = '<div class="loading-spinner"></div>';
            
            setTimeout(() => {
                ripple.remove();
                this.classList.remove('loading');
                this.innerHTML = originalContent;
            }, 1000);
        }
    });
});

// Animate numbers in pricing
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate pricing when visible
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const priceElement = entry.target;
            const price = parseInt(priceElement.textContent);
            animateValue(priceElement, 0, price, 1000);
            priceObserver.unobserve(priceElement);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.pricing-card-title').forEach(price => {
    priceObserver.observe(price);
});

// Add parallax effect to course headers
window.addEventListener('scroll', function() {
    const headers = document.querySelectorAll('.course-header');
    headers.forEach(header => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        header.style.backgroundPositionY = `${rate}px`;
    });
});

// Add hover effect for teacher cards
document.querySelectorAll('.teacher-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.teacher-card-inner').style.transform = 'rotateY(180deg)';
    });
    card.addEventListener('mouseleave', function() {
        this.querySelector('.teacher-card-inner').style.transform = 'rotateY(0deg)';
    });
});

// Animate list items sequentially
function animateListItems() {
    const lists = document.querySelectorAll('.list-group, .list-unstyled');
    lists.forEach(list => {
        const items = list.children;
        Array.from(items).forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    animateListItems();
});

// Form Submission Handler
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (!name || !email || !message) {
            alert('من فضلك أكمل جميع الحقول المطلوبة');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
        contactForm.reset();
    });
}

// Mobile Menu Toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            navbarCollapse.classList.remove('show');
        }
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
        });
    });
} 

// Form validation and animation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}); 

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.querySelector('.scroll-top');
    
    if (scrollButton) {
        // تحديث حالة الزر عند التمرير
        function updateScrollButtonVisibility() {
            if (window.scrollY > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        }

        // إضافة مستمع لحدث التمرير
        window.addEventListener('scroll', updateScrollButtonVisibility);

        // إضافة مستمع لحدث النقر على الزر
        scrollButton.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToTop();
        });

        // التحقق من حالة التمرير عند تحميل الصفحة
        updateScrollButtonVisibility();
    }
});

// Remove duplicate scroll to top code
const duplicateScrollButton = document.querySelector('.scroll-to-top');
if (duplicateScrollButton) {
    duplicateScrollButton.remove();
}

// Observe elements for animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate pricing if it's a pricing element
            if (entry.target.classList.contains('pricing-card-title')) {
                const price = parseInt(entry.target.textContent);
                animateValue(entry.target, 0, price, 1000);
            }
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections and pricing elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section, .pricing-card-title').forEach(el => {
        observer.observe(el);
    });
}); 



window.onscroll = function () {
    scrollFunction();
  };
  
  function scrollFunction() {
    const btn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  }
  
  // كود زر العودة للأعلى
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
  