app.component('review-form', {
    template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit">
        <h3>评价：</h3>
        <label for="name">姓名:</label>
        <input id="name" v-model="name">

        <label for="review">内容:</label>      
        <textarea id="review" v-model="review"></textarea>

        <label for="rating">等级:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <input class="button" type="submit" value="提交">  

    </form>`,
    data() {
        return {
            name: '',
            review: '',
            rating: null,
        }
    },
    methods: {
        onSubmit() {
            if (this.name === '' || this.review === '' || this.rating === null || this.recommend === null) {
                alert('亲，请填满所有字段.')
                return
            }

            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
            }
            this.$emit('review-submitted', productReview)

            this.name = ''
            this.review = ''
            this.rating = null
        }
    }
})