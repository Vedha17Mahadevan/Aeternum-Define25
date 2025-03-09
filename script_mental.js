// script.js for Mental Wellbeing Hub

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.getElementById('menu-toggle').checked = false;
            }
        });
    });
    
    // Initialize components
    
    initBubbleGame();
    initBreathingExercise();
    initChatbot();
});


// Bubble Game Functionality
function initBubbleGame() {
    const startButton = document.getElementById('start-bubble-game');
    const scoreDisplay = document.getElementById('bubble-score');
    let gameActive = false;
    let score = 0;
    let bubbleInterval;
    
    startButton.addEventListener('click', function() {
        if (!gameActive) {
            startBubbleGame();
            this.textContent = 'End Game';
            this.classList.remove('pulse');
        } else {
            endBubbleGame();
            this.textContent = 'Start Game';
            this.classList.add('pulse');
        }
        gameActive = !gameActive;
    });
    
    function startBubbleGame() {
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        
        // Clear any existing bubbles
        document.querySelectorAll('.bubble').forEach(bubble => bubble.remove());
        
        // Create bubbles at regular intervals
        bubbleInterval = setInterval(createBubble, 600);
    }
    
    function endBubbleGame() {
        clearInterval(bubbleInterval);
        document.querySelectorAll('.bubble').forEach(bubble => {
            bubble.style.animation = 'none';
            bubble.style.opacity = 0;
            setTimeout(() => bubble.remove(), 500);
        });
    }
    
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random position
        const positionX = Math.random() * (window.innerWidth - 40);
        bubble.style.left = `${positionX}px`;
        
        // Random size between 30px and 70px
        const size = Math.random() * 40 + 30;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random float duration between 4-8 seconds
        const floatDuration = Math.random() * 4 + 4;
        bubble.style.animation = `float ${floatDuration}s linear forwards`;
        
        // Click event to pop bubble
        bubble.addEventListener('click', function() {
            bubble.style.animation = 'none';
            bubble.style.transform = 'scale(1.5)';
            bubble.style.opacity = 0;
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            
            // Remove after pop animation
            setTimeout(() => bubble.remove(), 300);
        });
        
        document.body.appendChild(bubble);
        
        // Remove bubble after animation completes
        setTimeout(() => {
            if (document.body.contains(bubble)) {
                bubble.remove();
            }
        }, floatDuration * 1000);
    }
}

// Breathing Exercise Functionality
function initBreathingExercise() {
    const breatheBtn = document.getElementById('breathe-btn');
    const breathingCircle = document.getElementById('breathing-animation');
    const instruction = document.getElementById('breathing-instruction');
    let isBreathing = false;
    let breathingInterval;
    
    breatheBtn.addEventListener('click', function() {
        if (!isBreathing) {
            startBreathing();
            this.textContent = 'Stop Breathing Exercise';
        } else {
            stopBreathing();
            this.textContent = 'Start Breathing';
        }
        isBreathing = !isBreathing;
    });
}

function startBreathing() {
    const breathingCircle = document.getElementById('breathing-animation');
    const instruction = document.getElementById('breathing-instruction');
    let breathingPhase = 0; // 0: inhale, 1: hold, 2: exhale, 3: pause
    let counter = 0;
    
    // Initial state
    instruction.textContent = "Breathe in slowly through your nose...";
    breathingCircle.classList.add('breathing-expand');
    
    const breathingInterval = setInterval(() => {
        counter++;
        
        // Update phases based on 4-7-8 technique
        if (breathingPhase === 0 && counter >= 4) { // Inhale for 4 seconds
            breathingPhase = 1;
            counter = 0;
            instruction.textContent = "Hold your breath...";
        } else if (breathingPhase === 1 && counter >= 7) { // Hold for 7 seconds
            breathingPhase = 2;
            counter = 0;
            instruction.textContent = "Exhale slowly through your mouth...";
            breathingCircle.classList.remove('breathing-expand');
            breathingCircle.classList.add('breathing-contract');
        } else if (breathingPhase === 2 && counter >= 8) { // Exhale for 8 seconds
            breathingPhase = 3;
            counter = 0;
            instruction.textContent = "Pause...";
        } else if (breathingPhase === 3 && counter >= 1) { // Pause for 1 second
            breathingPhase = 0;
            counter = 0;
            instruction.textContent = "Breathe in slowly through your nose...";
            breathingCircle.classList.remove('breathing-contract');
            breathingCircle.classList.add('breathing-expand');
        }
        
        // Visual feedback during each phase
        if (breathingPhase === 0) { // Inhale
            const scale = 1 + (counter * 0.125); // Gradually expand from 1 to 1.5
            breathingCircle.style.transform = `scale(${scale})`;
        } else if (breathingPhase === 2) { // Exhale
            const scale = 1.5 - (counter * 0.0625); // Gradually contract from 1.5 to 1
            breathingCircle.style.transform = `scale(${Math.max(scale, 1)})`;
        }
        
    }, 1000);
    
    // Store interval ID for stopping later
    breathingCircle.dataset.intervalId = breathingInterval;
}

function stopBreathing() {
    const breathingCircle = document.getElementById('breathing-animation');
    const instruction = document.getElementById('breathing-instruction');
    
    // Clear the interval
    clearInterval(parseInt(breathingCircle.dataset.intervalId));
    
    // Reset to initial state
    breathingCircle.classList.remove('breathing-expand', 'breathing-contract');
    breathingCircle.style.transform = '';
    instruction.textContent = "Follow the guided breathing animation";
}

