<template>
    <div class="inner">
        <div class="ad-banner">
            <a href="http://naver.me/xOC27lWD" target="blank">
                <img src="../assets/resources/navermembership.png" alt="naver membership ads">
            </a>
        </div>
    </div>
</template>

<style scoped>
    .inner {
        max-width: 1150px;
        margin: 40px auto 50px;
        box-sizing: border-box;
        position: relative;
        /*포지션이 없는 경우에는 부모요소에 position relative 무조건적으로 추가해주기!*/
    }
    .ad-banner {
        max-width: 1080px;
        height: 105px;
        /* box-sizing: border-box; */
        /* object-fit: contain; */
        margin: auto;
    }
    img {
        max-width: 1080px;
        height: 105px;
    }
</style>