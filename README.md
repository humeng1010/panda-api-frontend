# 胖达API-开放pai接口平台-前端

## 介绍

这是一个开放api接口平台**前端**的项目，基于ant-design-pro框架快速开发

本项目的初始化参考文档：https://pro.ant.design/zh-CN/docs/getting-started/

前端技术框架：`React` `antd` `ant-design pro` `UmiJS`

后端仓库地址：[开放api平台](https://github.com/humeng1010/open-api-platform)

官网地址：xxx

## 起步

1. 克隆项目到本地

   ```sh
   git clone https://github.com/humeng1010/panda-api-frontend.git
   ```

2. 使用WebStorm或者vscode打开项目，在终端中执行如下命令安装 `node_modules`

   ```
   npm install
   ```

   或者

   ```
   yarn
   ```

   > 需要有对应的环境!

3. 启动项目

   ```
   npm start
   ```

4. 构建项目

   ```
   npm run build
   ```



## 界面

登录注册页面：

<img src="https://cdn.jsdelivr.net/gh/humeng1010/cloud-images/blog-images/202310101520483.png" alt="image-20231010152043026" style="zoom: 33%;" />

接口列表展示：

<img src="https://cdn.jsdelivr.net/gh/humeng1010/cloud-images/blog-images/202310101522398.png" alt="image-20231010152253211" style="zoom:33%;" />

接口详情展示：

<img src="https://cdn.jsdelivr.net/gh/humeng1010/cloud-images/blog-images/202310101523795.png" alt="image-20231010152334641" style="zoom:33%;" />

个人密钥管理：

<img src="https://cdn.jsdelivr.net/gh/humeng1010/cloud-images/blog-images/202310101524468.png" alt="image-20231010152416331" style="zoom:33%;" />

接口管理：

<img src="https://cdn.jsdelivr.net/gh/humeng1010/cloud-images/blog-images/202310101524163.png" alt="image-20231010152433100" style="zoom:33%;" />

接口分析：

<img src="https://cdn.jsdelivr.net/gh/humeng1010/cloud-images/blog-images/202310101524663.png" alt="image-20231010152446588" style="zoom:33%;" />



## 进度

- [ ] 用户管理
  - [x] 用户登录注册
  - [ ] 个人信息修改
  - [ ] 开通VIP不限次数调用接口
- [ ] 主页
  - [x] 接口列表展示
  - [ ] 查看接口详情
    - [x] 在线调用接口
    - [ ] 显示剩余调用次数
    - [ ] 显示已经调用多少次
    - [ ] 购买调用次数
- [x] 个人密钥
  - [x] 查看个人密钥
  - [x] 更换个人密钥
- [ ] 上传接口
  - [ ] 用户上传接口
- [ ] sdk使用说明
  - [ ] 引入sdk
  - [ ] 使用说明
- [x] 接口管理页面
  - [x] 修改接口
  - [x] 删除接口
  - [x] 发布接口
  - [x] 关闭接口
- [x] 接口调用分析
  - [x] 调用次数最多的前五个接口统计图
