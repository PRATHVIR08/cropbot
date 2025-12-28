async function sendChat() {
  const message = document.getElementById("chatInput").value;

  const res = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  document.getElementById("chatResult").innerText = data.reply;
}

async function detectDisease() {
  const image = document.getElementById("imageInput").files[0];
  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch("http://localhost:5000/detect", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  document.getElementById("imageResult").innerText = data.result;
}
