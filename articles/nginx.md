**Nginx**：高性能、轻量级的 HTTP 和反向代理服务器

***

反向代理（配置示例）：

```conf
# nginx.conf
server {
    listen 80;              # Nginx 监听的端口
    server_name localhost;  # 服务器域名/IP地址

	// 路径匹配规则
    location /api/ {
        proxy_pass http://localhost:8080/admin/;  # 转发目标地址
    }
}
```

***

负载均衡（配置示例）：

```conf
# nginx.conf
# 定义后端服务器组
upstream webservers 
    # 后端服务器列表（IP:端口），默认轮询策略，自动跳过无响应的服务器
    server 192.168.100.128:8080;  # 服务器1
    server 192.168.100.129:8080 weight=2;  # 服务器2，配置权重，处理2倍请求
}
```