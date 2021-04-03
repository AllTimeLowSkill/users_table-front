export default {
    data() {
        return {
            page: 1,
            perPage: 10,
            pages: []
        }
    },

    methods: {
        setPages(){
            let numberOfPages = Math.ceil(30 / this.perPage)
            for(let i = 1; i <= numberOfPages; i++){
                this.pages.push(i)
            }
        },

        paginate(users) {
            let page = this.page
            let perPage = this.perPage
            let from = (page * perPage) - perPage
            let to = (page * perPage)
            return users.slice(from, to)
        }
    }
}