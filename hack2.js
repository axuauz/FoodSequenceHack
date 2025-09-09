const originalFetch = window.fetch;
window.fetch = function(...args) {
    const url = args[0];
    const options = args[1] || {};
    if (typeof url === 'string' && url.endsWith('/api/auth')) {
        console.log("/api/auth 요청이 감지되었습니다.");

        //GET 또는 POST 요청에 따라 다른 응답을 반환
        const method = options.method ? options.method.toUpperCase() : 'GET';
        
        // GET 요청 처리 (페이지 로딩 시 인증 확인)
        if (method === 'GET') {
            console.log("-> GET 요청을 가로채고 성공 응답을 반환합니다.");
            const fakeResponse = { authenticated: true };
            const response = new Response(JSON.stringify(fakeResponse), {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' }
            });
            return Promise.resolve(response);
        }

        // POST 요청 처리 ㄷㄱㅈ (로그인 시도)
        if (method === 'POST') {
            console.log("-> POST 요청을 가로채고 성공 응답을 반환합니다.");
            const fakeResponse = { success: true };
            const response = new Response(JSON.stringify(fakeResponse), {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' }
            });
            return Promise.resolve(response);
        }
    }

    // 오리지널 fetch 쓰는거임
    return originalFetch.apply(this, args);
};

console.log("fetch 함수가 성공적으로 조작되었습니다. 이제 /api/auth 요청이 모두 우회됩니다.");

