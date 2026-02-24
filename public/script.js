// État de conversation
let conversationHistory = [];

// Éléments du DOM
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messagesContainer');
const loadingIndicator = document.getElementById('loadingIndicator');

// Événements
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const message = messageInput.value.trim();

  if (!message) return;

  // Ajouter le message utilisateur
  addMessage(message, 'user');
  messageInput.value = '';
  sendBtn.disabled = true;
  messageInput.disabled = true;

  // Afficher l'indicateur de chargement
  loadingIndicator.style.display = 'flex';

  try {
    // Ajouter le message utilisateur à l'historique
    conversationHistory.push({
      role: 'user',
      content: message
    });

    // Appeler le serveur
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        conversationHistory: conversationHistory
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la communication avec le serveur');
    }

    // Ajouter la réponse de l'assistant
    const assistantMessage = data.reply;
    addMessage(assistantMessage, 'assistant');

    // Ajouter à l'historique
    conversationHistory.push({
      role: 'assistant',
      content: assistantMessage
    });

  } catch (error) {
    console.error('Erreur:', error);
    addMessage(`Erreur: ${error.message}`, 'error');
  } finally {
    loadingIndicator.style.display = 'none';
    sendBtn.disabled = false;
    messageInput.disabled = false;
    messageInput.focus();
  }
}

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = text;

  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);

  // Scroll vers le bas
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
