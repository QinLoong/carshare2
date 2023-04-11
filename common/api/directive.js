import request from "../utils/request.js";

// 所有指令
export function findDirectiveList(data) {
  return request({
    url: "/directive/findDirectiveList",
    method: "post",
    data,
  });
}

// 发送指令
export function sendDirective(data) {
  return request({
    url: "/directive/sendDirective",
    method: "post",
    data,
  });
}
