### 第一步：安装node
###### 安装node，node的版本要7.0以上，建议使用最新版。项目开发时，使用的版本是8.4.0

### 第二步：安装cnpm
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 第三步：安装依赖包
###### 在项目的根目录下运行以下代码
```
cnpm install
```

### 第四步：全局安装pm2

```
cnpm install pm2 -g
```

### 第五步：项目启动，项目停止
###### 在项目的根目录下运行以下代码

```
npm run dev // 在项目启动前可以先运行该命令，看项目是否报错
npm start // 项目启动
npm stop // 项目停止
```

---
### 版本记录
- 1.0.0
    - javascript window.onerror 接口
    - 写入log日志文件

---
### 杂项
###### log文件所在目录
```
./myLog/dndc/dndc.log  // 前端采集上来的错误信息
./myLog/key/key.log    // 本项目的打点信息

```

###### 项目github地址
```
git@github.com:BoalNg/error.git
```

###### 日志格式
```
// ./myLog/dndc/dndc.log

2017-09-07 15:11:47,277 INFO 20036 This is a ERROR Message { 
  msg: 'Uncaught ReferenceError: guotouqian is not defined',
  file: 'http://127.0.0.1:8081/bundle.js',
  row: 71,
  col: 0,
  time: 1504768307,
  ip: '127.0.0.1',
  cookie: 'csrfToken=uZZEfMrpH3Pob7-lFVF3oYC1',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
  host: '127.0.0.1:7001',
  variable: 'guotouqian' }
```

###### monogDB下载地址

链接：http://pan.baidu.com/s/1bpuAorH 密码：usnr

