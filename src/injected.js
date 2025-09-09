const originalFetch = window.fetch;
window.fetch = function(...args) {
  const url = args[0];
  const options = args[1] || {};
  if (typeof url === 'string' && url.endsWith('/api/auth')) {
    console.log("/api/auth 정상감지됨");

    const method = options.method ? options.method.toUpperCase() : 'GET';
    
    if (method === 'GET') {
      console.log("-> GET Success 리턴");
      const fResponse = { authenticated: true };
      const response = new Response(JSON.stringify(fResponse), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
      return Promise.resolve(response);
    }

    if (method === 'POST') {
      console.log("-> POST Success 리턴");
      const fResponse = { success: true };
      const response = new Response(JSON.stringify(fResponse), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
      return Promise.resolve(response);
    }
  }
  return originalFetch.apply(this, args);
};
console.log("fetch 성공 /api/auth 요청 모두 성공");
const passwordInput = document.querySelector('input[type="password"]');
if (passwordInput) {
  passwordInput.value = "ACTistheBESTclub"; //ㄹㅇㅋㅋ
}
const loginButton = document.querySelector('button[type="submit"]');
if (loginButton) {
  loginButton.click();
}