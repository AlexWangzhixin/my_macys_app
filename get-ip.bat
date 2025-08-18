@echo off
echo 正在获取网络配置信息...
echo.

echo 本地回环地址:
echo - http://localhost:5173
echo - http://127.0.0.1:5173
echo.

echo 局域网IP地址:
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4"') do (
    echo - http://%%i:5173
)
echo.

echo 公网IP地址 (如果可用):
curl -s ifconfig.me
echo :5173
echo.

pause
