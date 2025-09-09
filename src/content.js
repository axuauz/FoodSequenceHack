function checkAndCreateButtons() {
  if (window.location.pathname.endsWith('/admin')) {
    if (!document.getElementById('hack-button')) {
      createHackButton();
    }
  }
}

function createHackButton() {
  const button = document.createElement('button');
  button.id = 'hack-button';
  button.textContent = '비번없이 로그인하기';
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    const scriptURL = chrome.runtime.getURL('src/injected.js');
    
    const script = document.createElement('script');
    script.src = scriptURL;
    document.documentElement.appendChild(script);
    
    script.onload = () => {
      script.remove();
      alert("예아");
      button.disabled = true;
      button.textContent = '성공함 로그아웃 이후엔 필드에 아무거나 입력하고 다시 로그인 누르면 됨';
    };
  });
}

checkAndCreateButtons();

const observer = new MutationObserver(() => {
  checkAndCreateButtons();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

window.addEventListener('popstate', checkAndCreateButtons);
window.addEventListener('pushstate', checkAndCreateButtons);
window.addEventListener('replacestate', checkAndCreateButtons);
