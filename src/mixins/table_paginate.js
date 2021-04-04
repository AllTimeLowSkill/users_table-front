import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            page: 1,
            perPage: 50,
            pages: []
        }
    },

    computed: {
        ...mapGetters({
            users: 'users'
        })
    },

    mounted(){
        this.fetchUsers()
    },

    methods: {
        ...mapActions({
            fetchUsers: 'fetchUsers'
        }),

        setPages(){
            let numberOfPages = Math.ceil(this.users.length / this.perPage)
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