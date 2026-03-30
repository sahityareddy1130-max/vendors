# Kill process using port 4000 on Windows
# Usage: Right-click this file > Run with PowerShell (or run in terminal)

$port = 4000
$process = netstat -ano | Select-String ":$port"
if ($process) {
    $pid = ($process -split '\s+')[-1]
    Write-Host "Killing process on port $port with PID $pid..."
    Stop-Process -Id $pid -Force
    Write-Host "Process killed."
} else {
    Write-Host "No process found using port $port."
}