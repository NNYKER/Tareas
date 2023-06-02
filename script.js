const apiKey = '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';

const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

function appendMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.innerText = message;
  chatLog.appendChild(messageElement);
}

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

userInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && userInput.value !== '') {
    const message = userInput.value;
    userInput.value = '';

    sendMessage(message);
  }
});

userInput.focus();
