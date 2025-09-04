import key from '../../key-config'
import axios from '@/api/index.js'


const AK = key.BAIDU_AK
const SK = key.BAIDU_SK

async function identify(image) {
    var options = {
        method: 'POST',
        url:
            '/identify/rest/2.0/image-classify/v1/animal?access_token=' +
            (await getAccessToken()),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        },
        // image 可以通过 getFileContentAsBase64("C:\fakepath\萨摩耶.jpeg") 方法获取,
        data: {
            image: image,
            baike_num: 6
        }
    }
    return await axios(options)
}

/**
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
function getAccessToken() {
    let options = {
        method: 'POST',
        url:
            '/identify/oauth/2.0/token?grant_type=client_credentials&client_id=' +
            AK +
            '&client_secret=' +
            SK
    }
    return new Promise((resolve, reject) => {
        axios(options)
            .then((res) => {
                resolve(res.data.access_token)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default identify
