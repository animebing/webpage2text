function extractText() {
    const url = document.getElementById('url').value;
    if (url === "") {
      alert("Please enter a url");
      return;
    }

    const button_0 = document.getElementById('button_0');
    button_0.innerHTML = '<span class="loading"><span class="inner"></span><span class="inner"></span><span class="inner"></span></span>'
    
    const button_1 = document.getElementById('button_1');
    const button_2 = document.getElementById('button_2');
    button_1.disabled = true;
    button_2.disabled = true;

    document.getElementById('text').value = "";
    fetch('/api/extract?url=' + url)
      .then(response => response.text())
      .then(data => {
        const text = JSON.parse(data);
        if (text === null) {
          alert("Extraction fails");
          return;
        }
        document.getElementById('text').value = text;
      })
      .catch(error => {
        console.log(error);
        alert("Extraction fails");
      })
      .finally(() => {
        button_0.innerHTML = "Extract Text"
        button_1.disabled = false;
        button_2.disabled = false;
      });
}

function copyText() {
  const textarea = document.getElementById('text');
  if (textarea.value === "") {
    alert("There is no text");
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(textarea.value)
    .then(() => {
      alert("Copied to clipboard");
    })
    .catch((err) => {
      console.error('Error copying text: ', err);
    });
  }
  else {
    // navigator.clipboard does not work in android
    textarea.select();
    document.execCommand("copy");
    const selection = document.getSelection();
    selection.empty();
    alert("Copied to clipboard");

  }
}

function saveText() {
  const text = document.getElementById('text').value;
  if (text === "") {
    alert("There is no text");
    return;
  }

  const filename = 'text.txt';
  const blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
