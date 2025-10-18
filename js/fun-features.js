// Fun Interactive Features for METRICX

// Initialize fun features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeConversionGame();
    initializeUnitQuiz();
    initializeInteractiveCalculator();
    initializeVoiceCommands();
    initializeAchievementSystem();
    initializeThemeCustomizer();
    initializeConversionRace();
    initializeMeasurementFacts();
});

// Conversion Game
function initializeConversionGame() {
    const gameButton = createGameButton('🎮 Conversion Challenge', 'Start a fun conversion challenge!');
    
    gameButton.addEventListener('click', () => {
        showConversionGame();
    });
}

function showConversionGame() {
    const gameModal = createModal('Conversion Challenge', `
        <div class="game-container">
            <div class="game-header">
                <div class="score">Score: <span id="gameScore">0</span></div>
                <div class="timer">Time: <span id="gameTimer">60</span>s</div>
                <div class="level">Level: <span id="gameLevel">1</span></div>
            </div>
            <div class="question-container">
                <h4 id="gameQuestion">Convert 5 meters to feet</h4>
                <div class="answer-options">
                    <button class="answer-btn" data-answer="16.404">16.404 ft</button>
                    <button class="answer-btn" data-answer="15.240">15.240 ft</button>
                    <button class="answer-btn" data-answer="18.045">18.045 ft</button>
                    <button class="answer-btn" data-answer="14.763">14.763 ft</button>
                </div>
            </div>
            <div class="game-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="gameProgress"></div>
                </div>
            </div>
        </div>
    `);
    
    startConversionGame();
}

function startConversionGame() {
    let score = 0;
    let level = 1;
    let timeLeft = 60;
    let currentQuestion = 0;
    const totalQuestions = 10;
    
    const questions = generateGameQuestions(totalQuestions);
    
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('gameTimer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(score, level);
        }
    }, 1000);
    
    function showQuestion(index) {
        if (index >= questions.length) {
            clearInterval(timer);
            endGame(score, level);
            return;
        }
        
        const question = questions[index];
        document.getElementById('gameQuestion').textContent = question.text;
        
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((btn, i) => {
            btn.textContent = question.options[i];
            btn.onclick = () => checkAnswer(question.correct, i);
        });
        
        updateProgress((index + 1) / totalQuestions * 100);
    }
    
    function checkAnswer(correct, selected) {
        if (correct === selected) {
            score += level * 10;
            showFeedback('Correct! +' + (level * 10) + ' points', 'success');
            
            if ((currentQuestion + 1) % 3 === 0) {
                level++;
                document.getElementById('gameLevel').textContent = level;
                showFeedback('Level Up! 🎉', 'info');
            }
        } else {
            showFeedback('Incorrect! Try again next time.', 'error');
        }
        
        document.getElementById('gameScore').textContent = score;
        currentQuestion++;
        
        setTimeout(() => {
            showQuestion(currentQuestion);
        }, 1500);
    }
    
    function updateProgress(percentage) {
        document.getElementById('gameProgress').style.width = percentage + '%';
    }
    
    function endGame(finalScore, finalLevel) {
        const modal = document.querySelector('.modal-body');
        modal.innerHTML = `
            <div class="game-over">
                <h3>🎉 Game Over!</h3>
                <div class="final-stats">
                    <p>Final Score: <strong>${finalScore}</strong></p>
                    <p>Level Reached: <strong>${finalLevel}</strong></p>
                    <p>Accuracy: <strong>${Math.round((finalScore / (totalQuestions * finalLevel * 10)) * 100)}%</strong></p>
                </div>
                <button class="btn btn-primary" onclick="location.reload()">Play Again</button>
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            </div>
        `;
        
        // Save high score
        saveHighScore(finalScore);
        unlockAchievement('game_player');
    }
    
    showQuestion(0);
}

