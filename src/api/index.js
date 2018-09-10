// 将所有的接口请求都通过这个统一输出
import login from './login'
import agent from './agent'
import images from './images'
import order from './order'
import business from './business'
import member from './member'
import finance from './finance'
import mina from './mina'

// 登录
export const Login = login

// 代理商
export const Agent = agent

// 上传图片
export const Images = images

// 订单管理
export const Order = order

// 企业管理
export const Business = business

// 成员管理
export const Member = member
// 成员管理
export const Finance = finance

// 发布管理
export const Mina = mina
