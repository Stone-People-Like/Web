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

# 文件权限

确保服务器上的文件权限正确，Web 服务器用户（通常是 `nginx` 或 `apache` 或 `www-data`）有权读取文件。

```bash
# 在网站根目录下执行
chmod -R 755 .
```