function generateGameQuestions(count) {
    const conversions = [
        { from: 'meter', to: 'foot', factor: 3.28084 },
        { from: 'kilometer', to: 'mile', factor: 0.621371 },
        { from: 'inch', to: 'centimeter', factor: 2.54 },
        { from: 'yard', to: 'meter', factor: 0.9144 },
        { from: 'mile', to: 'kilometer', factor: 1.60934 }
    ];
    
    const questions = [];
    
    for (let i = 0; i < count; i++) {
        const conversion = conversions[Math.floor(Math.random() * conversions.length)];
        const value = Math.floor(Math.random() * 100) + 1;
        const correct = (value * conversion.factor).toFixed(3);
        
        const options = [
            correct,
            (parseFloat(correct) * 1.2).toFixed(3),
            (parseFloat(correct) * 0.8).toFixed(3),
            (parseFloat(correct) * 1.5).toFixed(3)
        ].sort(() => Math.random() - 0.5);
        
        questions.push({
            text: `Convert ${value} ${conversion.from}${value > 1 ? 's' : ''} to ${conversion.to}${value > 1 ? 's' : ''}`,
            options: options.map(opt => `${opt} ${conversion.to}${parseFloat(opt) > 1 ? 's' : ''}`),
            correct: options.indexOf(correct)
        });
    }
    
    return questions;
}

// Unit Quiz
function initializeUnitQuiz() {
    const quizButton = createGameButton('🧠 Unit Knowledge Quiz', 'Test your knowledge about measurement units!');
    
    quizButton.addEventListener('click', () => {
        showUnitQuiz();
    });
}

function showUnitQuiz() {
    const quizQuestions = [
        {
            question: "What is the SI base unit for length?",
            options: ["Meter", "Foot", "Inch", "Yard"],
            correct: 0,
            explanation: "The meter is the fundamental unit of length in the International System of Units (SI)."
        },
        {
            question: "How many feet are in a mile?",
            options: ["5,000", "5,280", "5,500", "6,000"],
            correct: 1,
            explanation: "A mile contains exactly 5,280 feet."
        },
        {
            question: "What does 'nano' mean as a prefix?",
            options: ["One thousandth", "One millionth", "One billionth", "One trillionth"],
            correct: 2,
            explanation: "Nano means one billionth (10⁻⁹)."
        },
        {
            question: "Which unit is used for measuring astronomical distances?",
            options: ["Kilometer", "Light Year", "Meter", "Mile"],
            correct: 1,
            explanation: "Light years are commonly used to measure vast distances in space."
        },
        {
            question: "How many centimeters are in an inch?",
            options: ["2.54", "2.45", "3.54", "1.54"],
            correct: 0,
            explanation: "One inch equals exactly 2.54 centimeters."
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    const quizModal = createModal('Unit Knowledge Quiz', `
        <div class="quiz-container">
            <div class="quiz-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="quizProgress"></div>
                </div>
                <span id="questionNumber">1 of ${quizQuestions.length}</span>
            </div>
            <div class="quiz-question">
                <h4 id="quizQuestionText">${quizQuestions[0].question}</h4>
                <div class="quiz-options" id="quizOptions">
                    ${quizQuestions[0].options.map((option, index) => 
                        `<button class="quiz-option" data-index="${index}">${option}</button>`
                    ).join('')}
                </div>
            </div>
            <div class="quiz-explanation" id="quizExplanation" style="display: none;"></div>
            <div class="quiz-controls">
                <button class="btn btn-primary" id="nextQuestion" style="display: none;">Next Question</button>
            </div>
        </div>
    `);
    
    function showQuestion(index) {
        const question = quizQuestions[index];
        document.getElementById('quizQuestionText').textContent = question.question;
        document.getElementById('questionNumber').textContent = `${index + 1} of ${quizQuestions.length}`;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = question.options.map((option, i) => 
            `<button class="quiz-option" data-index="${i}">${option}</button>`
        ).join('');
        
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                checkQuizAnswer(parseInt(e.target.dataset.index), question);
            });
        });
        
        updateQuizProgress((index + 1) / quizQuestions.length * 100);
    }
    
    function checkQuizAnswer(selected, question) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selected && selected !== question.correct) {
                btn.classList.add('incorrect');
            }
        });
        
        if (selected === question.correct) {
            score++;
            showFeedback('Correct! 🎉', 'success');
        } else {
            showFeedback('Incorrect! 😔', 'error');
        }
        
        document.getElementById('quizExplanation').innerHTML = `
            <p><strong>Explanation:</strong> ${question.explanation}</p>
        `;
        document.getElementById('quizExplanation').style.display = 'block';
        
        if (currentQuestion < quizQuestions.length - 1) {
            document.getElementById('nextQuestion').style.display = 'block';
            document.getElementById('nextQuestion').onclick = () => {
                currentQuestion++;
                document.getElementById('quizExplanation').style.display = 'none';
                document.getElementById('nextQuestion').style.display = 'none';
                showQuestion(currentQuestion);
            };
        } else {
            setTimeout(() => {
                showQuizResults();
            }, 2000);
        }
    }
    
    function updateQuizProgress(percentage) {
        document.getElementById('quizProgress').style.width = percentage + '%';
    }
    
    function showQuizResults() {
        const percentage = Math.round((score / quizQuestions.length) * 100);
        const modal = document.querySelector('.modal-body');
        modal.innerHTML = `
            <div class="quiz-results">
                <h3>Quiz Complete! 🎓</h3>
                <div class="score-circle">
                    <div class="score-text">${percentage}%</div>
                </div>
                <p>You scored ${score} out of ${quizQuestions.length} questions correctly!</p>
                <div class="performance-message">
                    ${percentage >= 80 ? '🌟 Excellent! You\'re a measurement expert!' :
                      percentage >= 60 ? '👍 Good job! Keep learning!' :
                      '📚 Keep studying! Practice makes perfect!'}
                </div>
                <button class="btn btn-primary" onclick="location.reload()">Take Quiz Again</button>
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            </div>
        `;
        
        unlockAchievement('quiz_taker');
        if (percentage === 100) {
            unlockAchievement('perfect_score');
        }
    }
    
    showQuestion(0);
}

