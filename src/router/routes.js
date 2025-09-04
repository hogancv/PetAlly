import path from 'path'

// routes.js
const routes = [
    {
        path: '/test',
        name: 'test',
        component: () => import('@/pages/test.vue')
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/Login.vue')
    },
    {
        path: '/',
        name: 'home',
        meta: {
            keepAlive: true // 不需要缓存
        },
        component: () => import('@/pages/home/Home.vue')
    },

    {
        path: '/news0',
        name: 'news0',
        meta: {
            navbarTitle: '宠物资讯'
        },
        component: () => import('@/pages/home/news/News0.vue')
    },
    {
        path: '/news1',
        name: 'news1',
        meta: {
            navbarTitle: '宠物资讯'
        },
        component: () => import('@/pages/home/news/News1.vue')
    },
    {
        path: '/news2',
        name: 'news2',
        meta: {
            navbarTitle: '宠物资讯'
        },
        component: () => import('@/pages/home/news/News2.vue')
    },
    {
        path: '/swiper0',
        name: 'swiper0',
        meta: {
            navbarTitle: '饲养指南'
        },
        component: () => import('@/pages/home/swiper/Swiper0.vue')
    },
    {
        path: '/swiper1',
        name: 'swiper1',
        meta: {
            navbarTitle: '饲养指南'
        },
        component: () => import('@/pages/home/swiper/Swiper1.vue')
    },
    {
        path: '/swiper2',
        name: 'swiper2',
        meta: {
            navbarTitle: '饲养指南'
        },
        component: () => import('@/pages/home/swiper/Swiper2.vue')
    },
    {
        path: '/identifytip',
        name: 'identifytip',
        meta: {
            navbarTitle: ' '
        },
        component: () => import('@/pages/home/function/IdentifyTip.vue')
    },
    {
        path: '/airecommendation',
        name: 'airecommendation',
        meta: {
            navbarTitle: 'AI推荐'
        },
        component: () => import('@/pages/home/function/AiRecommendation.vue')
    },
    {
        path: '/requestassistance',
        name: 'requestassistance',
        meta: {
            navbarTitle: '流浪猫狗援助'
        },
        component: () => import('@/pages/home/function/RequestAssistance.vue')
    },
    {
        path: '/mypet',
        name: 'mypet',
        meta: {
            navbarTitle: '我的宠物'
        },
        component: () => import('@/pages/home/function/MyPet.vue')
    },
    {
        path: '/search',
        name: 'search',
        meta: {
            navbarTitle: '搜索'
        },
        component: () => import('@/pages/home/search/Search.vue')
    },
    {
        path: '/searchresult',
        name: 'searchresult',
        meta: {
            navbarTitle: '搜索结果'
        },
        component: () => import('@/pages/home/search/SearchResult.vue'),
        props: (route) => ({
            petList: JSON.parse(route.query.q)
        })
    },
    {
        path: '/petdetail/:id',
        name: 'petdetail',
        meta: {
            navbarTitle: '宠物详情'
        },
        component: () => import('@/pages/home/petDetail/PetDetail.vue')
    },
    {
        path: '/petmore',
        name: 'petmore',
        meta: {
            hidetabbar: true
        },
        component: () => import('@/pages/home/PetMore.vue')
    },
    {
        path: '/petclass',
        name: 'petclass',
        meta: {
            hidetabbar: true
        },
        component: () => import('@/pages/home/PetClass.vue')
    },
    {
        path: '/petcard',
        name: 'petcard',
        meta: {
            hidetabbar: true
        },
        component: () => import('@/pages/home/PetCard.vue')
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/pages/user/User.vue')
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('@/pages/help/Help.vue')
    },
    {
        path: '/community',
        name: 'community',
        component: () => import('@/pages/community/Community.vue')
    },
    {
        path: '/learning0',
        name: 'learning0',
        meta: {
            navbarTitle: '百科知识'
        },
        component: () => import('@/pages/community/learning/Learning0.vue')
    },
    {
        path: '/learning1',
        name: 'learning1',
        meta: {
            navbarTitle: '百科知识'
        },
        component: () => import('@/pages/community/learning/Learning1.vue')
    },
    {
        path: '/waterfall',
        name: 'waterfall',
        meta: {
            navbarTitle: '瀑布流'
        },
        component: () => import('@/pages/community/Waterfall.vue')
    },
    {
        path: '/communitydetail/:id',
        name: 'communitydetail',
        meta: {
            navbarTitle: '宠友分享'
        },
        component: () => import('@/pages/community/CommunityDetail.vue')
    },
    {
        path: '/identifyhistory',
        name: 'identifyhistory',
        meta: {
            navbarTitle: '识别历史'
        },
        component: () => import('@/pages/user/IdentifyHistory.vue')
    },
    {
        path: '/recommendationhistory',
        name: 'recommendationhistory',
        meta: {
            navbarTitle: '推荐历史'
        },
        component: () => import('@/pages/user/RecommendationHistory.vue')
    },
    {
        path: '/identificationresult',
        name: 'identificationresult',
        meta: {
            navbarTitle: '识别结果'
        },
        component: () => import('@/pages/home/IdentificationResult.vue')
    },
    {
        path: '/helpdetail1',
        name: 'helpdetail1',
        meta: {
            navbarTitle: '(第1期) 用爱终结流浪'
        },
        component: () => import('@/pages/help/HelpDetail1.vue')
    },
    {
        path: '/helpdetail2',
        name: 'helpdetail2',
        meta: {
            navbarTitle: '(第2期) 拾起被遗弃的爱'
        },
        component: () => import('@/pages/help/HelpDetail2.vue')
    },
    {
        path: '/mall',
        name: 'mall',
        meta: {
            navbarTitle: '积分商城'
        },
        component: () => import('@/pages/user/Mall.vue')
    },
    {
        path: '/join',
        name: 'join',
        meta: {
            navbarTitle: '预约回收'
        },
        component: () => import('@/pages/help/Join.vue')
    },
    {
        path: '/addresslist',
        name: 'addresslist',
        meta: {
            navbarTitle: '地址管理'
        },
        component: () => import('@/pages/help/AddressList.vue')
    },
    {
        path: '/addressedit',
        name: 'addressedit',
        meta: {
            navbarTitle: '编辑地址'
        },
        component: () => import('@/pages/help/AddressEdit.vue')
    },
    {
        path: '/publishpage',
        name: 'publishpage',
        meta: {
            navbarTitle: '发布页'
        },
        component: () => import('@/pages/community/PublishPage.vue')
    },
    {
        path: '/pointscenter',
        name: 'pointscenter',
        meta: {
            navbarTitle: '积分中心'
        },
        component: () => import('@/pages/user/PointsCenter.vue')
    },
    {
        path: '/pointsdetail',
        name: 'pointsdetail',
        meta: {
            navbarTitle: '积分明细'
        },
        component: () => import('@/pages/user/PointsDetail.vue')
    },
    {
        path: '/pet/:id/diary',
        name: 'petdiary',
        meta: {
            navbarTitle: '宠物日记'
        },
        component: () => import('@/pages/pet/PetDiary.vue')
    }
]

export default routes
