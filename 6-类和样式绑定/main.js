const app = Vue.createApp({
    data() {
        return {
            imginfo: '加厚毛毯',
            image: './assets/images/blue.png',
            inSlanket: 0,
            details: ['羊羔绒', '加厚', '保暖'],
            items: [
                    { id: 001, attrs: '#1a65c0', image: './assets/images/blue.png' },
                    { id: 002, attrs: '#ecb563', image: './assets/images/yellow.png'}
            ],
            cart:0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateImage(itemImage) {
            this.image = itemImage
        },
    }
});
const mountedApp = app.mount('#app');