// Interactive Calculator with Voice
function initializeInteractiveCalculator() {
    const calcButton = createGameButton('🎤 Voice Calculator', 'Use voice commands to convert units!');
    
    calcButton.addEventListener('click', () => {
        showVoiceCalculator();
    });
}

function showVoiceCalculator() {
    const calcModal = createModal('Voice-Activated Calculator', `
        <div class="voice-calc-container">
            <div class="voice-status">
                <div class="microphone-icon" id="micIcon">🎤</div>
                <p id="voiceStatus">Click the microphone to start voice recognition</p>
            </div>
            <div class="voice-transcript">
                <h5>What you said:</h5>
                <p id="transcript">Say something like "Convert 5 meters to feet"</p>
            </div>
            <div class="voice-result">
                <h5>Result:</h5>
                <p id="voiceResult">Waiting for command...</p>
            </div>
            <div class="voice-examples">
                <h6>Try these commands:</h6>
                <ul>
                    <li>"Convert 10 kilometers to miles"</li>
                    <li>"How many feet in 3 meters"</li>
                    <li>"5 inches to centimeters"</li>
                </ul>
            </div>
        </div>
    `);
    
    initializeVoiceRecognition();
}

function initializeVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        document.getElementById('voiceStatus').textContent = 'Voice recognition not supported in this browser';
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    const micIcon = document.getElementById('micIcon');
    const voiceStatus = document.getElementById('voiceStatus');
    const transcript = document.getElementById('transcript');
    const voiceResult = document.getElementById('voiceResult');
    
    micIcon.addEventListener('click', () => {
        recognition.start();
        micIcon.style.color = 'red';
        voiceStatus.textContent = 'Listening... Speak now!';
    });
    
    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        transcript.textContent = speechResult;
        
        const result = parseVoiceCommand(speechResult);
        voiceResult.textContent = result;
        
        micIcon.style.color = '';
        voiceStatus.textContent = 'Click the microphone to try again';
    };
    
    recognition.onerror = (event) => {
        micIcon.style.color = '';
        voiceStatus.textContent = 'Error occurred: ' + event.error;
    };
}

function parseVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();
    
    // Extract numbers and units from the command
    const numberMatch = lowerCommand.match(/(\d+(?:\.\d+)?)/);
    const fromUnitMatch = lowerCommand.match(/(meter|kilometer|centimeter|millimeter|inch|foot|feet|yard|mile)s?/);
    const toUnitMatch = lowerCommand.match(/to\s+(meter|kilometer|centimeter|millimeter|inch|foot|feet|yard|mile)s?/);
    
    if (!numberMatch || !fromUnitMatch || !toUnitMatch) {
        return "Sorry, I couldn't understand that command. Try saying 'Convert X units to Y units'";
    }
    
    const value = parseFloat(numberMatch[1]);
    let fromUnit = fromUnitMatch[1];
    let toUnit = toUnitMatch[1];
    
    // Normalize unit names
    if (fromUnit === 'feet') fromUnit = 'foot';
    if (toUnit === 'feet') toUnit = 'foot';
    
    // Conversion factors (same as in length converter)
    const factors = {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344
    };
    
    if (!factors[fromUnit] || !factors[toUnit]) {
        return "Sorry, I don't recognize one of those units.";
    }
    
    const meters = value * factors[fromUnit];
    const result = meters / factors[toUnit];
    
    return `${value} ${fromUnit}${value !== 1 ? 's' : ''} = ${result.toFixed(4)} ${toUnit}${result !== 1 ? 's' : ''}`;
}

// Achievement System
function initializeAchievementSystem() {
    const achievements = {
        first_conversion: { name: 'First Steps', description: 'Complete your first conversion', icon: '🎯' },
        game_player: { name: 'Game Master', description: 'Play the conversion game', icon: '🎮' },
        quiz_taker: { name: 'Knowledge Seeker', description: 'Take the unit quiz', icon: '🧠' },
        perfect_score: { name: 'Perfectionist', description: 'Get 100% on the quiz', icon: '🌟' },
        voice_user: { name: 'Voice Commander', description: 'Use voice commands', icon: '🎤' },
        theme_changer: { name: 'Style Master', description: 'Change the theme', icon: '🎨' },
        speed_demon: { name: 'Speed Demon', description: 'Complete 10 conversions in 1 minute', icon: '⚡' }
    };
    
    window.unlockAchievement = function(achievementId) {
        if (!achievements[achievementId]) return;
        
        const unlockedAchievements = JSON.parse(localStorage.getItem('metricx_achievements') || '[]');
        
        if (unlockedAchievements.includes(achievementId)) return;
        
        unlockedAchievements.push(achievementId);
        localStorage.setItem('metricx_achievements', JSON.stringify(unlockedAchievements));
        
        showAchievementNotification(achievements[achievementId]);
    };
    
    function showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, var(--accent-cyan), var(--accent-purple));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.5s ease;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 2rem;">${achievement.icon}</div>
                <div>
                    <div style="font-weight: bold;">Achievement Unlocked!</div>
                    <div style="font-size: 0.9rem;">${achievement.name}</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">${achievement.description}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 4000);
    }
    
    // Add achievements button to navbar
    const achievementsBtn = document.createElement('button');
    achievementsBtn.className = 'btn btn-outline-light ms-2';
    achievementsBtn.innerHTML = '<i class="fas fa-trophy"></i>';
    achievementsBtn.title = 'View Achievements';
    achievementsBtn.onclick = showAchievements;
    
    const searchForm = document.querySelector('.navbar-nav form');
    if (searchForm) {
        searchForm.appendChild(achievementsBtn);
    }
    
    function showAchievements() {
        const unlockedAchievements = JSON.parse(localStorage.getItem('metricx_achievements') || '[]');
        
        const achievementsList = Object.entries(achievements).map(([id, achievement]) => {
            const isUnlocked = unlockedAchievements.includes(id);
            return `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-info">
                        <div class="achievement-name">${achievement.name}</div>
                        <div class="achievement-desc">${achievement.description}</div>
                    </div>
                    <div class="achievement-status">
                        ${isUnlocked ? '✅' : '🔒'}
                    </div>
                </div>
            `;
        }).join('');
        
        createModal('Achievements', `
            <div class="achievements-container">
                <div class="achievements-header">
                    <h4>Your Progress: ${unlockedAchievements.length}/${Object.keys(achievements).length}</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(unlockedAchievements.length / Object.keys(achievements).length) * 100}%"></div>
                    </div>
                </div>
                <div class="achievements-list">
                    ${achievementsList}
                </div>
            </div>
        `);
    }
}

