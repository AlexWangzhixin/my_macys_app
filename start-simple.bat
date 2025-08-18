@echo off
echo ========================================
echo Macy's 应用开发服务器
echo ========================================
echo.
echo 你的局域网IP地址: 10.35.81.22
echo.
echo 启动后可以通过以下地址访问:
echo - 本地: http://localhost:5173
echo - 局域网: http://10.35.81.22:5173
echo.
echo 按任意键启动服务器...
pause > nul

echo.
echo 正在启动开发服务器...
echo 按 Ctrl+C 停止服务器
echo.

pnpm dev
