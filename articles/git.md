**GIT**：一款免费、开源的分布式**版本控制工具**

核心操作围绕 “工作区 → 暂存区 → 本地仓库 → 远程仓库”

- 工作区：进行文件修改的地方。
- 暂存区：临时存放 “待提交的修改”。
- 本地仓库：存储在本地的版本数据库。
- 远程仓库：托管在服务器上的仓库。

***

简单使用：

```shell
# 上传自己的仓库
git init # 初始化本地仓库
git add [文件/.] # 提交缓存区
git commit -m "备注" # 提交本地仓库
git push # 推送远程仓库
# 查看当前状态
git status
```

***

本地配置：

```shell
# 全局配置
git config --global user.name "用户名" # 设置用户名
git config --global user.email "邮箱地址" # 设置邮箱
# 远程仓库配置
git remote add 别名 远程仓库地址 # 添加远程仓库
git remote rm 别名 # 删除远程仓库
git remote -v # 查看远程仓库
```

***

分支管理：

```shell
git branch # 查看分支
git branch 分支名 # 创建分支
git switch 分支名 # 切换分支
git branch -d 分支名 # 删除分支
git merge 分支名 # 合并分支
```

***

版本回退：

```shell
git log # 查看版本
git reset --hard 提交编号 # 版本回退
```