// Theme Customizer
function initializeThemeCustomizer() {
    const themeButton = createGameButton('🎨 Theme Studio', 'Customize your experience!');
    
    themeButton.addEventListener('click', () => {
        showThemeCustomizer();
        unlockAchievement('theme_changer');
    });
}

function showThemeCustomizer() {
    const themeModal = createModal('Theme Studio', `
        <div class="theme-customizer">
            <div class="theme-section">
                <h5>Color Schemes</h5>
                <div class="color-schemes">
                    <div class="color-scheme" data-theme="default">
                        <div class="color-preview">
                            <div style="background: #06B6D4;"></div>
                            <div style="background: #8B5CF6;"></div>
                            <div style="background: #EC4899;"></div>
                        </div>
                        <span>Default</span>
                    </div>
                    <div class="color-scheme" data-theme="ocean">
                        <div class="color-preview">
                            <div style="background: #0EA5E9;"></div>
                            <div style="background: #3B82F6;"></div>
                            <div style="background: #1E40AF;"></div>
                        </div>
                        <span>Ocean</span>
                    </div>
                    <div class="color-scheme" data-theme="sunset">
                        <div class="color-preview">
                            <div style="background: #F97316;"></div>
                            <div style="background: #EF4444;"></div>
                            <div style="background: #DC2626;"></div>
                        </div>
                        <span>Sunset</span>
                    </div>
                    <div class="color-scheme" data-theme="forest">
                        <div class="color-preview">
                            <div style="background: #10B981;"></div>
                            <div style="background: #059669;"></div>
                            <div style="background: #047857;"></div>
                        </div>
                        <span>Forest</span>
                    </div>
                </div>
            </div>
            
            <div class="theme-section">
                <h5>Animation Speed</h5>
                <input type="range" id="animationSpeed" min="0.5" max="2" step="0.1" value="1">
                <span id="speedValue">1x</span>
            </div>
            
            <div class="theme-section">
                <h5>Particle Effects</h5>
                <label class="switch">
                    <input type="checkbox" id="particleToggle" checked>
                    <span class="slider"></span>
                </label>
            </div>
            
            <div class="theme-section">
                <h5>Sound Effects</h5>
                <label class="switch">
                    <input type="checkbox" id="soundToggle">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    `);
    
    // Add event listeners for theme customization
    document.querySelectorAll('.color-scheme').forEach(scheme => {
        scheme.addEventListener('click', () => {
            applyColorScheme(scheme.dataset.theme);
        });
    });
    
    document.getElementById('animationSpeed').addEventListener('input', (e) => {
        const speed = e.target.value;
        document.getElementById('speedValue').textContent = speed + 'x';
        document.documentElement.style.setProperty('--animation-speed', speed);
    });
    
    document.getElementById('particleToggle').addEventListener('change', (e) => {
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.display = e.target.checked ? 'block' : 'none';
        }
    });
}

