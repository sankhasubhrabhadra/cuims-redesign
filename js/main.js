/* ==========================================
   CUIMS — JavaScript with Mascot AI
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    initScrollAnimations();
    initNavbarScroll();
    initHelpModal();
    initCounters();
    initCardTilt();
    initAcademicCalendar();
    initMascot();
});

// ===================
// Particle Canvas
// ===================
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = -(Math.random() * 0.5 + 0.15);
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.35 + 0.05;
        }
        update() { this.y += this.speedY; this.x += this.speedX; if (this.y < -10) this.reset(); }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(204,0,0,${this.opacity})`;
            ctx.fill();
        }
    }
    for (let i = 0; i < 50; i++) { const p = new Particle(); p.y = Math.random() * height; particles.push(p); }
    function animate() { ctx.clearRect(0, 0, width, height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
    animate();
}

// ===================
// Scroll Animations
// ===================
function initScrollAnimations() {
    const els = document.querySelectorAll('.anim-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), parseInt(entry.target.dataset.delay) || 0);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => observer.observe(el));
}

// ===================
// Navbar Scroll
// ===================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50), { passive: true });
}

// ===================
// Help Modal
// ===================
function initHelpModal() {
    const helpBtn = document.getElementById('helpBtn');
    const modal = document.getElementById('helpModal');
    const closeBtn = document.getElementById('closeModal');
    if (!helpBtn || !modal) return;
    helpBtn.addEventListener('click', e => { e.preventDefault(); modal.classList.add('active'); });
    closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('active'); });
}

// ===================
// Counter Animation
// ===================
function initCounters() {
    const counters = document.querySelectorAll('.stat-item__num');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const start = performance.now();
    function update(now) {
        const p = Math.min((now - start) / 2000, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * target).toLocaleString();
        if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ===================
// Card Tilt
// ===================
function initCardTilt() {
    document.querySelectorAll('.clay-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const rX = ((e.clientY - r.top - r.height/2) / (r.height/2)) * -3;
            const rY = ((e.clientX - r.left - r.width/2) / (r.width/2)) * 3;
            card.style.transform = `perspective(800px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===================
// Academic Calendar
// ===================
function initAcademicCalendar() {
    const container = document.getElementById('calendarEvents');
    if (!container) return;
    const allEvents = [
        { date:'2026-07-01', display:'01 Jul 2026', day:'Wed', desc:'Start of Registration 2nd Year onwards — ODD Semester [All Programs]' },
        { date:'2026-07-14', display:'14 Jul 2026', day:'Tue', desc:'Start of Semester for 2nd Year and 4th Year (All Programs) except MBA 2nd Year' },
        { date:'2026-07-15', display:'15 Jul 2026', day:'Wed', desc:'Start of Semester for 3rd Year and 5th Year (All Programs)' },
        { date:'2026-07-20', display:'20 Jul 2026', day:'Mon', desc:'Orientation & Induction 1st Year [All Programs] Batch I' },
        { date:'2026-07-21', display:'21 Jul 2026', day:'Tue', desc:'Start of Semester — 1st Year [All Programs] Batch I' },
        { date:'2026-07-24', display:'24 Jul 2026', day:'Fri', desc:'Start of Semester, MBA 2nd Year' },
        { date:'2026-08-24', display:'24 Aug 2026', day:'Mon', desc:'Orientation & Induction 1st Year [All Programs] Batch II' },
        { date:'2026-08-25', display:'25 Aug 2026', day:'Tue', desc:'Start of Semester, 1st Year [All Programs] Batch II' },
        { date:'2026-08-24', display:'24 Aug 2026', day:'Mon', desc:'In Semester Test 1 [IST-1] All Years — 1st Year Batch I' },
        { date:'2026-09-18', display:'18 Sep 2026', day:'Fri', desc:"Fresher's Party 2026 Intake [All Programs]" },
        { date:'2026-09-26', display:'26 Sep 2026', day:'Sat', desc:'Orientation & Induction [International Students] 1st Year' },
        { date:'2026-09-28', display:'28 Sep 2026', day:'Mon', desc:'Practical IST All Years [All Programs]' },
        { date:'2026-10-05', display:'05 Oct 2026', day:'Mon', desc:'Value Added Courses (VAC) Week' },
        { date:'2026-10-12', display:'12 Oct 2026', day:'Mon', desc:'In Semester Test 2 [IST-2] All Years [All Programs]' },
        { date:'2026-11-09', display:'09 Nov 2026', day:'Mon', desc:'Diwali Break for Students' },
        { date:'2026-11-13', display:'13 Nov 2026', day:'Fri', desc:'Last Teaching Day — All Years (All Programs, Except UID)' },
        { date:'2026-11-16', display:'16 Nov 2026', day:'Mon', desc:'End Sem. Practical Exam Regular & Reappear — All Years' },
        { date:'2026-11-20', display:'20 Nov 2026', day:'Fri', desc:'Last Teaching Day — All Years (All Programs of UID)' },
        { date:'2026-11-23', display:'23 Nov 2026', day:'Mon', desc:'End Sem. Theory Exams — Regular & Reappear (Except UID)' },
        { date:'2026-11-30', display:'30 Nov 2026', day:'Mon', desc:'End Sem. Theory Exams — Regular & Reappear (UID Programs)' },
        { date:'2026-12-15', display:'15 Dec 2026', day:'Tue', desc:'Winter Term 2026' },
        { date:'2026-12-19', display:'19 Dec 2026', day:'Sat', desc:'End of Semester — All Years [All Programs]' },
        { date:'2026-12-21', display:'21 Dec 2026', day:'Mon', desc:'Start of Registration for Even Semester [All Programs]' },
        { date:'2027-01-02', display:'02 Jan 2027', day:'Sat', desc:'Announcement of Results' },
    ];
    const today = new Date(); today.setHours(0,0,0,0);
    const upcoming = allEvents.filter(e => new Date(e.date) >= today);
    if (!upcoming.length) { container.innerHTML = '<p style="color:var(--gray-500);padding:0.75rem 0;">No upcoming events.</p>'; return; }

    container.innerHTML = upcoming.map(ev => `
        <div class="event-item">
            <div class="event-date"><strong>${ev.display}</strong><span>${ev.day}</span></div>
            <div class="event-details"><p>${ev.desc}</p></div>
        </div>`).join('');

    // Add scroll hint if more than 3 events
    if (upcoming.length > 3) {
        const hint = document.createElement('div');
        hint.className = 'scroll-hint';
        hint.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg> Scroll for more events';
        container.parentElement.appendChild(hint);

        // Hide hint once user scrolls
        container.addEventListener('scroll', () => {
            if (container.scrollTop > 20) hint.style.opacity = '0';
            else hint.style.opacity = '1';
        });
    }
}

// ============================================
// MASCOT CHARACTER — INTERACTIVE AI
// ============================================
function initMascot() {
    const mascot = document.getElementById('mascot');
    const mascotBody = document.getElementById('mascotBody');
    const pupilLeft = document.getElementById('pupilLeft');
    const pupilRight = document.getElementById('pupilRight');
    const eyeLeft = document.getElementById('eyeLeft');
    const eyeRight = document.getElementById('eyeRight');
    const speechBubble = document.getElementById('speechBubble');
    const speechText = document.getElementById('speechText');

    if (!mascot || !pupilLeft || !pupilRight) return;

    let isReacting = false;
    let speechTimeout = null;
    let blinkInterval = null;
    let idleTimeout = null;

    // --- Eye Tracking ---
    document.addEventListener('mousemove', (e) => {
        if (isReacting) return;
        trackEyes(e.clientX, e.clientY);
        tiltBody(e.clientX, e.clientY);
    });

    function trackEyes(mx, my) {
        [pupilLeft, pupilRight].forEach(pupil => {
            const eye = pupil.parentElement;
            const rect = eye.getBoundingClientRect();
            const eyeCX = rect.left + rect.width / 2;
            const eyeCY = rect.top + rect.height / 2;

            const angle = Math.atan2(my - eyeCY, mx - eyeCX);
            const distance = Math.min(
                Math.hypot(mx - eyeCX, my - eyeCY) / 15,
                4
            );
            const px = Math.cos(angle) * distance;
            const py = Math.sin(angle) * distance;

            pupil.style.transform = `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`;
        });
    }

    function tiltBody(mx, my) {
        const rect = mascotBody.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const dx = (mx - cx) / window.innerWidth * 8;
        mascot.style.transform = `rotate(${dx}deg)`;
    }

    // --- Blinking ---
    function startBlinking() {
        blinkInterval = setInterval(() => {
            eyeLeft.classList.add('blink');
            eyeRight.classList.add('blink');
            setTimeout(() => {
                eyeLeft.classList.remove('blink');
                eyeRight.classList.remove('blink');
            }, 150);
        }, 3000 + Math.random() * 2000);
    }
    startBlinking();

    // --- Speech ---
    function showSpeech(text, duration = 3000) {
        if (speechTimeout) clearTimeout(speechTimeout);
        speechText.textContent = text;
        speechBubble.classList.add('show');
        speechTimeout = setTimeout(() => speechBubble.classList.remove('show'), duration);
    }

    // Show greeting on load
    setTimeout(() => showSpeech("Hey there! Welcome to CUIMS! 👋", 4000), 1500);

    // --- Reactions ---
    function triggerReaction(type, speech) {
        if (isReacting) return;
        isReacting = true;

        // Clear previous states
        mascot.className = 'mascot';

        // Show speech
        if (speech) showSpeech(speech, 3500);

        // Add blush
        mascot.classList.add('blushing');

        switch (type) {
            case 'excited':
                mascot.classList.add('excited');
                mascot.classList.add('jump');
                break;
            case 'wave':
                mascot.classList.add('happy');
                mascot.classList.add('wave');
                break;
            case 'salute':
                mascot.classList.add('happy');
                mascot.classList.add('salute');
                break;
            case 'jump':
                mascot.classList.add('excited');
                mascot.classList.add('jump');
                break;
            case 'spin':
                mascot.classList.add('surprised');
                mascot.classList.add('spin');
                break;
            default:
                mascot.classList.add('happy');
        }

        setTimeout(() => {
            mascot.className = 'mascot';
            isReacting = false;
        }, 1200);
    }

    // --- Click on Mascot ---
    mascot.addEventListener('click', () => {
        const reactions = [
            { type: 'spin', speech: "Whee! That tickles! 😄" },
            { type: 'jump', speech: "Boing! Higher! Higher! 🚀" },
            { type: 'excited', speech: "You clicked me! I love attention! ❤️" },
            { type: 'wave', speech: "Hi hi hi! Nice to meet you! 🙌" },
        ];
        const r = reactions[Math.floor(Math.random() * reactions.length)];
        triggerReaction(r.type, r.speech);
    });

    // --- Hover/Click on Cards & Buttons ---
    document.querySelectorAll('.mascot-trigger').forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            const reaction = trigger.dataset.reaction || 'wave';
            const speech = trigger.dataset.speech || "Interesting choice! 🤔";
            triggerReaction(reaction, speech);
        });
    });

    // --- Idle Behavior ---
    const idleMessages = [
        "Need help picking a portal? 🤔",
        "I'm watching you... in a friendly way! 👀",
        "Did you check your attendance today? 📊",
        "CU is the best university! ❤️",
        "Try clicking on me! 😉",
        "Don't forget to download our app! 📱",
        "Have a great semester! 🎓",
    ];

    function startIdleBehavior() {
        idleTimeout = setInterval(() => {
            if (!isReacting) {
                const msg = idleMessages[Math.floor(Math.random() * idleMessages.length)];
                showSpeech(msg, 3000);
                // Random small reaction
                const smallReactions = ['happy', 'wave'];
                const r = smallReactions[Math.floor(Math.random() * smallReactions.length)];
                triggerReaction(r, null);
            }
        }, 12000 + Math.random() * 8000);
    }
    startIdleBehavior();

    // --- Touch support for mobile ---
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            trackEyes(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });
}
