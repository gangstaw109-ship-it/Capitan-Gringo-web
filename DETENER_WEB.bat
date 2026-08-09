@echo off
setlocal
title Capitan Gringo - Detener servidor
cd /d "%~dp0"

echo Buscando el servidor local de la web...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$ids=Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; if($ids){foreach($id in $ids){Stop-Process -Id $id -Force -ErrorAction SilentlyContinue}; Write-Host 'Servidor detenido correctamente.'}else{Write-Host 'No habia ningun servidor activo en el puerto 5173.'}"
echo.
pause

