---
title: "Git仓库"
date: "2026-02-09"
author: "XXXYJade"
category: "技术"
---

## 本地仓库
  - ### 工作流程
    Git 本地操作的三个区域：工作区、暂存区、Git 仓库。
      1. 在工作区修改文件。
      2. 使用git add命令将修改的文件添加到暂存区。
      3. 使用git commit -m"提交描述"命令将暂存区的文件提交到 Git 仓库。
      4. 可使用git status命令查看当前状态。
  - ### 本地仓库操作
    仓库又名版本库，英文名 repository，可简单理解为一个目录，用于存放代码，目录里的所有文件都可被 Git 管理，每个文件的修改、删除等操作 Git   都能跟踪到。
    - **首次使用配置**
       在安装好 Git 后首次使用需要先进行全局配置
       1. 桌面空白处右键，点击 “Git Bash Here” 打开 Git 命令行窗口。
       2. 执行  ```$ git config --global user.name "用户名"```  设置用户名。
       3. 执行  ```$ git config --global user.email "邮箱地址"```  设置邮箱地址。
    - **创建仓库**
      当需要让 Git 管理某个新项目或已存在项目时，需创建仓库
      1. 创建空目录：```$ mkdir pro_git```
      2. 在命令行中进入项目目录：```$ cd pro_git```
      3. 初始化 Git 仓库：```$ git init```，执行后会在项目目录下创建 “.git” 隐藏目录，此目录由 Git 创建，不能删除或随意更改内容。
    - **Git 常用指令操作**
      1. 查看当前状态：```git status```（非必要）。
      2. 添加到缓存区：
          - ```git add 文件名```：添加一个文件。
          - ```git add 文件名1 文件名2 文件名3 …```：添加多个文件。
          - ```git add .```：添加当前目录到缓存区。
      3. 提交至版本库：```git commit -m “注释内容”```
  - ### 版本回退
    1. **版本回退分两步操作**
       - 查看版本，确定需要回到的时刻点
       ```git log```
       ```git log --pretty=oneline```
       - 回退操作
       ```git reset --hard 提交编号```
    2. **案例**：想回到创建好第一个文件 readme.txt 的时候，先通过```git log --pretty=oneline```查看提交编号，然后执行```git reset --hard 45a0b46714ad01526318234caefa5d9cf96d0542```回退
    注意：回到过去后，若想回到之前最新版本，需使用```git reflog```查看历史操作得到最新的 commit id，再执行回退指令。
    3. **小结**：
       - 回到过去需先得到 commit id，再通过git reset –hard回退。
       - 回到未来需用```git reflog```查看历史操作得到最新 commit id。
       - 写回退指令时 commit id 不用写全，Git 自动识别，但至少写前 4 位字符。
***
## 远程仓库
  - ### 两种常规使用方式
    **基于 http/https 协议**
    1. 创建空目录 shop：```$ mkdir shop```，并进入该目录：```$ cd ./shop```
    2. 使用 clone 指令克隆线上仓库到本地：```$ git clone 线上仓库地址```
    3. 在仓库上做操作（提交暂存区、提交本地仓库、提交线上仓库、拉取线上仓库）：
        提交到线上仓库：```git push``` [首次提交可能出现 403 错误，需修改 “.git/config” 文件，将url= https://github.com/用户名/仓库名.git修改为url= https://用户名:密码@ github.com/用户名/仓库名.git]
        拉取线上仓库：```git pull```

    **基于 ssh 协议（推荐）**
    1. 该方式与 https 方式相比，仅影响 github 对用户的身份鉴权方式，git 具体操作无影响
    2. 生成公私玥对指令（需先安装 OpenSSH）：ssh-keygen -t rsa -C "注册邮箱"
    3. 步骤
        - 生成客户端公私玥文件
        - 将公钥上传到 Github
            1. 打开提示页面
            2. 创建公私玥对文件
            3. 上传公钥文件内容（id_rsa.pub），填写标题后保存
        - 执行后续 git 操作，如git clone克隆仓库，修改文件后添加缓存区、提交本地仓库、提交线上仓库，push 时无需输入账号密码，因公私玥已实现身份鉴权
***
## 分支管理
分支是版本回退章节中，每次提交后形成的时间线，Git 把它们串成时间轴，这个时间轴就是一个分支，如 master 分支。开发时团队协作，多人开发光有一个分支无法满足需求，且在分支上工作不影响其他分支，更安全，Git 鼓励开发者用分支完成开发任务。
分支相关指令：
查看分支：git branch，当前分支前有 “*” 标记。
创建分支：git branch 分支名。
切换分支：git checkout 分支名。
删除分支：git branch -d 分支名，删除时需先退出要删除的分支。
合并分支：git merge 被合并的分支名。
合并分支案例：在 dev 分支下修改 readme 文件并提交，切换到 master 分支查看，然后合并 dev 分支到 master 分支，最后删除 dev 分支，合并后需将 master 分支提交到线上远程仓库。
***
## 常见冲突
  - 产生：同事在下班之后修改了线上仓库的代码，我进行修改前没有进行``` git pull ```操作，``` git push ```时本地内容与仓库内容不同，系统提示冲突：
    ```
    error: failed to push some refs...
    hint: Updates were rejected because the remote contains work that you do not have locally.
    ```
  - 解决：执行git pull合并远程内容，将远程仓库的更新拉取到本地，并尝试自动合并冲突。打开冲突文件（如readme.txt），会看到冲突标记：
    ```
    <<<<<<< HEAD
    这些文字是我次日上班时候写的。
    =======
    这是我同事小A在我下班之后做的修改。
    >>>>>>> 远程分支哈希值
    ```
    与同事协商保留哪些内容，删除冲突标记（<<<<<<<, =======, >>>>>>>），保留最终确认的代码