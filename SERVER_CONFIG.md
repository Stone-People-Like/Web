# Nginx 配置建议

如果在 CentOS 7 上使用 Nginx 部署，请确保 Nginx 能够正确处理 `.md` 文件类型。

在 `nginx.conf` 或站点配置文件中，添加或检查 `mime.types`：

```nginx
http {
    include       mime.types;
    default_type  application/octet-stream;

    # 确保有 markdown 的 MIME 类型
    types {
        text/plain md;
        text/markdown markdown;
    }
}
```

# Apache 配置建议

如果使用 Apache，可以在 `.htaccess` 文件中添加：

```apache
AddType text/plain .md
```

# 故障排查 (CentOS 7)

如果您遇到 `404 Not Found` 或 `403 Forbidden` 错误，请按以下步骤检查。

## 1. 检查文件是否存在

登录到服务器，进入网站根目录，检查文件是否真的存在：

```bash
cd /path/to/your/web/root
ls -l easytoteach/
```

确保您看到了 `python-programming-basic.md` 等英文文件名的文件。如果看到的是中文乱码文件名，说明代码没同步好，请重新执行 `git pull`。

## 2. 检查文件权限 (Permissions)

Nginx/Apache 通常以 `nginx` 或 `apache` 用户运行。如果文件只允许 `root` 访问，Web 服务器就无法读取。

执行以下命令修复权限（假设您在网站根目录下）：

```bash
# 将目录权限设为 755 (所有者读写执行，其他人读执行)
find . -type d -exec chmod 755 {} \;

# 将文件权限设为 644 (所有者读写，其他人只读)
find . -type f -exec chmod 644 {} \;
```

## 3. 检查 SELinux 安全上下文

CentOS 7 默认开启 SELinux。如果文件的安全上下文不对，Nginx 即使有权限也无法读取（通常报 403，但也可能报 404）。

执行以下命令修复 SELinux 上下文：

```bash
# 递归恢复网站目录的安全上下文
# 请将 /path/to/your/web/root 替换为实际路径，例如 /usr/share/nginx/html 或 /var/www/html
restorecon -Rv /path/to/your/web/root
```

或者，您可以临时将 SELinux 设为宽容模式来测试是否是它的问题：

```bash
setenforce 0
```

如果 `setenforce 0` 后能访问，说明确实是 SELinux 问题，请务必执行上面的 `restorecon` 命令修复，然后用 `setenforce 1` 改回强制模式。

## 4. 检查 Nginx 配置

确保没有配置规则禁止了 `.md` 文件的访问。

```nginx
# 错误示例：禁止访问隐藏文件或特定扩展名
location ~ \.md$ {
    deny all; # 确保没有这一行
}
```

## 5. 测试访问

尝试访问我们新添加的测试文件：
`http://您的域名/easytoteach/test.txt`

*   如果 `test.txt` 能访问，但 `.md` 不能 -> 说明是 Nginx 配置问题（MIME 类型或后缀限制）。
*   如果 `test.txt` 也 404 -> 说明是 目录权限、路径错误 或 SELinux 问题。

