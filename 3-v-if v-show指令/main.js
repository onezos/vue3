const app = Vue.createApp({
    data() {
        return {
            imginfo: '商品',
            image: './assets/images/smile.png',
            inSmile: 100
        }
    }
});
const mountedApp = app.mount('#app');