console.log("✅✅✅ script.js loaded ✅✅✅");

const characters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "0","1","2","3","4","5","6","7","8","9",
  "!","@","#","$","%","^","&","*","(",")"
];

let firstHarshed = [];
let secondHarshed = [];
let harshed = "";

const messageEl = document.getElementById("message");
const firstPasswordEl = document.getElementById("firstPassword");
const secondPasswordEl = document.getElementById("secondPassword");
const generateBtn = document.getElementById("generateBtn");
const copyBtn1 = document.getElementById("copyBtn1");
const copyBtn2 = document.getElementById("copyBtn2");
const alertBox = document.getElementById("alert");

// ---------- Event Listeners ----------
generateBtn.addEventListener("click", generatePassword);
copyBtn1.addEventListener("click", () => copyPassword(firstPasswordEl));
copyBtn2.addEventListener("click", () => copyPassword(secondPasswordEl));

// ---------- Functions ----------
function randomChar() {
  const idx = Math.floor(Math.random() * characters.length);
  return characters[idx];
}

function generatePassword() {
  firstHarshed = [];
  secondHarshed = [];
  
  let lengthInput = parseInt(document.getElementById("passwordLength").value, 10) || 15;

  if (lengthInput > 100) {
    lengthInput = 100;
    showAlert("Max password length is 100");
  }

  for (let i = 0; i < lengthInput; i++) {
    firstHarshed.push(randomChar());
    secondHarshed.push(randomChar());
  }

  updateDisplay();
  messageEl.innerText = `Your (${lengthInput}) character passwords have been generated.`;
}

function updateDisplay() {
  firstPasswordEl.innerText = firstHarshed.join("");
  secondPasswordEl.innerText = secondHarshed.join("");
}

function showAlert(text) {
  alertBox.querySelector("p").innerText = text;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 2000);
}

function copyPassword(el) {
  const pwd = el.innerText;
  if (!pwd) return;
  navigator.clipboard.writeText(pwd);
  showAlert("Password copied to clipboard!");
  
  // Auto-close popup after 1.5 seconds
  setTimeout(() => {
    window.close();
  }, 1500);
}

// ---------- Listen for content script message ----------
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "PASSWORD_PAGE_DETECTED") {
    messageEl.innerText = "Password creation detected on this page";
    messageEl.style.color = "#10b981"; // green
  }
});
