// Configura tu clave de API de OpenAI
const apiKey = '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';

// Configura el contenedor del chat y el área de entrada
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

// Función para agregar mensajes al chat
function appendMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.innerText = message;
  chatLog.appendChild(messageElement);
}

// Función para enviar la solicitud a la API de OpenAI y recibir la respuesta
async function sendMessage(message) {
  appendMessage(message, 'user');

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: message,
        max_tokens: 50
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    const reply = response.data.choices[0].text.trim();
    appendMessage(reply, 'assistant');
  } catch (error) {
    console.error(error);
    appendMessage('Ha ocurrido un error.', 'assistant');
  }
}

// Evento para manejar la entrada del usuario al presionar Enter
userInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && userInput.value !== '') {
    const message = userInput.value;
    userInput.value = '';

    sendMessage(message);
  }
});

// Enfoca automáticamente el área de entrada al cargar la página
userInput.focus();
