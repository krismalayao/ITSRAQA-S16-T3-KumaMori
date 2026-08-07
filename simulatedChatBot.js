/* =========================================================
   KUMAMORI CHATBOT WIDGET (Pop-Up Style + Mobile Responsive)
   ========================================================= */

(function () {
    // 1. Inject CSS Styles
    const styles = `
        /* --- KumaMori Chatbot Styles --- */
        .km-chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Timed Pop-up Speech Bubble */
        .km-chatbot-notification {
            position: relative;
            background: #ffffff;
            color: #5c3214;
            border: 2px solid #c48b78;
            border-radius: 16px;
            padding: 10px 32px 10px 14px;
            font-size: 0.85rem;
            font-weight: 600;
            box-shadow: 0 6px 18px rgba(92, 50, 20, 0.18);
            margin-bottom: 12px;
            display: none;
            animation: kmFadeInNotif 0.3s ease-in-out;
            max-width: 230px;
            box-sizing: border-box;
        }

        .km-chatbot-notification::after {
            content: '';
            position: absolute;
            bottom: -8px;
            right: 20px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #c48b78;
        }

        .km-chatbot-notification .close-notif {
            position: absolute;
            top: 4px;
            right: 8px;
            background: none;
            border: none;
            font-size: 16px;
            color: #a06b5b;
            cursor: pointer;
            font-weight: bold;
            line-height: 1;
            padding: 4px;
        }

        /* Toggle Button */
        .km-chatbot-toggle {
            width: 56px;
            height: 56px;
            background: #5c3214;
            color: #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            cursor: pointer;
            box-shadow: 0 6px 16px rgba(92, 50, 20, 0.3);
            transition: transform 0.2s, background 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .km-chatbot-toggle:active {
            transform: scale(0.95);
        }

        /* Pop-up Chat Window */
        .km-chatbot-window {
            position: fixed;
            bottom: 86px;
            right: 20px;
            width: 340px;
            max-width: calc(100vw - 32px);
            height: 480px;
            max-height: calc(100dvh - 110px);
            background: #ffffff;
            border: 2px solid #c48b78;
            border-radius: 20px;
            box-shadow: 0 12px 30px rgba(92, 50, 20, 0.25);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 999999;
            box-sizing: border-box;
        }
        .km-chatbot-window.open {
            display: flex;
        }

        .km-chatbot-header {
            background: #f9e2e6;
            padding: 14px 16px;
            border-bottom: 2px dashed #c48b78;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 700;
            color: #5c3214;
            font-size: 1rem;
        }
        .km-chatbot-header button {
            background: none;
            border: none;
            color: #5c3214;
            font-size: 22px;
            cursor: pointer;
            padding: 0 4px;
            line-height: 1;
        }

        .km-chatbot-messages {
            flex: 1;
            padding: 14px;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .km-message {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 16px;
            font-size: 0.88rem;
            line-height: 1.45;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .km-message.bot {
            background: #f9e2e6;
            color: #5c3214;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }
        .km-message.user {
            background: #5c3214;
            color: #ffffff;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .km-chat-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 6px;
        }
        .km-chat-chips button {
            background: #f0d5da;
            color: #5c3214;
            border: 1px solid #c48b78;
            border-radius: 16px;
            padding: 6px 12px;
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .km-chat-chips button:active {
            background: #f9e2e6;
        }

        .km-chatbot-input {
            display: flex;
            padding: 10px;
            border-top: 1px solid #f0f0f0;
            gap: 8px;
            background: #ffffff;
        }
        .km-chatbot-input input {
            flex: 1;
            border: 1px solid #c48b78;
            border-radius: 20px;
            padding: 8px 14px;
            outline: none;
            font-size: 0.9rem;
            color: #5c3214;
            background: #fff;
        }
        .km-chatbot-input button {
            background: #5c3214;
            color: #ffffff;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.88rem;
        }

        @keyframes kmFadeInNotif {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Mobile Adjustments (Keeps pop-up floating card format) */
        @media (max-width: 480px) {
            .km-chatbot-window {
                right: 16px;
                bottom: 80px;
                width: calc(100vw - 32px);
                max-height: calc(100dvh - 100px);
            }
            .km-chatbot-container {
                bottom: 16px;
                right: 16px;
            }
            .km-chatbot-notification {
                max-width: calc(100vw - 32px);
            }
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Inject HTML Markup
    document.addEventListener("DOMContentLoaded", function () {
        const chatHTML = `
            <div class="km-chatbot-container">
                <!-- Timed Notification Speech Bubble -->
                <div class="km-chatbot-notification" id="chatNotification">
                    <button class="close-notif" onclick="permanentlyDismissNotification(event)">&times;</button>
                    Do you have any questions? Feel free to send a message! 🧸
                </div>

                <!-- Floating Toggle Button -->
                <div class="km-chatbot-toggle" onclick="toggleChat()">
                    <i class="fa-solid fa-comments"></i>
                </div>
            </div>

            <!-- Main Chat Window (Pop-up style) -->
            <div class="km-chatbot-window" id="chatWindow">
                <div class="km-chatbot-header">
                    <span>🧸 KumaAssistant</span>
                    <button onclick="toggleChat()">&times;</button>
                </div>
                
                <div class="km-chatbot-messages" id="chatMessages">
                    <div class="km-message bot">Hi! Welcome to KumaMori 🧸 What can I help you explore today?</div>
                    
                    <div class="km-chat-chips" id="chatChips">
                        <button onclick="sendQuickReply('What are the prices?')">💰 Prices</button>
                        <button onclick="sendQuickReply('Customization add ons')">✨ Add-ons</button>
                        <button onclick="sendQuickReply('Payment options')">💳 Payment</button>
                        <button onclick="sendQuickReply('Shipping and delivery')">🚚 Shipping</button>
                        <button onclick="sendQuickReply('Order tracking')">📦 Tracking</button>
                        <button onclick="sendQuickReply('Pepper spray first aid')">🩹 First Aid</button>
                        <button onclick="sendQuickReply('Contact info')">📞 Contact</button>
                    </div>
                </div>
                
                <div class="km-chatbot-input">
                    <input type="text" id="userInput" placeholder="Ask a question..." onkeypress="handleKeyPress(event)">
                    <button onclick="sendMessage()">Send</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);

        // Start notification routine
        initNotificationTimer();
    });
})();

