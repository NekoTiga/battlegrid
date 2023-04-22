function displayLog(text) {
  const logOutput = document.querySelector('#log-output');
  const logDiv = document.createElement('div');
  logDiv.className = 'log';
  logDiv.textContent = text;
  logOutput.appendChild(logDiv);
}
