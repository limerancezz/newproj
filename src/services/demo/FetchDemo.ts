import {DEV_PRE_URL} from '../../../config/config.dev';

export const getIconList = () => {
  return doGet('/getIconList');
};

export const getTableData = () => {
  return request('/getTableData');
};

const doGet = (url: RequestInfo | URL) => {
  url = DEV_PRE_URL + url;
  return fetch(url).then((response) => {
    return response.json();
  });
};

const request = (url = '', data = {}, type = 'POST') => {
  // 根据业务需求，拼接路径
  url = DEV_PRE_URL + url;
  // 因为无法控制输入的字母是否为大写，统一处理，转换为大写，toUpperCase()是js的方法，把字母都转化为大写
  // 测试冲突
  type = type.toUpperCase();

  if (type == 'GET') {
    // 数据拼接字符串
    let dataStr = '';
    // Object.keys(data)返回了data的所有的key，然后循环所有的key，取值并拼接字符串，get请求的参数放在路径上
    // 比如传入的data是{name:'张航',sexy:1}，通过拼接后的形式为:name=张航&sexy=1

    // 这里的写法可以是另外一种：

    // 方式一：var keys = Object.keys(data);
    // keys.forEach(key => {
    //   dataStr += key + '=' + data[key] + '&';
    // })

    // 方式二：var keys = Object.keys(data);
    // for (let key of keys) {
    //   dataStr += key + '=' + data[key] + '&';
    // }

    // 其他的循环方式可以自己思考
    // data[key]的报错可以忽略，这是eslint的检查，说这里的代码不够健壮，添加个忽略错误的标记，先不深究
    Object.keys(data).forEach(key => {
      // @ts-ignore
      dataStr += key + '=' + data[key] + '&';
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }
  // 下面requestConfig的参数不了解也可，不用纠结，很少会需要你封装请求的方法，99%以上的公司都已经昨晚了
  let requestConfig = {
    credentials: 'same-origin',
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
    mode: "cors",
    // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
    cache: "force-cache"
  }

  // 如果是post请求，就把参数放到body体里（post请求的body放请求参数）
  if (type == 'POST') {
    Object.defineProperty(requestConfig, 'body', {
      value: JSON.stringify(data)
    })
  }

  // @ts-ignore 忽略requestConfig的类型判断
  return fetch(url, requestConfig).then((response) => {
    return response.json();
  });
};

// 无注释代码预览
// const request = (url = '', data = {}, type = 'GET') => {
//   // 根据业务需求，拼接路径
//   url = DEV_PRE_URL + url;
//   type = type.toUpperCase();
//   let requestConfig = {
//     credentials: 'same-origin',
//     method: type,
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     mode: "cors",
//     cache: "force-cache"
//   }
//
//   if (type == 'GET') {
//     let dataStr = '';
//     Object.keys(data).forEach(key => {
//       // @ts-ignore
//       dataStr += key + '=' + data[key] + '&';
//     })
//     if (dataStr !== '') {
//       dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
//       url = url + '?' + dataStr;
//     }
//   }
//
//   if (type == 'POST') {
//     Object.defineProperty(requestConfig, 'body', {
//       value: JSON.stringify(data)
//     })
//   }
//
//   // @ts-ignore
//   return fetch(url, requestConfig).then((response) => {
//     return response.json();
//   });
// };