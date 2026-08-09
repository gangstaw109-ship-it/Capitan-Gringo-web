@echo off
setlocal
title Capitan Gringo - Servidor local
cd /d "%~dp0"

echo.
echo ================================================
echo   CAPITAN GRINGO - INICIAR PAGINA WEB
echo ================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo No se encontro Node.js en este equipo.
  echo Instale la version LTS desde https://nodejs.org/
  echo y vuelva a hacer doble clic en este archivo.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\vinext" (
  echo Preparando las dependencias por primera vez...
  call npm.cmd ci --ignore-scripts --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo No fue posible instalar las dependencias.
    echo Compruebe su conexion a Internet e intentelo de nuevo.
    pause
    exit /b 1
  )
)

echo La pagina estara disponible en:
echo.
echo   http://localhost:5173
echo.
echo Esta ventana debe permanecer abierta mientras revise la web.
echo Para detenerla, use DETENER_WEB.bat o cierre esta ventana.
echo.

start "" powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$url='http://localhost:5173'; for($i=0;$i -lt 30;$i++){try{$r=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2; if($r.StatusCode -eq 200){$candidates=@("$env:ProgramFiles\Google\Chrome\Application\chrome.exe","${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe","$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"); $chrome=$candidates | Where-Object {Test-Path $_} | Select-Object -First 1; if($chrome){Start-Process $chrome -ArgumentList $url}else{Start-Process $url}; break}}catch{}; Start-Sleep -Seconds 1}"
call npm.cmd run dev

echo.
echo El servidor se ha detenido.
pause
