import axios from '@/api/index.js'

export const getPetListData = (keyWord) => {
    return axios({
        url: '/api/pet/page',
        method: 'post',
        data: {
            keyWord
        }
    })
}

export const getPetDetailData = (id) => {
    return axios({
        url: `/api/pet/info`,
        method: 'get',
        params: {
            id
        }
    })
}

export const getPetPageData = (params) => {
    return axios({
        url: `/api/pet/page`,
        method: 'post',
        data: {
            ...params
        }
    })
}

export const addAssistanceData = (params) => {
    return axios({
        url: `/api/assistance/add`,
        method: 'post',
        data: {
            ...params
        }
    })
}
