app.component('product-display', {
    props: {
        premium: {
        type: Boolean,
        required: true
        }
    },
    template: 
        `<div class="display">
            <div class="container">
                <div class="image">
                    <!-- 图片放在这-->
                    <img :src="image">
                </div>
                <div class="info">
                    <h1>{{ title }}</h1>
                    <p v-if="inSlanket > 10">有货</p>
                    <p v-else-if="inSlanket <= 10 && inSlanket > 0">快要卖光了</p>
                    <p v-else>缺货</p>
                    <ul>
                        <li v-for="detail in details">{{ detail }}</li>
                    </ul>
                    <div 
                        v-for="(item, index) in items" 
                        :key="item.id" 
                        @mouseover="updateItem(index)"
                        class="color-circle"
                        :style="{ backgroundColor: item.attrs }">
                    </div>
                    <p>运费: {{ shipping }}</p>
                    <button 
                        class="button" 
                        :class="{ disabledButton: !inSlanket }" 
                        :disabled="!inSlanket" 
                        @click="addToCart">
                        添加到购物车
                    </button>
                    <button 
                        class="button" 
                        :class="{ disabledButton: !inSlanket }" 
                        :disabled="!inSlanket" 
                        @click="removeFromCart">
                        删除商品
                    </button>
                </div>
            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>`,
    data() {
        return {
            imginfo: '加厚毛毯',
            brand: 'DDTalk',
            details: ['羊羔绒', '加厚', '保暖'],
            items: [
                    { id: 001, attrs: '#1a65c0', image: './assets/images/blue.png', quantity: 50 },
                    { id: 002, attrs: '#ecb563', image: './assets/images/yellow.png', quantity: 0 }
            ],
            selectedItem: 0,
            reviews: []
        }
    },
    computed: {
        title() {
            return this.brand + '牌' + this.imginfo
        },
        image() {
            return this.items[this.selectedItem].image
        },
        inSlanket() {
            return this.items[this.selectedItem].quantity
        },
        shipping() {
            if (this.premium) {
                return '免费'
            }
            return 9.9
        },
    },
    methods: {
        updateItem(index) {
            this.selectedItem = index
        },
        addToCart() {
            this.$emit('add-to-cart', this.items[this.selectedItem].id)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.items[this.selectedItem].id)
        },
        addReview(review) {
            this.reviews.push(review)
        }
    }
})