import request from "../utils/request.js";

// 所有物理设备
export function findDeviceList() {
  return request({
    url: "/device/findDeviceList",
    method: "post",
  });
}

// 电车列表
export function findBikeList(data) {
  return request({
    url: "/device/findBikeList",
    method: "post",
    data,
  });
}

// 电车详情
export function findBikeDetail(params) {
  return request({
    url: "/device/findBikeDetail",
    method: "get",
    params,
  });
}

// 开车
export function openBike(data) {
  return request({
    url: "/device/openBike",
    method: "post",
    data,
  });
}

// 锁车
export function downDevice(data) {
  return request({
    url: "/device/downDevice",
    method: "post",
    data,
  });
}

// 还车
export function exitDevice(data) {
  return request({
    url: "/device/exitDevice",
    method: "post",
    data,
  });
}

// 解绑
export function unbindDevice(data) {
  return request({
    url: "/device/unbindDevice",
    method: "post",
    data,
  });
}

// 添加子设备
export function addSubDevice(data) {
  return request({
    url: "/device/addSubDevice",
    method: "post",
    data,
  });
}

// 添加设备
export function addDevice(data) {
  return request({
    url: "/device/addDevice",
    method: "post",
    data,
  });
}

// 添加电车
export function addBike(data) {
  return request({
    url: "/device/addBike",
    method: "post",
    data,
  });
}

// 删除电车
export function delBike(data) {
  return request({
    url: "/device/delBike",
    method: "post",
    data,
  });
}

// 判断当前用户是否能够开这辆车
export function getUserTrue(data) {
  return request({
    url: "/device/getUserTrue",
    method: "post",
    data,
  });
}
