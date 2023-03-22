import request from 'hihis-biz/es/Request';


/**
 * 获取参数配置
 */
// export function fetchUserInfo(params: any = null) {
//     return request({
//         serviceId: 'opdocnew.userRpc',
//         serverMethod: 'userInfo'
//         // 框架里特有的serviceId和method
//         // 上面的是对应的后台的bean ，下面的是方法 例子： http://10.10.0.23/api/opdocnew.userRpc/userInfo
//     }, params);
//
// }
export function labMedOrdInit(params: any = null) {
    return request({
        serviceId: 'opdocnew.labMedOrdRpc',
        serverMethod: 'labMedOrdInit'
    }, params);
}

