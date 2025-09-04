import axios from '@/api/index.js'

export const getCommunityListData = (params) => {
    return axios({
        url: '/api/post/list',
        method: 'post',
        data: {
            ...params
        }
    })
}

export const getCommunityDetailData = (id) => {
    return axios({
        url: '/api/publish_detail/info',
        method: 'get',
        params: {
            id
        }
    })
}

export const addPublishDetail = (params) => {
    return axios({
        url: '/api/publish_detail/add',
        method: 'post',
        data: {
            ...params
        }
    })
}

export const addPublish = (params) => {
    return axios({
        url: '/api/post/add',
        method: 'post',
        data: {
            ...params
        }
    })
}

export const getPublishPage = (id) => {
    return axios({
        url: '/api/post/page',
        method: 'post',
        data: {
            post_id: id
        }
    })
}

export const detelePublish = (id) => {
    return axios({
        url: '/api/post/delete',
        method: 'post',
        data: {
            ids: id
        }
    })
}