function applyColorScheme(theme) {
    const themes = {
        default: {
            primary: '#06B6D4',
            secondary: '#8B5CF6',
            accent: '#EC4899'
        },
        ocean: {
            primary: '#0EA5E9',
            secondary: '#3B82F6',
            accent: '#1E40AF'
        },
        sunset: {
            primary: '#F97316',
            secondary: '#EF4444',
            accent: '#DC2626'
        },
        forest: {
            primary: '#10B981',
            secondary: '#059669',
            accent: '#047857'
        }
    };
    
    const selectedTheme = themes[theme];
    if (selectedTheme) {
        document.documentElement.style.setProperty('--accent-cyan', selectedTheme.primary);
        document.documentElement.style.setProperty('--accent-purple', selectedTheme.secondary);
        document.documentElement.style.setProperty('--accent-pink', selectedTheme.accent);
        
        localStorage.setItem('metricx_theme', theme);
        showNotification(`Theme changed to ${theme}!`, 'success');
    }
}

// Conversion Race Game
function initializeConversionRace() {
    const raceButton = createGameButton('🏁 Conversion Race', 'Race against time!');
    
    raceButton.addEventListener('click', () => {
        showConversionRace();
    });
}

function showConversionRace() {
    const raceModal = createModal('Conversion Race', `
        <div class="race-container">
            <div class="race-track">
                <div class="player-car" id="playerCar">🏎️</div>
                <div class="ai-car" id="aiCar">🚗</div>
            </div>
            <div class="race-question">
                <h4 id="raceQuestion">Get ready to race!</h4>
                <input type="number" id="raceAnswer" placeholder="Your answer" disabled>
                <button id="submitRace" disabled>Submit</button>
            </div>
            <div class="race-timer">
                <span id="raceCountdown">3</span>
            </div>
        </div>
    `);
    
    startRace();
}

function startRace() {
    let countdown = 3;
    const countdownElement = document.getElementById('raceCountdown');
    
    const countdownInterval = setInterval(() => {
        countdownElement.textContent = countdown;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = 'GO!';
            setTimeout(() => {
                countdownElement.style.display = 'none';
                startRaceQuestions();
            }, 500);
        }
    }, 1000);
}

function startRaceQuestions() {
    let playerPosition = 0;
    let aiPosition = 0;
    let questionCount = 0;
    const totalQuestions = 5;
    
    const questions = generateGameQuestions(totalQuestions);
    
    function showRaceQuestion(index) {
        if (index >= questions.length) {
            endRace(playerPosition, aiPosition);
            return;
        }
        
        const question = questions[index];
        document.getElementById('raceQuestion').textContent = question.text;
        document.getElementById('raceAnswer').disabled = false;
        document.getElementById('submitRace').disabled = false;
        
        // AI answers after random delay
        const aiDelay = Math.random() * 3000 + 2000;
        setTimeout(() => {
            if (questionCount === index) {
                aiPosition += 20;
                updateRacePositions();
                showFeedback('AI answered!', 'info');
            }
        }, aiDelay);
        
        document.getElementById('submitRace').onclick = () => {
            const userAnswer = parseFloat(document.getElementById('raceAnswer').value);
            const correctAnswer = parseFloat(question.options[question.correct].split(' ')[0]);
            
            if (Math.abs(userAnswer - correctAnswer) < 0.1) {
                playerPosition += 20;
                showFeedback('Correct! You advance!', 'success');
            } else {
                showFeedback('Incorrect! Try the next one!', 'error');
            }
            
            updateRacePositions();
            questionCount++;
            
            document.getElementById('raceAnswer').value = '';
            document.getElementById('raceAnswer').disabled = true;
            document.getElementById('submitRace').disabled = true;
            
            setTimeout(() => {
                showRaceQuestion(questionCount);
            }, 1500);
        };
    }
    
    function updateRacePositions() {
        document.getElementById('playerCar').style.left = playerPosition + '%';
        document.getElementById('aiCar').style.left = aiPosition + '%';
    }
    
    function endRace(playerPos, aiPos) {
        let result;
        if (playerPos > aiPos) {
            result = '🏆 You won the race!';
            unlockAchievement('speed_demon');
        } else if (playerPos === aiPos) {
            result = '🤝 It\'s a tie!';
        } else {
            result = '🤖 AI won this time!';
        }
        
        document.getElementById('raceQuestion').textContent = result;
        document.getElementById('raceAnswer').style.display = 'none';
        document.getElementById('submitRace').style.display = 'none';
    }
    
    showRaceQuestion(0);
}

