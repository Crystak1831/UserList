import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

// 使用github aoi开发应用
// https://api.github.com/users?since={page} 使用这个接口渲染展示user name和头像
// 实现无限滚动
// 搜索
// https://api.github.com/users/<login> 点击展示user使用的仓库
// 展示该用户的关注者列表
// 响应式
// 好看一点

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
