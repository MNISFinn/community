export default {
  // baseUrl : "https://api.fridaysoon.asia/",
  baseUrl : "http://api.fridaysoon.asia:8090/",
  requestExclude: [ // 不需要token请求
    // '/user_login'
    '/auth/login'
  ] 
}