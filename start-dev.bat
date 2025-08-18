@echo off
echo 正在启动 Macy's 应用开发服务器...
echo.
echo 服务器将可以从以下地址访问：
echo - 本地: http://localhost:5173
echo - 局域网: http://%COMPUTERNAME%:5173
echo - 任意IP: http://你的IP地址:5173
echo.
echo 按 Ctrl+C 停止服务器
echo.

pnpm dev
