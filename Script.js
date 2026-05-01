 class TypingLab {
    constructor() {
        this.quotes = {
            easy: [
                        "The only way to do great work is to love what you do.",
                        "Life is what happens when you're busy making other plans.",
                        "Innovation distinguishes between a leader and a follower.",
                        "Stay hungry, stay foolish.",
                        "The future belongs to those who believe in the beauty of their dreams."
                    ],
                    medium: [
                        "Your time is limited, so don't waste it living someone else's life.",
                        "The only true wisdom is in knowing you know nothing.",
                        "It is during our darkest moments that we must focus to see the light.",
                        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
                        "The best time to plant a tree was 20 years ago. The second best time is now."
                    ],
                    hard: [
                        "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
                        "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
                        "Anyone who has never made a mistake has never tried anything new.",
                        "Logic will get you from A to B. Imagination will take you everywhere.",
                        "A person who never made a mistake never tried anything new."
                    ]
                };

                this.currentQuote = '';
                this.currentQuoteIndex = 0;
                this.startTime = 0;
                this.errors = 0;
                this.difficulty = 'easy';

                this.initializeElements();
                this.bindEvents();
                this.newQuote();
            }

            initializeElements() {
                this.quoteDisplay = document.getElementById('quote-display');
                this.typingInput = document.getElementById('typing-input');
                this.wpmEl = document.getElementById('wpm');
                this.accuracyEl = document.getElementById('accuracy');
                this.errorsEl = document.getElementById('errors');
                this.progressFill = document.getElementById('progress-fill');
                this.newQuoteBtn = document.getElementById('new-quote');
                this.restartBtn = document.getElementById('restart');
            }

            bindEvents() {
                this.typingInput.addEventListener('input', () => this.onInput());
                this.newQuoteBtn.addEventListener('click', () => this.newQuote());
                this.restartBtn.addEventListener('click', () => this.restart());
                
                document.querySelectorAll('.difficulty-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => this.setDifficulty(e.target.dataset.difficulty));
                });

                // Allow Enter to start/restart
                this.typingInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !this.currentQuote) {
                        this.newQuote();
                    }
                });
            }

            setDifficulty(difficulty) {
                this.difficulty = difficulty;
                document.querySelectorAll('.difficulty-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
                });
                this.newQuote();
            }

            newQuote() {
                const quotes = this.quotes[this.difficulty];
                this.currentQuoteIndex = Math.floor(Math.random() * quotes.length);
                this.currentQuote = quotes[this.currentQuoteIndex];
                this.quoteDisplay.innerHTML = this.renderQuote();
                this.typingInput.value = '';
                this.typingInput.focus();
                this.startTime = 0;
                this.updateStats();
                this.typingInput.disabled = false;
            }

            renderQuote() {
                let html = '';
                for (let i = 0; i < this.currentQuote.length; i++) {
                    if (i < this.currentQuoteIndex) {
                        html += `<span class="correct">${this.escapeHtml(this.currentQuote[i])}</span>`;
                    } else if (i === this.currentQuoteIndex) {
                        html += `<span class="cursor">${this.escapeHtml(this.currentQuote[i])}</span>`;
                    } else {
                        html += this.escapeHtml(this.currentQuote[i]);
                    }
                }
                return html;
            }

            escapeHtml(text) {
                const map = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                };
                return text.replace(/[&<>"']/g, m => map[m]);
            }

            onInput() {
                if (!this.startTime) this.startTime = Date.now();

                const typedText = this.typingInput.value;
                this.currentQuoteIndex = typedText.length;

                // Check for errors
                for (let i = 0; i < typedText.length; i++) {
                    if (typedText[i] !== this.currentQuote[i]) {
                        this.errors++;
                        break;
                    }
                }

                this.quoteDisplay.innerHTML = this.renderQuote();
                this.updateProgress();
                this.updateStats();

                // Check if quote completed
                if (typedText === this.currentQuote) {
                    this.completeQuote();
                }
            }

            updateProgress() {
                const progress = (this.currentQuoteIndex / this.currentQuote.length) * 100;
                this.progressFill.style.width = progress + '%';
            }

            updateStats() {
                const elapsed = (Date.now() - this.startTime) / 1000 / 60; // minutes
                const wpm = elapsed > 0 ? Math.round(this.currentQuoteIndex / 5 / elapsed) : 0;
                const accuracy = this.currentQuoteIndex > 0 
                    ? Math.round((this.currentQuoteIndex - this.errors) / this.currentQuoteIndex * 100) 
                    : 0;

                this.wpmEl.textContent = wpm;
                this.accuracyEl.textContent = accuracy + '%';
                this.errorsEl.textContent = this.errors;
            }

            completeQuote() {
                this.typingInput.disabled = true;
                setTimeout(() => {
                    this.newQuote();
                }, 1500);
            }

            restart() {
                this.currentQuoteIndex = 0;
                this.errors = 0;
                this.startTime = 0;
                this.typingInput.value = '';
                this.quoteDisplay.innerHTML = this.renderQuote();
                this.updateStats();
            }
        }

        // Initialize the typing lab when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new TypingLab();
        });

        // Focus input on page load
        window.addEventListener('load', () => {
            document.getElementById('typing-input').focus();
        });