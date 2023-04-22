const chatNameInput = document.getElementById("chat-name-input");
const chatMessageInput = document.getElementById("chat-message-input");
const chatOutput = document.getElementById("chat-output");

function sendMessage() {
  const name = chatNameInput.value;
  const message = chatMessageInput.value;
  console.log(name);
  console.log(message);

  if (name && message) {
    const newMessage = document.createElement("div");
    newMessage.innerHTML = `<strong>${name}:</strong> ${message}`;
    chatOutput.appendChild(newMessage);

    // Clear the input fields
    chatNameInput.value = "";
    chatMessageInput.value = "";
  }
}
