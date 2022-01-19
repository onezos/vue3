const app = Vue.createApp({
    data() {
        return {
            imginfo: '商品',
            image: './assets/images/smile.png',
            inSmile: 100,
            details: ['20% 眼睛', '10% 嘴', '20% 红脸蛋'],
            items: [
                    { id: 001, attrs: 'smile'},
                    { id: 002, attrs: 'cry' }
            ],
            objs: {
                name: 'zhang san',
                age: 18
            }
        }
    }
});
const mountedApp = app.mount('#app');