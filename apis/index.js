import http from './http.js'

/**************************************用户模块************************************************/
// 用户登陆
export const postLogin = (data) => http.POST('/user/login', data)
// 用户注册
export const postRegister = (data) => http.POST('/user/register', data)
// 获取短信验证码
export const getMsgCode = (data) => http.GET('/user/register/sendMsg', data)
// 获取图片验证码
// export const getCaptcha = (data) => http.GET('/user/login/captcha.png', data)
// 找回密码
export const resizePass = (data) => http.POST('/user/modifyPass', data)
/**************************************直播室模块**********************************************/
// 创建直播室
export const createLive = (data) => http.POST('/live/create', data)
// 获取直播室信息
export const acqLiveInfo = (data) => http.GET('/live/liveInfo', data)