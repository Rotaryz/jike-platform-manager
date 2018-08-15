// 将所有的接口请求都通过这个统一输出
import login from './login'
import agent from './agent'
import images from './images'

// 登录
export const Login = login
// 代理商
export const Agent = agent
// 代理商
export const Images = images