// 3. Knowledge Base
const knowledgeBase = [
    {
        keywords: ['price', 'prices', 'cost', 'how much', 'rate', 'magkano'],
        response: "🏷️ Product Prices:\n\n• Plush Bear: ₱699.00\n• Leather Keychain: ₱145.00\n• Beaded Keychain: ₱140.00\n• Charm Keychain: ₱110.00"
    },
    {
        keywords: ['add-on', 'addon', 'custom', 'customization', 'pendant', 'spacer', 'bead', 'figurine', 'charm', 'letter'],
        response: "✨ Customization Add-On Prices:\n\n• Additional Letter: ₱5.00 (Leather) / ₱15.00 (Beaded/Charm)\n• Additional Spacer: ₱5.00\n• Additional Bead: ₱10.00\n• Additional Charm: ₱20.00\n• Additional Figurine: ₱25.00\n• Additional Pendant: ₱30.00"
    },
    {
        keywords: ['payment', 'pay', 'gcash', 'cod', 'cash on delivery', 'plan', 'qr'],
        response: "💳 Payment Methods & Details:\n\n1. Cash on Delivery (COD)\n2. GCash Payment:\n   • Account Name: Kuma Mori\n   • GCash Number: 0917 123 4567\n   • Enter your 13-digit GCash Reference Number at checkout!"
    },
    {
        keywords: ['delivery', 'pickup', 'pick up', 'fee', 'shipping', 'courier'],
        response: "🚚 Delivery Options:\n\n• Pick Up: Selectable at checkout.\n• Delivery: ₱60.00 standard delivery fee.\n• Orders usually ship within 2–5 business days."
    },
    {
        keywords: ['track', 'tracking', 'status', 'order status', 'packed', 'shipped'],
        response: "📦 Order Tracking Statuses:\n1. Pending (Waiting for confirmation)\n2. Order Confirmed (Ready to be packed)\n3. Packed & Processed (Awaiting shipment)\n4. Shipped (On its way!)\n5. Delivered"
    },
    {
        keywords: ['damaged', 'defect', 'broken', 'return', 'exchange', 'replacement'],
        response: "⚠️ Defective / Damaged Items:\nContact us within 3 days of receiving your order with photos/videos. We offer free replacements for defective items within 7 days (refunds are not accepted)."
    },
    {
        keywords: ['contact', 'hotline', 'phone', 'email', 'facebook', 'instagram'],
        response: "📞 Contact Details:\n• Hotline: +63 9171900777\n• Email: kumamori.info@gmail.com\n• Direct Message on Facebook or Instagram!"
    },
    {
        keywords: ['pepper spray', 'first aid', 'eyes', 'skin', 'irritation', 'exposed'],
        response: "🩹 First Aid for Pepper Spray Exposure:\n• Eyes: Flush immediately with cool water for 10-15 mins.\n• Skin: Wash with soap & water; apply cool compress or aloe vera.\n• Respiratory: Move to fresh air and take slow, deep breaths."
    }
];

// 4. Pop-up Notification Timers & Logic
let notifTimer = null;
let autoHideTimer = null;

function initNotificationTimer() {
    if (localStorage.getItem('kumamori_notif_dismissed') === 'true') {
        return;
    }

    setTimeout(showNotification, 10000);
    notifTimer = setInterval(showNotification, 600000);
}

function showNotification() {
    if (localStorage.getItem('kumamori_notif_dismissed') === 'true') return;

    const notif = document.getElementById('chatNotification');
    const chatWindow = document.getElementById('chatWindow');

    if (notif && (!chatWindow || !chatWindow.classList.contains('open'))) {
        notif.style.display = 'block';

        clearTimeout(autoHideTimer);
        autoHideTimer = setTimeout(() => {
            hideNotification();
        }, 30000);
    }
}

function hideNotification() {
    const notif = document.getElementById('chatNotification');
    if (notif) notif.style.display = 'none';
}

function permanentlyDismissNotification(event) {
    event.stopPropagation();
    hideNotification();
    localStorage.setItem('kumamori_notif_dismissed', 'true');
    if (notifTimer) clearInterval(notifTimer);
}

// 5. Chat Window Logic
function toggleChat() {
    const chatWin = document.getElementById('chatWindow');
    chatWin.classList.toggle('open');
    hideNotification();
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}

function sendQuickReply(text) {
    processUserText(text);
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    processUserText(text);
}

function processUserText(text) {
    appendMessage(text, 'user');

    setTimeout(() => {
        const botReply = findReply(text);
        appendMessage(botReply, 'bot');
    }, 350);
}

function findReply(input) {
    const query = input.toLowerCase();
    
    for (const item of knowledgeBase) {
        if (item.keywords.some(keyword => query.includes(keyword))) {
            return item.response;
        }
    }
    
    return "I'm not sure about that! You can ask me about product pricing, customization add-ons, payment options, delivery fees, or order tracking.";
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `km-message ${sender}`;
    msgDiv.innerText = text; 
    
    const container = document.getElementById('chatMessages');
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}