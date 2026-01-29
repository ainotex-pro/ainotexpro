// 서비스 워커(sw.js) - Ai NoteX Pro 전용
const CACHE_NAME = 'v1';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon.png'  // 아이콘도 오프라인에서 보일 수 있게 추가하세요!
];

// 설치 시 필요한 파일 저장
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 파일 불러올 때 캐시 우선 사용
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});