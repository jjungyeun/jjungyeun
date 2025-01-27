<template>
    <div class="contents">
        <div class="footer">
            <div class="message">저희의 새로운 시작을 축하해 주셔서 감사드립니다.</div>
            <div class="credit">새신부 정연이의 손길로 만들어진 페이지입니다😄</div>
            <div class="instagram-container">
                <span>Follow Us on Instagram</span>
                <a :href="groomInstagram" target="_blank" class="instagram-link">
                    <img src="@/assets/images/instagram.png" alt="Instagram" class="instagram-icon" />
                    영진
                </a>
                <a :href="brideInstagram" target="_blank" class="instagram-link">
                    <img src="@/assets/images/instagram.png" alt="Instagram" class="instagram-icon" />
                    정연
                </a>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            groomInstagram: "https://www.instagram.com/youngjin_kim3",
            brideInstagram: "https://www.instagram.com/jungyeunwon",
        }
    }
}
</script>

<style scoped>
.contents {
    padding: 30px 0;
    background-color: var(--text-color-point-navy);
}
.footer {
    width: 90%;
    text-align: left;
    color: var(--text-color-light-gray);
    font-family: 'GangwonEduAllL', sans-serif;
    font-size: 18px;
    line-height: 0.6;
}
.message {
    font-size: 18px;
    color: var(--text-color-point-gold);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    line-height: 1.2;
}
.credit {
    margin-top: 30px;
    font-size: 16px;
    color: var(--text-color-lightlight-gray);
}
/* 인스타그램 컨테이너 */
.instagram-container {
    margin-top: 10px;
    display: flex; /* 가로 정렬 */
    align-items: center;
    gap: 10px; /* 링크 간 간격 */
    font-size: 18px;
    color: var(--text-color-lightlight-gray);
}
/* 인스타그램 링크 스타일 */
.instagram-link {
    text-decoration: none;
    color: var(--text-color-lightlight-gray);
    display: flex;
    align-items: center;
    gap: 5px; /* 아이콘과 텍스트 간격 */
}

.instagram-link:hover {
    color: var(--text-color-point-gold);
}

/* 인스타그램 아이콘 스타일 */
.instagram-icon {
    width: 13px;
}
</style>