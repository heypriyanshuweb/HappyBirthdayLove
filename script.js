/* ==========================================
   ROMANTIC BIRTHDAY EXPERIENCE
========================================== */

const scenes = document.querySelectorAll(".scene");


/* ==========================================
   SCENE SWITCHING
========================================== */

function showScene(id) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        setTimeout(() => {
            target.classList.add("active");
        }, 80);
    }
}


/* ==========================================
   FLOATING HEARTS
========================================== */

const floatingHearts =
    document.getElementById("floatingHearts");

function createFloatingHeart() {

    const heart =
        document.createElement("div");

    heart.className = "float-heart";

    const symbols = [
        "♥",
        "♡",
        "❤",
        "✦",
        "✧"
    ];

    heart.textContent =
        symbols[
            Math.floor(Math.random() * symbols.length)
        ];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (8 + Math.random() * 15) + "px";

    heart.style.animationDuration =
        (7 + Math.random() * 7) + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000);
}

setInterval(createFloatingHeart, 700);

for (let i = 0; i < 10; i++) {
    setTimeout(createFloatingHeart, i * 300);
}


/* ==========================================
   START
========================================== */

document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        heartBurst();

        showScene("catScene");

    });


/* ==========================================
   CAT INTRO
========================================== */

const catSpeech =
    document.getElementById("catSpeech");

const catTitle =
    document.getElementById("catTitle");

const catText =
    document.getElementById("catText");

let catStep = 0;

document
    .getElementById("catNext")
    .addEventListener("click", () => {

        catStep++;

        if (catStep === 1) {

            catSpeech.textContent =
                "pssst... over here 👀";

            catTitle.textContent =
                "Don't tell anyone...";

            catText.textContent =
                "I prepared a tiny little game for you. " +
                "And yes, you have to play it. 😼";

        }

        else if (catStep === 2) {

            catSpeech.textContent =
                "promise you won't cheat? 🤨";

            catTitle.textContent =
                "Okay... let's test you.";

            catText.textContent =
                "There are two missions waiting for you. " +
                "Complete them and you'll reach the surprise.";

        }

        else {

            showScene("puzzleScene");

        }

    });


/* ==========================================
   PUZZLE
========================================== */

const pieces =
    document.querySelectorAll(".piece");

const puzzleStatus =
    document.getElementById("puzzleStatus");

const puzzleHeart =
    document.getElementById("puzzleHeart");

const puzzleNext =
    document.getElementById("puzzleNext");

let selectedPieces = [];

pieces.forEach(piece => {

    piece.addEventListener("click", () => {

        const value =
            Number(piece.dataset.piece);

        if (selectedPieces.includes(value)) {
            return;
        }

        selectedPieces.push(value);

        piece.classList.add("selected");

        const remaining =
            4 - selectedPieces.length;

        if (remaining > 0) {

            puzzleStatus.textContent =
                remaining +
                " piece" +
                (remaining === 1 ? "" : "s") +
                " left...";

        } else {

            puzzleStatus.textContent =
                "The heart is complete! ❤️";

            puzzleHeart.classList.add("unlocked");

            puzzleNext.classList.remove("hidden");

            heartBurst();

        }

    });

});


puzzleNext.addEventListener("click", () => {

    showScene("loveScene");

});


/* ==========================================
   LOVE QUESTION
========================================== */

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const noMessage =
    document.getElementById("noMessage");

const questionMessage =
    document.getElementById("questionMessage");

let noCount = 0;


/* YES */

yesBtn.addEventListener("click", () => {

    heartBurst();

    createConfetti();

    setTimeout(() => {

        showScene("yesScene");

    }, 400);

});


/* NO */

noBtn.addEventListener("click", () => {

    noCount++;

    const messages = [

        "Are you sure? 🥺",

        "Think again... 👀",

        "Really really sure? 😭",

        "The cat is judging you. 🐱",

        "Please reconsider... ❤️",

        "I don't think that was the right answer. 😭",

        "One more chance? 🥹",

        "Okay... I'll wait. 😔",

        "You're breaking my little heart. 💔"

    ];

    const index =
        Math.min(
            noCount - 1,
            messages.length - 1
        );

    noMessage.textContent =
        messages[index];

    questionMessage.textContent =
        "Hmm... let's try that again.";

    /* Make NO button run away */

    const area =
        document.getElementById("loveButtons");

    const maxX =
        Math.max(
            10,
            area.clientWidth / 2 - 70
        );

    const x =
        (Math.random() * maxX * 2) - maxX;

    const y =
        (Math.random() * 80) - 40;

    noBtn.style.transform =
        `translate(${x}px, ${y}px)`;

    /* YES gets bigger */

    const yesScale =
        Math.min(
            1.35,
            1 + noCount * .06
        );

    yesBtn.style.transform =
        `scale(${yesScale})`;

    if (noCount >= 5) {

        noMessage.textContent =
            "Okay... the NO button is tired now. 😭❤️";

        noBtn.textContent =
            "NO... 🥺";

    }

});


/* ==========================================
   GIFT SCENE
========================================== */

document
    .getElementById("giftBtn")
    .addEventListener("click", () => {

        showScene("giftScene");

    });


const gifts =
    document.querySelectorAll(".gift");

const giftResult =
    document.getElementById("giftResult");

let giftChosen = false;

gifts.forEach(gift => {

    gift.addEventListener("click", () => {

        if (giftChosen) {
            return;
        }

        giftChosen = true;

        gift.classList.add("open");

        giftResult.textContent =
            "You found it! ✨";

        createConfetti();

        setTimeout(() => {

            showScene("birthdayScene");

        }, 1600);

    });

});


/* ==========================================
   BIRTHDAY CAKE
========================================== */

const blowBtn =
    document.getElementById("blowBtn");

const cake =
    document.querySelector(".cake");

const birthdayMessage =
    document.getElementById("birthdayMessage");

let candlesBlown = false;

blowBtn.addEventListener("click", () => {

    if (candlesBlown) {
        return;
    }

    candlesBlown = true;

    cake.classList.add("blown");

    blowBtn.textContent =
        "Wish sent to the universe ✨";

    birthdayMessage.textContent =
        "I hope every beautiful wish you make comes true. ❤️";

    createConfetti();

    setTimeout(() => {

        showScene("finalScene");

        heartBurst();

    }, 4000);

});


/* ==========================================
   CONFETTI
========================================== */

function createConfetti() {

    const colors = [
        "#ff4778",
        "#ff8fab",
        "#ffd1dc",
        "#ffffff",
        "#ffba4b"
    ];

    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        piece.style.animationDelay =
            Math.random() * .8 + "s";

        piece.style.animationDuration =
            (2 + Math.random() * 2) + "s";

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 5000);

    }

}


/* ==========================================
   HEART BURST
========================================== */

function heartBurst() {

    for (let i = 0; i < 25; i++) {

        const heart =
            document.createElement("div");

        heart.textContent = "♥";

        heart.style.position =
            "absolute";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.zIndex =
            "50";

        heart.style.color =
            "#ff527b";

        heart.style.fontSize =
            (8 + Math.random() * 18) + "px";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 250;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.2)
                        rotate(360deg)`,

                    opacity: 0
                }
            ],
            {
                duration:
                    900 + Math.random() * 900,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);

    }

}


/* ==========================================
   REPLAY
========================================== */

document
    .getElementById("replayBtn")
    .addEventListener("click", () => {

        location.reload();

    });