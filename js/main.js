/* ==========================================
   CUIMS — JavaScript Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Particle System ---
    createParticles();

    // --- Scroll Animations ---
    initScrollAnimations();

    // --- Navbar Scroll Effect ---
    initNavbarScroll();

    // --- Help Modal ---
    initHelpModal();

    // --- Counter Animation ---
    initCounters();

    // --- Card Tilt Effect ---
    initCardTilt();

    // --- Academic Calendar ---
    initAcademicCalendar();
});

// ===================
// Particle System
// ===================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = 40;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = (Math.random() * 3 + 1) + 'px';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        container.appendChild(particle);
    }
}

// ===================
// Scroll Animations (Intersection Observer)
// ===================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-in');

    // Trigger elements that are already visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===================
// Navbar Scroll
// ===================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });
}

// ===================
// Help Modal
// ===================
function initHelpModal() {
    const helpBtn = document.getElementById('helpBtn');
    const modal = document.getElementById('helpModal');
    const closeBtn = document.getElementById('closeModal');

    if (!helpBtn || !modal) return;

    helpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });

    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// ===================
// Counter Animation
// ===================
function initCounters() {
    const counters = document.querySelectorAll('.stat__number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.round(easedProgress * target);

        el.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ===================
// Card Tilt Effect
// ===================
function initCardTilt() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===================
// Academic Calendar
// ===================
function initAcademicCalendar() {
    const calendarContainer = document.getElementById('calendar-events');
    if (!calendarContainer) return;

    // Academic Calendar Events (from image)
    const allEvents = [
        { date: '2026-07-01', displayDate: '01-07-2026', day: 'Wed', desc: 'Start of Registration 2nd Year onwards Students [All Programs] for ODD Semester' },
        { date: '2026-07-14', displayDate: '14-07-2026', day: 'Tue', desc: 'Start of Semester for 2nd Year and 4th Year (All Programs) except MBA 2nd Year' },
        { date: '2026-07-15', displayDate: '15-07-2026', day: 'Wed', desc: 'Start of Semester for 3rd Year and 5th Year (All Programs)' },
        { date: '2026-07-20', displayDate: '20-07-2026', day: 'Mon', desc: 'Orientation & Induction 1st Year [All Programs] Batch I' },
        { date: '2026-07-21', displayDate: '21-07-2026', day: 'Tue', desc: 'Start of Semester-1st Year [All Programs] Batch I' },
        { date: '2026-07-24', displayDate: '24-07-2026', day: 'Fri', desc: 'Start of Semester, MBA 2nd Year' },
        { date: '2026-08-24', displayDate: '24-08-2026', day: 'Mon', desc: 'Orientation & Induction 1st Year [All Programs] Batch II' },
        { date: '2026-08-25', displayDate: '25-08-2026', day: 'Tue', desc: 'Start of Semester, 1st Year [All Programs] Batch II' },
        { date: '2026-09-18', displayDate: '18-09-2026', day: 'Fri', desc: 'Fresher\'s Party-2026 Intake [All Programs]' },
        { date: '2026-09-26', displayDate: '26-09-2026', day: 'Sat', desc: 'Orientation & Induction [International Students] 1st Year [All Programs]' },
        { date: '2026-09-28', displayDate: '28-09-2026', day: 'Mon', desc: 'Practical IST All Years [All Programs]' },
        { date: '2026-10-05', displayDate: '05-10-2026', day: 'Mon', desc: 'Value Added Courses (VAC) Week' },
        { date: '2026-10-12', displayDate: '12-10-2026', day: 'Mon', desc: 'In Semester Test 2 [IST-2] All Years [All Programs]' },
        { date: '2026-11-09', displayDate: '09-11-2026', day: 'Mon', desc: 'Diwali Break for Students' },
        { date: '2026-11-13', displayDate: '13-11-2026', day: 'Fri', desc: 'Last Teaching Day - All Years' }
    ];

    const today = new Date();
    // Reset time part to midnight for accurate day comparison
    today.setHours(0, 0, 0, 0);

    // Filter events that are today or in the future
    const upcomingEvents = allEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
    });

    // Get the next 3 events
    const nextEvents = upcomingEvents.slice(0, 3);

    calendarContainer.innerHTML = '';

    if (nextEvents.length === 0) {
        calendarContainer.innerHTML = '<p style="color: var(--gray-500); padding: 10px 0;">No upcoming events currently scheduled.</p>';
        return;
    }

    nextEvents.forEach(event => {
        const eventHtml = `
            <div class="event-item">
                <div class="event-date">
                    <strong>${event.displayDate}</strong>
                    <span>${event.day}</span>
                </div>
                <div class="event-details">
                    <p>${event.desc}</p>
                </div>
            </div>
        `;
        calendarContainer.innerHTML += eventHtml;
    });
}
