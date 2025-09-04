import { defineStore } from 'pinia'
import getDate from '@/utils/getDate.js'
const useUserInfoStore = defineStore({
    id: 'user',
    state: () => ({
        searchHistory: [],
        userName: '旺财小青蛙',
        avatarUrl: '/src/assets/images/user/avatar.jpg',
        recommendationHistory: [],
        IdentifyHistory: [],
        collectList: [],
        myPetList: [],
        userAddress: {},
        addressList: [],
        pointscenter: {
            points: 1000,
            pointsDetail: [],
            click1: false,
            click2: false,
            click3: false,
            click4: false,
            isSigned: false,
            ContinuousSign: 0
        },
        petDiaries: {}, // 格式: { petId: [{date, text, images, id}] }
        followedAuthors: []
    }),
    getters: {},
    actions: {
        async fetchUser() {
            const user = await fetchUser()
            this.name = user.name
            this.email = user.email
        },
        addSearchHistory(value) {
            const index = this.searchHistory.indexOf(value)
            if (index !== -1) {
                this.searchHistory.splice(index, 1)
            }
            this.searchHistory.unshift(value)
        },
        addItemName(value) {
            this.recommendationHistory[0].itemName = value
        },
        addPoints(name) {
            if (!name) {
                name = '签到'
            }
            this.pointscenter.pointsDetail.unshift({
                type: name,
                score: 100,
                createAt: getDate()
            })
            this.pointscenter.points += 100
        },
        addPetDiary(petId, diary) {
            if (!this.petDiaries[petId]) {
                this.petDiaries[petId] = []
            }
            this.petDiaries[petId].push({
                ...diary,
                id: Date.now(),
                date: new Date().toISOString()
            })
        },
        getPetDiaries(petId) {
            return this.petDiaries[petId] || []
        },
        toggleFollow(authorName) {
            const index = this.followedAuthors.indexOf(authorName)
            if (index === -1) {
                this.followedAuthors.push(authorName)
            } else {
                this.followedAuthors.splice(index, 1)
            }
        },
        isFollowing(authorName) {
            return this.followedAuthors.includes(authorName)
        }
    },
    persist: {
        enabled: true,
        strategies: ['local']
    }
})

export default useUserInfoStore
