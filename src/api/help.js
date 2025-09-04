import axios from '@/api/index.js'

export const getCatListData = () => {
    return axios({
        url: '/api/adoption-info/page',
        method: 'post',
        data: {
            type: 0
        }
    })
}

export const getDogListData = () => {
    return axios({
        url: `/api/adoption-info/page`,
        method: 'post',
        data: {
            type: 1
        }
    })
}

export const updateAdoptionInfo = (data) => {
    return axios({
        url: `/api/adoption-info/update`,
        method: 'post',
        data
    })
}
