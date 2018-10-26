// 工具函数库
import config from './config'

// http get工具函数 获取数据
export function get(url, data) {
  return request(url, 'GET', data)
}

export function post(url, data) {
  return request(url, 'POST', data)
}

function request(url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          // showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

// 时间戳转日期
export function formatDate(time) {
  const date = new Date(time);
  let fmt = 'yyyy-MM-dd hh:mm:ss';
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
