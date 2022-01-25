app.component('review-list', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="review-container">
        <h3>预览:</h3>
        <ul>
            <li v-for="(review, index) in reviews" :key="index">
                {{ review.name }} 给了 {{ review.rating }} 颗星
                <br/>
                "{{ review.review }}"
                <br/>
            </li>
        </ul>
    </div>
`
})