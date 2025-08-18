# Macy's 应用开发服务器启动脚本
Write-Host "正在启动 Macy's 应用开发服务器..." -ForegroundColor Green
Write-Host ""

# 获取网络配置
Write-Host "网络配置信息:" -ForegroundColor Yellow
Write-Host "- 本地访问: http://localhost:5173" -ForegroundColor Cyan
Write-Host "- 本地访问: http://127.0.0.1:5173" -ForegroundColor Cyan

# 获取局域网IP
$localIPs = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" }
foreach ($ip in $localIPs) {
    Write-Host "- 局域网访问: http://$($ip.IPAddress):5173" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Red
Write-Host ""

# 启动开发服务器
pnpm dev
