/* =========================
   ELEMENTS
========================= */

const questionScreen = document.getElementById("question-screen");
const birthdayScreen = document.getElementById("birthday-screen");

const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const noMessage = document.getElementById("no-message");

const confettiContainer = document.getElementById("confetti-container");


/* =========================
   NO BUTTON MESSAGES
========================= */

const messages = [
    "Are you sure? 👀",
    "Think again...",
    "Hmm... suspicious 🤨",
    "Nice try 😂",
    "That's not the answer!",
    "You know you want to say YES ✨",
    "Nope 😌",
    "Try catching me!"
];

let messageIndex = 0;


/* =========================
   DESKTOP NO BUTTON
========================= */

function moveNoButton() {

    /*
        On desktop the button escapes
        when the mouse gets close.
    */

    const isMobile = window.innerWidth <= 700;

    if (isMobile) {
        return;
    }

    const buttonRect = noButton.getBoundingClientRect();

    const maxX = window.innerWidth - buttonRect.width - 30;
    const maxY = window.innerHeight - buttonRect.height - 30;

    const randomX = Math.max(
        20,
        Math.random() * maxX
    );

    const randomY = Math.max(
        20,
        Math.random() * maxY
    );

    noButton.style.position = "fixed";

    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;

    noButton.style.zIndex = "50";

    noButton.style.transform =
        `rotate(${Math.random() * 20 - 10}deg)`;

    noMessage.textContent =
        messages[messageIndex];

    messageIndex++;

    if (messageIndex >= messages.length) {
        messageIndex = 0;
    }
}


/* =========================
   DESKTOP HOVER
========================= */

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/* =========================
   MOBILE NO BUTTON
========================= */

noButton.addEventListener(
    "click",
    () => {

        const isMobile = window.innerWidth <= 700;

        if (!isMobile) {
            return;
        }

        noMessage.textContent =
            "Oops... this button doesn't work today 🥺";

        noButton.textContent = "NOPE 🙃";

        noButton.disabled = true;

        noButton.style.opacity = "0.45";

        noButton.style.transform =
            "scale(0.8)";

        yesButton.style.transform =
            "scale(1.12)";

        yesButton.style.boxShadow =
            "0 0 45px rgba(231, 191, 209, 0.45)";
    }
);


/* =========================
   YES BUTTON
========================= */

yesButton.addEventListener(
    "click",
    startBirthday
);


function startBirthday() {

    /*
        Hide question screen
    */

    questionScreen.classList.remove("active");

    /*
        Small delay makes the
        transition feel smoother.
    */

    setTimeout(() => {

        birthdayScreen.classList.add("active");

        createConfetti();

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 250);
}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const amount = 90;

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.classList.add("confetti");

        /*
            Random horizontal position
        */

        piece.style.left =
            `${Math.random() * 100}vw`;

        /*
            Random size
        */

        const width =
            Math.random() * 7 + 4;

        const height =
            Math.random() * 12 + 6;

        piece.style.width =
            `${width}px`;

        piece.style.height =
            `${height}px`;

        /*
            Random rotation
        */

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        /*
            Random animation duration
        */

        piece.style.animationDuration =
            `${Math.random() * 3 + 3}s`;

        /*
            Random delay
        */

        piece.style.animationDelay =
            `${Math.random() * 1.5}s`;

        /*
            Different colors
        */

        const colors = [
            "#f4c9d9",
            "#e6c0d0",
            "#f0d8c2",
            "#c7c4d9",
            "#ffffff"
        ];

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        confettiContainer.appendChild(piece);

        /*
            Remove after animation
        */

        setTimeout(() => {

            piece.remove();

        }, 6000);
    }
}


/* =========================
   CAROUSEL
========================= */

/*
    We duplicate the photos with JS.

    This makes the carousel seamless:
    
    1 2 3 4 | 1 2 3 4

    When the animation reaches the
    second copy, it looks exactly like
    the beginning.
*/

const carouselTrack =
    document.getElementById("carousel-track");

const photoCards =
    Array.from(
        carouselTrack.children
    );

photoCards.forEach(card => {

    const clone =
        card.cloneNode(true);

    carouselTrack.appendChild(clone);

});


/* =========================
   PREVENT IMAGE DRAGGING
========================= */

document
    .querySelectorAll(".photo-card img")
    .forEach(img => {

        img.addEventListener(
            "dragstart",
            event => {
                event.preventDefault();
            }
        );

    });