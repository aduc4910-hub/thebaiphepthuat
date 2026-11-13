@echo off
title Pocket Quest - Localhost Server
echo ========================================================
echo   POCKET QUEST / PHE PTHUAT - LOCALHOST SERVER
echo ========================================================
echo.
echo Dang khoi dong localhost tren cong 3000...
echo Trinh duyet se tu dong mo http://localhost:3000
echo Nhan Ctrl+C de dung server bat cu luc nao.
echo.

start "" "http://localhost:3000"
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 3000

pause

