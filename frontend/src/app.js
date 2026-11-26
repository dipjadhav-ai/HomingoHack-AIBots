
// Mobile Navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});


// Login Modal
const modal = document.getElementById('loginModal');

const openModal = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('email').focus();
};

const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
};

document.getElementById('loginOpen').addEventListener('click', openModal);

document.getElementById('loginClose').addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});


// Login Form
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById('loginMessage').textContent =
        'Frontend demo only — connect an authentication service to enable real login.';
});


// Signup Option
document.getElementById('signupLink').addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('loginMessage').textContent =
        'Sign-up can be connected when the authentication backend is added.';
});


// AI Assistant - Question Handling
const question = document.getElementById('question');
const answer = document.getElementById('demoAnswer');

function askQuestion(value) {

    const q = (value || question.value).trim();

    if (!q) {
        question.focus();
        return;
    }

    answer.textContent =
        'Thanks for your question: "' + q + '". Upload an official scheme PDF and connect the document Q&A backend to receive an evidence-based answer with page citations. Please confirm final eligibility on the official portal.';

    answer.classList.add('visible');
}


// Submit Question
document.getElementById('askButton').addEventListener('click', () => {
    askQuestion();
});

question.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        askQuestion();
    }
});


// Suggested Questions
document.querySelectorAll('.suggestion').forEach(btn => {

    btn.addEventListener('click', () => {

        question.value = btn.textContent;

        askQuestion(btn.textContent);

    });

});


// PDF Upload
document.getElementById('documentUpload').addEventListener('change', (e) => {

    const file = e.target.files[0];

    const status = document.getElementById('fileStatus');

    if (!file) {
        status.textContent = 'No document selected';
        return;
    }

    if (file.type !== 'application/pdf') {

        status.textContent = 'Please choose a PDF document.';

        e.target.value = '';

        return;
    }

    status.textContent =
        'Selected: ' + file.name +
        ' — connect the upload API to process this document.';

});
