console.log("🟢 🟢 content.js loaded (URL detection)");

const ignoreUrls = ["/login","/signin","/sign-in","/auth"];
const passwordUrls = ["/register","/signup","/create-account","/reset-password","/password-reset"];

let triggeredUrls = new Set();

function shouldTriggerGenerator() {
  const currentUrl = window.location.href.toLowerCase();
  
  if (ignoreUrls.some(seg => currentUrl.includes(seg))) return false;
  if (passwordUrls.some(seg => currentUrl.includes(seg))) return true;
  if (document.querySelectorAll('input[type="password"]').length >= 2) return true;

  return false;
}

function triggerGeneratorDetection() {
  const currentUrl = window.location.href.toLowerCase();
  if (triggeredUrls.has(currentUrl)) return;

  triggeredUrls.add(currentUrl);
  console.log("🔐 Password creation page detected via URL:", currentUrl);

  // Send message to popup
  chrome.runtime.sendMessage({ type: "PASSWORD_PAGE_DETECTED" });
}

// Observe DOM for SPA pages
const observer = new MutationObserver(() => {
  if (shouldTriggerGenerator()) triggerGeneratorDetection();
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial check
if (shouldTriggerGenerator()) triggerGeneratorDetection();
