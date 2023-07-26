function extractText() {
    const url = document.getElementById('url').value;
    if (url) {
      fetch('/api/extract?url=' + url)
        .then(response => response.text())
        .then(data => {
          const text = JSON.parse(data)
          console.log('bingbing: ' + text);
          document.getElementById('text').value = text;
        })
        .catch(error => console.log(error));
    }
  }

function copyText() {
  const text = document.getElementById('text').value;
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Copied text to keyboard");
    })
    .catch((err) => {
      console.error('Error copying text: ', err);
    });
}

function saveText() {
  const text = document.getElementById('text').value;
  const filename = 'text.txt';
  const blob = new Blob([text], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}