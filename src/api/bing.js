import request from '@/utils/request'

const bingApi = {
  Bing: '/bing/Bing-Wallpaper-Action/main/README.md'
}

// Bing 壁纸 Markdown 数据接口
export function bing () {
  return request({
    url: bingApi.Bing,
    method: 'get',
    headers: {
      Cookie: '',
      'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
    }
  })
}