// Measurement Facts
function initializeMeasurementFacts() {
    const facts = [
        "The meter was originally defined as one ten-millionth of the distance from the Earth's equator to the North Pole.",
        "A light-year is approximately 9.46 trillion kilometers or 5.88 trillion miles.",
        "The smallest unit of length in physics is the Planck length: 1.6 × 10⁻³⁵ meters.",
        "The foot was historically based on the length of a human foot, which varied by region.",
        "A nautical mile is based on the Earth's circumference and equals one minute of latitude.",
        "The inch was originally defined as the width of a man's thumb.",
        "Mount Everest grows about 4 millimeters taller each year due to tectonic activity.",
        "The speed of light is exactly 299,792,458 meters per second by definition."
    ];
    
    function showRandomFact() {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        showNotification('💡 ' + randomFact, 'info');
    }
    
    // Show a fact every 5 minutes
    setInterval(showRandomFact, 300000);
    
    // Show first fact after 30 seconds
    setTimeout(showRandomFact, 30000);
}

// Utility Functions
function createGameButton(text, title) {
    const button = document.createElement('button');
    button.className = 'btn btn-outline-light ms-2 game-button';
    button.innerHTML = text;
    button.title = title;
    button.style.cssText = `
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        color: var(--accent-cyan);
        border-radius: 25px;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        margin: 0.25rem;
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.background = 'var(--accent-cyan)';
        button.style.color = 'white';
        button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'var(--glass-bg)';
        button.style.color = 'var(--accent-cyan)';
        button.style.transform = 'scale(1)';
    });
    
    const searchForm = document.querySelector('.navbar-nav form');
    if (searchForm) {
        searchForm.appendChild(button);
    }
    
    return button;
}

function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); color: var(--neutral-light);">
                <div class="modal-header" style="border-bottom: 1px solid var(--glass-border);">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close btn-close-white" onclick="closeModal()"></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    window.closeModal = function() {
        modal.remove();
    };
    
    return modal;
}

function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `feedback feedback-${type}`;
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10002;
        animation: feedbackPop 1.5s ease-out;
    `;
    
    const colors = {
        success: 'linear-gradient(45deg, #10B981, #059669)',
        error: 'linear-gradient(45deg, #EF4444, #DC2626)',
        info: 'linear-gradient(45deg, #3B82F6, #1E40AF)'
    };
    
    feedback.style.background = colors[type] || colors.info;
    feedback.textContent = message;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#feedback-keyframes')) {
        const style = document.createElement('style');
        style.id = 'feedback-keyframes';
        style.textContent = `
            @keyframes feedbackPop {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                20% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 1500);
}

function saveHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem('metricx_highscores') || '[]');
    highScores.push({ score, date: new Date().toISOString() });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10); // Keep only top 10
    localStorage.setItem('metricx_highscores', JSON.stringify(highScores));
}

// Voice Commands for main functionality
function initializeVoiceCommands() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        return;
    }
    
    const voiceButton = createGameButton('🎤 Voice Control', 'Control the site with your voice!');
    
    voiceButton.addEventListener('click', () => {
        startVoiceControl();
    });
}

function startVoiceControl() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.start();
    
    showNotification('🎤 Voice control activated! Try saying "show game" or "change theme"', 'info');
    
    recognition.onresult = (event) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        if (command.includes('game') || command.includes('play')) {
            showConversionGame();
        } else if (command.includes('quiz')) {
            showUnitQuiz();
        } else if (command.includes('theme') || command.includes('color')) {
            showThemeCustomizer();
        } else if (command.includes('race')) {
            showConversionRace();
        } else if (command.includes('stop') || command.includes('quit')) {
            recognition.stop();
            showNotification('Voice control stopped', 'info');
        }
    };
    
    recognition.onerror = () => {
        showNotification('Voice recognition error', 'error');
    };
    
    // Stop after 30 seconds
    setTimeout(() => {
        recognition.stop();
    }, 30000);
}

