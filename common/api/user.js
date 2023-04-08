import request from "../utils/request.js";

// 登录
export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

// 登录
export function findUserById(params) {
  return request({
    url: "/user/findUserById",
    method: "get",
    params,
  });
}

// 注册
export function register(data) {
  return request({
    url: "/user/addUser",
    method: "post",
    data,
  });
}

// 修改密码
export function editUser(data) {
  return request({
    url: "/user/editUser",
    method: "post",
    data,
  });
}

// 用户列表
export function findUserList(data) {
  return request({
    url: "/user/findUserList",
    method: "post",
    data,
  });
}

// 删除用户
export function deleteUser(params) {
  return request({
    url: "/user/deleteUser",
    method: "get",
    params,
  });
}
