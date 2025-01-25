  <template>
    <div class="contents">
        <div class="location">
        <!-- 상단 제목 -->
        <h1 class="title">LOCATION</h1>
    
        <!-- 장소 정보 -->
        <div class="venue">
            <div class="venue-name">
            파티앤프렌즈 파블로홀
            <a href="https://naver.me/FqWaF61s" target="_blank" class="icon">
                🔗
            </a>
        </div>
            <div class="venue-address">
            서울 중구 다산로46길 17<br />
            청계천 두산위브더제니스 B1
            <button @click="copyToClipboard('서울 중구 다산로46길 17 청계천 두산위브더제니스')" class="icon">
                📋
            </button>
        </div>
        </div>
    
        <!-- 지도 -->
        <div id="map" class="map"></div>
    
        <!-- 교통 정보 -->
        <div class="transport">
            <div class="section">
            <div class="section-title">자차</div>
            <div>내비게이션: '파티앤프렌즈' 검색<br />서울 중구 다산로46길 17 청계천 두산위브더제니스 B1</div>
            </div>
            <hr class="divider" />
            <div class="section">
            <div class="section-title">버스</div>
            <div>(간선) 202, 421, 463, N62<br />(지선) 2012, 2013, 2014, 2015<br />신당역 1번 출구 하차 후 도보 6분</div>
            </div>
            <hr class="divider" />
            <div class="section">
            <div class="section-title">지하철</div>
            <div>신당역 (2호선, 6호선)<br />6호선 신당역 11번 출구 방향 지하1층 연결</div>
            </div>
            <hr class="divider" />
            <div class="section">
            <div class="section-title">주차</div>
            <div>지하 3층 전용 주차장 이용</div>
            </div>
        </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LocationComponent",
    methods: {
      copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
          alert("주소가 복사되었습니다😊");
        });
      },
      loadNaverMapScript() {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          // 네이버 지도 API가 이미 로드된 경우
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_MAP_CLIENT_ID}`;        script.async = true;
        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
      });
    },
    initializeMap() {
      const lat = 37.5668819;
      const lon = 127.0165598;

      // 지도 초기화
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(lat, lon), // 파티앤프렌즈 좌표
        zoom: 16,
      });

      // 마커 추가
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lon), // 마커 좌표
        map: map,
        title: "파티앤프렌즈",
      });

      // 정보창 추가
      const infoWindow = new naver.maps.InfoWindow({
        content: `
          <div style="padding:7px; font-size:15px; font-weight:bold; ">
            <a href="https://naver.me/FqWaF61s" target="_blank" style="text-decoration:none;">
              파티앤프렌즈
            </a>
          </div>
        `,
      });

      // 마커 클릭 시 정보창 열기
      naver.maps.Event.addListener(marker, "click", () => {
        infoWindow.open(map, marker);
      });

      // 초기 상태에서 정보창 표시
      infoWindow.open(map, marker);
    },
  },
    mounted() {
        // 네이버 지도 스크립트 로드 후 초기화
        this.loadNaverMapScript()
        .then(() => this.initializeMap())
        .catch((error) => console.error("네이버 지도 로드 오류:", error));
    },
  };
  </script>
  
  <style scoped>
  .contents {
    height: 1500px;
  }
  .location {
    margin: auto 0px;
    max-width: 100%;
    font-family: 'NanumSquareRoundR', sans-serif;
    color: var(--text-color-dark-gray);
  }
  .title {
    font-family: 'ChosunNm', sans-serif;
    font-size: 45px;
    font-weight: lighter;
    color: var(--text-color-point-navy);
  }
  .venue {
    text-align: center;
    margin-top: 70px;
  }
  .venue-name {
    font-size: 23px;
    font-weight: bold;
    color: var(--text-color-point-gold);
  }
  .venue-address {
    margin-top: 20px;
    font-size: 15px;
    color: var(--text-color-light-gray);
  }
  .icon {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
  .map {
    width: 100%;
    height: 300px; /* 지도 높이 설정 */
    margin: 40px 0;
    border-radius: 10px;
    border: 5px solid var(--primary-color-purple);
    overflow: hidden;
  }
  .transport {
    text-align: left;
    margin-top: 20px;
    line-height: 1.6;
  }
  .section {
    margin: auto;
    font-size: 15px;
  }
  .section-title {
    font-weight: bold;
    font-size: 18px;
    color: var(--primary-color-purple);
    margin-bottom: 10px;
  }
  .divider {
    border: 0;
    border-top: 1px solid var(--primary-color-purple);
    margin: 20px auto;
  }
  </style>