import axios from '@/api/index.js'

export const getGoodListData = (params) => {
    return axios({
        url: '/api/integral_goods/list',
        method: 'post',
        data: {
            ...params
        }
    })
}
