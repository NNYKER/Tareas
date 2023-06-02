document.addEventListener("DOMContentLoaded", function() {
  var chatLog = document.getElementById("chat-log");
  var userInput = document.getElementById("user-input");

  // Configura tu clave de API
  var apiKey = "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";

  // Maneja el evento de presionar Enter
  userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      var userMessage = userInput.value;
      addMessage("user", userMessage);
      userInput.value = "";

      // Envía la solicitud a la API
      axios.post("https://api.openai.com/v1/engines/davinci-codex/completions", {
        prompt: userMessage,
        max_tokens: 50,
        temperature: 0.7
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        }
      })
      .then(function(response) {
        var aiMessage = response.data.choices[0].text.trim();
        addMessage("ai", aiMessage);
      })
      .catch(function(error) {
        console.error(error);
      });
    }
  });

  // Función para agregar un mensaje al registro de chat
  function addMessage(sender, message) {
    var messageElement = document.createElement("div");
    messageElement.className = "message " + sender;
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
});
