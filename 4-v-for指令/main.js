const app = Vue.createApp({
    data() {
        return {
            imginfo: '商品',
            image: './assets/images/blue.png',
            inSlanket: 100,
            details: ['羊羔绒', '加厚', '保暖'],
            items: [
                    { id: 001, attrs: '蓝色'},
                    { id: 002, attrs: '黄色' }
            ],
            objs: {
                name: '毛毯',
                prices: 130
            }
        }
    }
});
const mountedApp = app.mount('#app');