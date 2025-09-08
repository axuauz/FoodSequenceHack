async function setBoxToDeparture(id = "1-2") { //알아서 바꿔서 쓰세요 야르
  const GET_URL = "https://food-sequence.vercel.app/api/boxes?" + Date.now();
  const POST_URL = "https://food-sequence.vercel.app/api/boxes";
  const res = await fetch(GET_URL, {
    cache: "no-cache",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    },
  });
  if (!res.ok) throw new Error("GET /api/boxes 실패");
  const data = await res.json();
  if (!data.success || !Array.isArray(data.boxes)) {
    throw new Error("서버 응답에 boxes가 없음");
  }

  const boxes = data.boxes.map((b) =>
    b.id === id
      ? {
          ...b,
          status: "departure",
          lastModifiedBy: "admin",
          lastModified: Date.now(),
        }
      : b
  );
  const save = await fetch(POST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify({ boxes }),
  });
  if (!save.ok) throw new Error("POST /api/boxes 실패");
  const saved = await save.json();

  console.log("변경 결과:", saved);
  return saved;
}

// 알아서 바꾸세요 
setBoxToDeparture("1-2").catch(console.error); 
