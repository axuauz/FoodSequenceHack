function checkAndCreateButtons() {
  if (window.location.pathname.endsWith('/admin')) {
    if (!document.getElementById('hack-button')) {
      createHackButton();
    }
    if (!document.getElementById('unblock-context-button')) {
      createUnblockContextButton();
    }
  }
}

function createUnblockContextButton() {
  const button = document.createElement('button');
  button.id = 'unblock-context-button';
  button.textContent = '우클릭 차단 해제하기';
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    const script = document.createElement('script');
    script.textContent = `
      document.addEventListener('contextmenu', function (e) {
        e.stopPropagation();
      }, true);
      document.oncontextmenu = null;
    `;
    document.documentElement.appendChild(script);
    script.remove();
    
    alert("예아");
    button.disabled = true;
    button.textContent = '이지하노';
  });

  // 기존 hack-button의 왼쪽에 배치
  const hackButton = document.getElementById('hack-button');
  if (hackButton) {
    hackButton.parentNode.insertBefore(button, hackButton);
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
