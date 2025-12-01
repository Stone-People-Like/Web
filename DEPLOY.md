# 部署指南 (Deployment Guide)

本项目是一个纯静态网站（HTML/CSS/JS），部署非常简单。你可以选择以下任意一种方式进行部署。

## 方式一：GitHub Pages（推荐，最简单）

由于你的代码已经上传到 GitHub，这是最快的方式。

1. 打开你的 GitHub 仓库页面：[https://github.com/Stone-People-Like/Web](https://github.com/Stone-People-Like/Web)
2. 点击顶部的 **Settings**（设置）选项卡。
3. 在左侧菜单栏中找到 **Pages**。
4. 在 **Build and deployment** 下的 **Source** 选项中，选择 **Deploy from a branch**。
5. 在 **Branch** 选项中，选择 **main** 分支，文件夹选择 **/(root)**。
6. 点击 **Save**（保存）。
7. 等待几分钟，刷新页面，顶部会出现一个链接（例如 `https://stone-people-like.github.io/Web/`），这就是你的网站地址。

## 方式二：Vercel / Netlify（速度快，自动化）

如果你希望网站在中国大陆访问速度更快，或者需要自动化部署（每次 push 自动更新），推荐使用 Vercel。

1. 注册/登录 [Vercel](https://vercel.com/)。
2. 点击 **Add New...** -> **Project**。
3. 选择 **Import** 你的 GitHub 仓库 (`Web`)。
4. 保持默认设置，直接点击 **Deploy**。
5. 部署完成后，Vercel 会分配一个免费的二级域名给你。

## 方式三：传统服务器 (Linux VPS + Nginx)

如果你有一台自己的云服务器（阿里云、腾讯云等），可以使用 Nginx 来托管。

1. **登录服务器**：
   ```bash
   ssh root@你的服务器IP
   ```

2. **安装 Nginx** (以 Ubuntu/Debian 为例)：
   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

3. **克隆代码**：
   ```bash
   cd /var/www/html
   # 删除默认文件（如果有）
   sudo rm -rf *
   # 克隆你的项目（注意：末尾的点表示克隆到当前目录）
   sudo git clone https://github.com/Stone-People-Like/Web.git .
   ```

4. **配置权限**：
   ```bash
   sudo chown -R www-data:www-data /var/www/html
   sudo chmod -R 755 /var/www/html
   ```

5. **访问网站**：
   打开浏览器访问 `http://你的服务器IP` 即可。

### 后续更新代码 (VPS)
每次在本地 `git push` 后，需要登录服务器执行：
```bash
cd /var/www/html
sudo git pull
```