// Chatbot Functionality
function initChatbot() {
    const chatButton = document.getElementById('chat-button');
    
    chatButton.addEventListener('click', function() {
        // Create the chat interface
        if (!document.getElementById('chat-interface')) {
            createChatInterface();
            this.textContent = 'Close Chat';
        } else {
            document.getElementById('chat-interface').remove();
            this.textContent = 'Start Talking';
        }
    });
    
    function createChatInterface() {
        const chatInterface = document.createElement('div');
        chatInterface.id = 'chat-interface';
        chatInterface.innerHTML = `
            <div class="chat-header">
                <h3>Chat with Vedika</h3>
                <button id="minimize-chat">−</button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot">
                    <div class="message-content">
                        Hello! I'm Vedica, your wellness companion. How are you feeling today? I'm here to listen and support you.
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="user-message" placeholder="Type your message here...">
                <button id="send-message"><i class="fas fa-paper-plane"></i></button>
            </div>
        `;
        
        // Apply chat styles
        const style = document.createElement('style');
        style.textContent = `
            #chat-interface {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 350px;
                height: 450px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                z-index: 1000;
                transition: all 0.3s ease;
                overflow: hidden;
            }
            
            .chat-header {
                background: linear-gradient(to right, var(--primary), var(--primary-light));
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chat-header h3 {
                margin: 0;
                color: white;
            }
            
            #minimize-chat {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
            }
            
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 15px;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .message {
                display: flex;
                max-width: 80%;
            }
            
            .message.user {
                align-self: flex-end;
            }
            
            .message.bot {
                align-self: flex-start;
            }
            
            .message-content {
                padding: 10px 15px;
                border-radius: 18px;
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
                line-height: 1.4;
            }
            
            .message.user .message-content {
                background-color: var(--primary);
                color: white;
                border-bottom-right-radius: 5px;
            }
            
            .message.bot .message-content {
                background-color: #f0f0f0;
                border-bottom-left-radius: 5px;
            }
            
            .chat-input {
                display: flex;
                padding: 10px;
                border-top: 1px solid #eee;
                background-color: white;
            }
            
            #user-message {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid #ddd;
                border-radius: 20px;
                margin-right: 10px;
            }
            
            #send-message {
                background-color: var(--primary);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            #chat-interface.minimized {
                height: 60px;
                overflow: hidden;
            }
        `;
        
        document.body.appendChild(style);
        document.body.appendChild(chatInterface);
        
        // Add event listeners
        document.getElementById('minimize-chat').addEventListener('click', function() {
            chatInterface.classList.toggle('minimized');
            this.textContent = chatInterface.classList.contains('minimized') ? '+' : '−';
        });
        
        document.getElementById('send-message').addEventListener('click', sendUserMessage);
        document.getElementById('user-message').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
        
        // Focus the input
        document.getElementById('user-message').focus();
    }
    
    function sendUserMessage() {
        const userInput = document.getElementById('user-message');
        const message = userInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        userInput.value = '';
        
        // Simulate typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot', 'typing');
        typingIndicator.innerHTML = `<div class="message-content">Typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>`;
        document.getElementById('chat-messages').appendChild(typingIndicator);
        
        // Scroll to bottom
        scrollToBottom();
        
        // Generate bot response after delay
        setTimeout(() => {
            typingIndicator.remove();
            generateBotResponse(message);
        }, 1500);
    }
    
    function addMessage(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    function scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let response = "";
        
        // Simple response logic based on keywords
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            response = "Hello there! How are you feeling today?";
        } 
        else if (message.includes('how are you')) {
            response = "I'm here and ready to support you! What's on your mind today?";
        }
        else if (message.includes('thank') || message.includes('thanks')) {
            response = "You're very welcome! I'm glad I could help.";
        }
        else if (message.includes('bye') || message.includes('goodbye')) {
            response = "Take care! Remember I'm here whenever you need support.";
        }
        else if (message.includes('anxious') || message.includes('anxiety') || message.includes('stressed') || message.includes('stress')) {
            response = "I understand anxiety can be challenging. Have you tried our breathing exercise? Deep breathing can help activate your parasympathetic nervous system, which helps reduce anxiety.";
        }
        else if (message.includes('sad') || message.includes('unhappy') || message.includes('depressed') || message.includes('depression')) {
            response = "I'm sorry you're feeling down. It's important to acknowledge these feelings. Would you like to talk more about what's causing these feelings, or would a distraction like our bubble game help?";
        }
        else if (message.includes('angry') || message.includes('frustrated') || message.includes('mad')) {
            response = "It sounds like you're experiencing some strong emotions. That's completely valid. Our bubble popping game might offer a good outlet for releasing some of that energy.";
        }
        else if (message.includes('tired') || message.includes('exhausted') || message.includes('sleep')) {
            response = "Rest is essential for mental wellbeing. Are you getting enough quality sleep? I can share some tips for improving sleep if you'd like.";
        }
        else if (message.includes('meditation') || message.includes('meditate') || message.includes('mindfulness')) {
            response = "Mindfulness practices can be very beneficial! Our breathing exercise is a good starting point. Even just 5 minutes of mindful breathing can help center your thoughts.";
        }
        else if (message.includes('exercise') || message.includes('workout') || message.includes('physical')) {
            response = "Physical activity is great for mental health! Even a short walk can boost endorphins and improve mood. What kinds of movement do you enjoy?";
        }
        else {
            // Default responses
            const defaultResponses = [
                "I'm here to listen. Would you like to tell me more about that?",
                "Thank you for sharing. How has this been affecting your daily life?",
                "I appreciate you opening up. What do you think might help in this situation?",
                "That's interesting. How does that make you feel?",
                "I'm here to support you. What would be most helpful right now?"
            ];
            response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }
        
        addMessage(response, 'bot');
    }
}