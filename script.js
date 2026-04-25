const questions = [
  "How often do you feel anxious?",
  "Do you have trouble sleeping?",
  "How often do you feel sad or low?",
  "Do you feel motivated daily?",
  "Do you feel socially connected?",
  "Do you experience stress frequently?",
  "How is your concentration level?",
  "Do you feel overwhelmed easily?",
  "Do you enjoy daily activities?",
  "Do you feel hopeful about the future?"
];

const container = document.getElementById("questions");

questions.forEach((q, index) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${q}</p>
    <input type="number" name="q${index}" min="1" max="5" required placeholder="1-5" />
  `;
  container.appendChild(div);
});


// Submit Check-in
function submitCheckin() {
  const mood = document.getElementById("mood").value;
  const note = document.getElementById("note").value;

  fetch("http://localhost:5000/checkin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood, note })
  })
  .then(res => res.json())
  .then(data => alert("Check-in Saved"));
}


// Submit Assessment
document.getElementById("assessmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const answers = [];
  for (let i = 0; i < questions.length; i++) {
    answers.push(document.querySelector(`[name=q${i}]`).value);
  }

  fetch("http://localhost:5000/assessment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
  })
  .then(res => res.json())
  .then(data => alert("Assessment Submitted"));
});