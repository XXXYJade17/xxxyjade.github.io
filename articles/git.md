[TOC] 

# 🔹Git 核心概念



## 📌什么是 Git？

**Git** 是一款开源的分布式版本控制系统，由 **Linux** 之父 **Linus Torvalds** 于 2005 年为管理 **Linux** 内核开发而设计，旨在替代原用的 **BitKeeper** 版本控制系统。该系统通过高效管理项目版本历史，支持从微型到超大规模项目的协作开发，其名称源自英国俚语 "**global information tracker**"（全局信息跟踪器）。



## 📌Git 核心工作流程

核心操作围绕 “工作区 → 暂存区 → 本地仓库 → 远程仓库”

- 工作区：本地电脑中实际修改文件的目录（日常写代码/改文件的地方）。
- 暂存区：临时存放「待提交到本地仓库的修改」，相当于“提交缓冲区”。
- 本地仓库：存储在本地的版本数据库，保存所有提交的版本记录。
- 远程仓库：托管在服务器（如 GitHub/Gitee/GitLab）上的仓库，用于团队协作共享。



# 🔹Git 基础操作



## 📌地仓库初始化 & 代码推送

```shell
# 初始化本地仓库（在当前目录创建.git隐藏文件夹）
git init 

# 将指定文件/所有修改添加到暂存区
git add [文件名]  # 添加单个文件，例：git add README.md
git add .        # 添加当前目录下所有修改的文件

# 将暂存区的内容提交到本地仓库
git commit -m "备注信息"  # 例：git commit -m "初始化项目，添加README"

# 将本地仓库的提交推送到远程仓库（首次推送需关联远程）
git push  # 首次推送：git push -u 远程别名 分支名（如git push -u origin main）
```



## 📌 状态查看

```shell
# 查看工作区/暂存区的文件状态（最常用的调试命令）
git status  # 会提示“未跟踪文件/已修改未暂存/已暂存未提交”等信息
```



# 🔹Git 配置



## 📌 全局用户配置

```shell
# 设置全局用户名（关联Git提交记录，建议和远程仓库用户名一致）
git config --global user.name "你的用户名"

# 设置全局邮箱（建议和远程仓库绑定的邮箱一致）
git config --global user.email "你的邮箱地址"

# 查看全局配置是否生效
git config --global --list
```



## 📌 远程仓库配置

```shell
# 添加远程仓库（给远程地址起“别名”，常用别名：origin）
git remote add 别名 远程仓库地址  # 例：git remote add origin https://gitee.com/xxx/xxx.git

# 删除指定别名的远程仓库关联
git remote rm 别名  # 例：git remote rm origin

# 查看已关联的远程仓库（-v：显示详细的fetch/push地址）
git remote -v
```



# 🔹 Git 分支管理
```shell
# 查看所有本地分支（当前分支前会标*）
git branch  

# 创建新分支（基于当前分支创建，不会切换分支）
git branch 分支名  # 例：git branch dev

# 切换到指定分支
git switch 分支名  # 例：git switch dev（替代旧命令git checkout 分支名）

# 删除本地分支（需先切换到其他分支，-d：仅删除已合并的分支）
git branch -d 分支名  # 例：git branch -d dev
git branch -D 分支名  # 强制删除未合并的分支（慎用）

# 将指定分支合并到当前分支（例：把dev分支合并到main分支）
# 步骤：先切换到main分支 → 执行git merge dev
git merge 分支名  
```



# 🔹 Git 版本回退（救急常用）

```shell
# 查看所有提交记录（含提交编号、作者、时间、备注）
git log  # 完整日志（按q退出）
git log --oneline  # 精简日志（仅显示提交编号前7位+备注，更易读）

# 版本回退（--hard：工作区/暂存区/本地仓库全部回退到指定版本）
git reset --hard 提交编号  # 例：git reset --hard 8a7b6c9
```



## 📌 版本回退注意事项

- 提交编号可从`git log --oneline`中获取（只需前7位即可）；
- `--hard`会清空未提交的修改，若需保留修改，可改用`--soft`（仅回退本地仓库，暂存区/工作区保留）；
- 已推送到远程的版本，回退后需强制推送：`git push -f`（团队协作慎用，避免覆盖他人提交）。