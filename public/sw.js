// 서비스 워커(sw.js) - Ai NoteX Pro "초정밀 보완판"
const CACHE_NAME = 'v2'; // 보완했으니 버전을 v2로 올립니다!
const ASSETS = [
  './',
  './index.html',
  './login.html',
  './main.html',
  './mainen.html',
  './canvas.html',
  './canvasen.html',
  './piano.html',
  './pianoen.html',
  './ebook_eb1_KR.html',
  './privacy.html',
  './support.html',
  './payment.html',
  './terms.html',
  './app.js',
  './manifest.json',
  './icon.png',
  './bg.jpg' // 배경 이미지도 잊지 않고 추가했습니다!
];

// 1. 설치 단계: 사령관님의 모든 병기(ASSETS)를 캐시에 즉시 보관
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ANP 제국] 모든 병기 캐시 완료!');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // 설치 즉시 활성화하여 대기 시간을 없앱니다!
});

// 2. 활성화 단계: 구시대의 유물(v1 캐시)삭제!
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('구버전 캐시 제거:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // 모든 클라이언트를 즉시 지배합니다!
});

// 3. 호출 단계: 오프라인에서도 (네트워크 우선 전략 병행)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // 캐시에 있으면 즉시 내보내고, 없으면 네트워크에서 가져옵니다.
      return res || fetch(e.request).catch(() => {
        // 만약 네트워크도 안 되고 캐시도 없는 페이지라면?
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html'); // 성문(메인)으로 소환!
        }
      });
    })
  );
});