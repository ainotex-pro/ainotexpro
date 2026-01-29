function takeOffToUSA() {
    console.log(" ");
    
   
    const flightUrl = "https://www.google.com/search?q=USA+Mainland&hl=en&gl=us";
    
   
    window.open(flightUrl, "_blank");
}

// 1. 보안 금고: 데이터를 외계어로 바꿔 저장하는 함수
function saveSecure(key, data) {
    const encodedData = btoa(unescape(encodeURIComponent(data)));
    localStorage.setItem(key, encodedData);
}

// 2. 보안 해제: 외계어를 다시 한글로 풀어내는 함수
function loadSecure(key) {
    const encodedData = localStorage.getItem(key);
    if (!encodedData) return null;
    try {
        return decodeURIComponent(escape(atob(encodedData)));
    } catch (e) {
        return null;
    }
}

// 3. 통합 표시 함수: 보안 금고 + 검색 + 필터를 한 번에 처리!
function loadAndShow(filter = 'all') {
    const listArea = document.getElementById('noteList');
    if (!listArea) return; // 바구니 없으면 중단

    // 보안 금고에서 메모 꺼내기
    const savedData = loadSecure('myNotes'); 
    const notes = JSON.parse(savedData || "[]");
    
    // 검색창 글자 가져오기
    const sInput = document.getElementById('mySearchInput');
    const sTerm = sInput ? sInput.value.toLowerCase() : "";

    // 카테고리와 검색어에 맞는 것만 골라내기
    let displayData = notes.filter(n => {
        const isCategory = (filter === 'all' || n.category === filter);
        const isSearch = n.title.toLowerCase().includes(sTerm);
        return isCategory && isSearch;
    });

    listArea.innerHTML = ""; // 목록 비우기

    if (displayData.length === 0) {
        listArea.innerHTML = "<p style='text-align:center; padding:20px; color:#999;'>결과가 없습니다.</p>";
        return;
    }

    // 화면에 예쁘게 그리기 (최신순 역순)
    [...displayData].reverse().forEach((n) => {
        const div = document.createElement('div');
        div.className = 'note-item';
        const safeTitle = n.title.replace(/'/g, "\\'");
        div.innerHTML = `
            <div class="note-info">
                <span class="category-tag">[${n.category || '일반'}]</span><br>
                <strong>${n.title}</strong>
            </div>
            <div class="btn-group">
                <button class="view-btn" onclick="startEdit('${safeTitle}')">보기</button>
                <button class="del-btn" onclick="deleteMemo('${safeTitle}')">삭제</button>
            </div>
        `;
        listArea.appendChild(div);
    });
}

// 4. 검색창 실행 함수
function runMemoSearch() {
    loadAndShow('all'); 
}

// 5. 메모 추가 (알림 예시)
function addNote() { 
    alert("메모가 추가되었습니다"); 
    // 실제 추가 로직이 필요하면 나중에 여기에 더 넣으시면 됩니다!
}

/* Ai NoteX Pro Beta 문자 보내기 태그 2026.01.20  */

function sendSMS() {
    // 1. 메모를 쓰는 칸(textarea)을 찾습니다.
    const memoArea = document.querySelector('textarea'); 
    
    // 2. 칸이 있고, 글자가 들어있는지 확인합니다.
    if (memoArea && memoArea.value.trim() !== "") {
        const message = memoArea.value;
        // 3. 문자 앱으로 안전하게 배달!
        window.location.href = "sms:?body=" + encodeURIComponent(message);
    } else {
        // 4. 비어있으면 알림.
        alert("보낼 내용이 없습니다! 메모를 입력해 주세요.");
    }
}

/* 🛡️ eBook 황금 팝업 가동 로직 */
function openEbookPopup() {
   
    const popup = document.getElementById('ebookPopup');
    if (popup) {
        popup.style.display = 'block';
        console.log("Mission Success: JS Cheol's Golden Popup Activated!");
    }
}

