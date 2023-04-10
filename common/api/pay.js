import request from "../utils/request.js";

// 新增支付
export function addPay(data) {
  return request({
    url: "/pay/addPay",
    method: "post",
    data,
  });
}

// 充值
export function investMoney(data) {
  return request({
    url: "/pay/investMoney",
    method: "post",
    data,
  });
}

// 支付列表
export function findPayList(data) {
  return request({
    url: "/pay/findPayList",
    method: "post",
    data,
  });
}

// 充值列表
export function investMoneyList(data) {
  return request({
    url: "/pay/investMoneyList",
    method: "post",
    data,
  });
}

// 当前总消费
export function getTotalPay(params) {
  return request({
    url: "/pay/getTotalPay",
    method: "get",
    params,
  });
}

// 当前总充值
export function getTotalInvest(params) {
  return request({
    url: "/pay/getTotalInvest",
    method: "get",
    params,
  });
}
