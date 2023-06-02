// Configuración de la clave de API
const apiKey = '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';

// Función para enviar una solicitud a la API de OpenAI
async function sendMessage(message) {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 50,
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const { choices } = response.data;
    const chatLog = document.getElementById('chat-log');
    const botResponse = choices[0].text.trim();
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', 'bot-message');
    messageContainer.textContent = botResponse;
    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
}

// Función para manejar el evento de pulsar Enter en el campo de entrada del usuario
function handleUserInput(event) {
  if (event.key === 'Enter') {
    const userInput = event.target.value;
    const chatLog = document.getElementById('chat-log');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', 'user-message');
    messageContainer.textContent = userInput;
    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
    event.target.value = '';

    sendMessage(userInput);
  }
}

// Agregar un controlador de eventos al campo de entrada del usuario
document.getElementById('user-input').addEventListener('keydown', handleUserInput);
