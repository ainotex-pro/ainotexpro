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


// 삼각형 (지붕이나 치수 표시용)
if(type === 'triangle') {
    obj = new fabric.Triangle({ ...opt, width: size, height: size });
}

// 수정 구름 (현장에서 "여기 고쳐!" 할 때 쓰는 구름 모양)
if(type === 'cloud') {
    obj = new fabric.Path('M 25 10 C 15 10 10 20 15 30 C 5 35 10 45 20 45 C 20 55 35 55 40 45 C 50 45 55 35 45 30 C 50 20 40 10 25 10 Z', 
    { ...opt, scaleX: size/30, scaleY: size/30 });
}

// 말풍선 (아이들이 글자 써넣기 최고!)
if(type === 'chat') {
    obj = new fabric.Path('M 10 10 H 90 V 70 H 40 L 20 90 V 70 H 10 Z', 
    { ...opt, scaleX: size/50, scaleY: size/50 });
}

function sendToGooglePhotos() {
    // 1. 캔버스 확인
    var canvas = document.getElementById('c'); 
    if (!canvas) {
        alert("캔버스를 찾지 못했습니다, 사령관님!");
        return;
    }

    // 2. 이미지 생성 (최신 시간표시를 넣어 파일 찾기 쉽게!)
    var now = new Date();
    var timestamp = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate() + "_" + now.getHours() + now.getMinutes();
    var imageData = canvas.toDataURL("image/png");

    // 3. 자동으로 내 컴퓨터에 저장 (사용자가 찾을 필요 없게 하단에 툭 띄움)
    var link = document.createElement('a');
    link.href = imageData;
    link.download = 'AiNoteX_작품_' + timestamp + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 4. 구글 포토 업로드 '직통 주소'로 이동
    // 이 주소는 구글 포토에서 바로 "컴퓨터에서 선택" 창을 유도하는 가장 가까운 지점입니다.
    setTimeout(function() {
        alert("🎉 그림이 저장되었습니다!\n\n화면 하단에 생성된 파일을 마우스로 '꾹' 눌러서\n새로 열린 구글 창에 '툭' 던져넣으세요!");
        window.open('https://photos.google.com/upload', '_blank');
    }, 500); // 저장이 완료될 시간을 잠시 벌어줍니다.
}

async function sendToGooglePhotos() {
    const canvas = document.getElementById('c');
    const dataUrl = canvas.toDataURL("image/png");
    
    // 1. 이미지 데이터를 파일 객체로 만듭니다.
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], 'AiNoteX_Work.png', { type: 'image/png' });

    // 2. 브라우저의 '공유하기' 창을 강제로 띄웁니다!
    if (navigator.share) {
        navigator.share({
            files: [file],
            title: '내 그림 전송',
            text: 'AiNoteX Pro에서 그린 작품입니다.'
        }).then(() => {
            console.log('공유 성공!');
        }).catch((error) => {
            console.log('공유 실패:', error);
            // 공유 안 되면 그냥 다운로드라도 시켜드리기!
            var link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'AiNoteX_Work.png';
            link.click();
        });
    } else {
        // 공유 기능이 없는 구형 PC라면? 그냥 저장하고 구글 포토 열어드리기
        alert("이 브라우저는 자동 공유를 지원하지 않습니다. 그림을 저장합니다!");
        var link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'AiNoteX_Work.png';
        link.click();
        window.open('https://photos.google.com/upload', '_blank');
    }
}

function updateSaveList() {
    const select = document.getElementById('save-list');
    // 로컬 스토리지 키 명칭 확인 (AiNoteX_Saves 가 맞는지 확인!)
    const allSaves = JSON.parse(localStorage.getItem('AiNoteX_Saves') || '{}');
    
    // 💡 핵심: 목록을 그리기 전에 이 문구를 가장 먼저 삽입합니다.
    select.innerHTML = '<option value="">📂 저장된 목록 보기</option>';
    
    for (let title in allSaves) {
        const opt = document.createElement('option');
        opt.value = title;
        opt.innerHTML = title;
        select.appendChild(opt);
    }
}

function updateSaveList() {
    const select = document.getElementById('save-list');
    if (!select) return;

    const allSaves = JSON.parse(localStorage.getItem('AiNoteX_Saves_All') || '{}');
    
    // 1. 박스 안을 비우면서 동시에 '기본 문구'를 강제로 집어넣습니다.
    select.innerHTML = '<option value="" disabled selected>📂 저장 목록 보기</option>';
    
    for (let title in allSaves) {
        let opt = document.createElement('option');
        opt.value = title; 
        opt.innerHTML = title;
        select.appendChild(opt);
    }
}

// 6. 저장 목록 갱신
    function updateSaveList() {
        const select = document.getElementById('save-list');
        // 데이터가 없어도 빈 객체({})를 가져오게 설정
        const allSaves = JSON.parse(localStorage.getItem('AiNoteX_Saves') || '{}');
        
        // [중요] 목록을 채우기 전에 무조건 문패를 먼저 박습니다!
        select.innerHTML = '<option value="">📂 저장된 목록 보기</option>';
        
        // 저장된 목록이 있을 때만 추가
        for (let title in allSaves) {
            const opt = document.createElement('option');
            opt.value = title;
            opt.innerHTML = title;
            select.appendChild(opt);
        }
        
        // 첫 번째 항목(문패)이 화면에 보이도록 고정
        select.selectedIndex = 0;
    }

// 4. 페이지가 로드될 때와 0.5초 뒤에 한 번 더 실행해서 확실히 글자를 박습니다.
window.addEventListener('load', updateSaveList);
setTimeout(updateSaveList, 500);
