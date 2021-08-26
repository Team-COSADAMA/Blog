<template>
    <div class="container">
        <div class="inner">
            <div class="postpic">
                <nuxt-link to='/'>
                    <img src="../assets/resources/featured-post-img1.png" alt="">
                </nuxt-link>
            </div>
            <div class="txtinner">
                <nuxt-link to='/'>
                    <div class="posttitle">깃헙 ipynb 파일 로딩이 안 돼요.</div>
                </nuxt-link>
                <div class="postdes">콜랩, 주피터에선 잘 열리던 ipynb 파일이 깃헙에서만 열리지 않는다면 해당 파일에서 사용한 패키지나 모듈이 깃헙에서 렌더링이 되지 않은 것! <br> 해결 방법에 대해 알아보자.
                </div>
                <nuxt-link to='/'>
                    <div class="postdetails">더 알아보기 ></div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .inner {
        max-width: 1080px;
        margin: 0 auto;
        box-sizing: border-box;
        position: relative;
    }
    .postpic {
        width: 1080px;
        height: 462px;
        overflow: hidden;
        border-radius: 15px;
        margin: auto;
    }
    .postpic img {
        width: 1080px;
        height: auto;
    }
    .txtinner {
        margin: 20px 0;
    }
    .posttitle {
        font-size: 2rem;
        font-weight: 600;
        color: #333D4B;
        margin-bottom: 19px;
    }
    .posttitle:hover {
        color: #3282F6;
        transition: 0.2s;
    }
    .postdes {
        font-size: 1rem;
        font-weight: 300;
        color: #4e5968;
        margin-bottom: 23px;
        line-height: 130%;
    }
    .postdetails {
        font-size: 16px;
        font-weight: 400;
        color: #3282F6;
    }
</style>