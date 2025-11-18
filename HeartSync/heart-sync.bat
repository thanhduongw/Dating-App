@echo off
setlocal enabledelayedexpansion
cd /d %~dp0
title Heart Sync - Expo App Launcher

echo ==========================================
echo        HEART SYNC - EXPO APP LAUNCHER
echo ==========================================
echo.

:: -----------------------------------------------------
:: 1. KIỂM TRA MÔI TRƯỜNG
:: -----------------------------------------------------
echo [1/5] Kiem tra moi truong...

:: Kiểm tra Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Loi: Node.js chua duoc cai dat!
    echo Vui long cai dat Node.js tai: https://nodejs.org
    echo.
    pause
    exit /b
) else (
    echo Node.js da duoc cai dat
)

:: Kiểm tra package.json
if not exist "package.json" (
    echo Loi: Khong tim thay file package.json
    echo Hay dam bao file batch nam trong thu muc HeartSync!
    echo.
    pause
    exit /b
) else (
    echo Thu muc HeartSync hop le
)

:: Đọc tên app từ package.json
for /f "tokens=2 delims=:," %%i in ('type package.json ^| findstr "name"') do (
    set "appname=%%i"
    set "appname=!appname:"=!"
    set "appname=!appname: =!"
)

if defined appname (
    echo App: !appname!
)

echo.

:: -----------------------------------------------------
:: 2. KIỂM TRA / CÀI ĐẶT DEPENDENCIES
:: -----------------------------------------------------
echo [2/5] Kiem tra thu vien...

if not exist "node_modules" (
    echo - Thu muc node_modules chua ton tai
    echo [3/5] Dang cai dat dependencies bang npm ci...
    call npm ci

    if !errorlevel! neq 0 (
        echo Loi: npm ci that bai, thu lai bang npm install...
        call npm install
    )
) else (
    echo Thu muc node_modules da ton tai
    echo [3/5] Dang kiem tra cap nhat dependencies...
    call npm install
)

if %errorlevel% neq 0 (
    echo Loi: Khong the cai dat dependencies!
    echo.
    pause
    exit /b
)

echo Cai dat thanh cong!
echo.

:: -----------------------------------------------------
:: 3. THÔNG BÁO & HƯỚNG DẪN
:: -----------------------------------------------------
echo [4/5] Chuan bi khoi dong...
echo.
echo ==========================================
echo          HEART SYNC EXPO APP
echo ==========================================
echo.
echo   CAC BUOC SU DUNG:
echo 1. Server Expo se khoi dong
echo 2. Cai dat 'Expo Go' tren dien thoai
echo 3. Quet QR code tren man hinh
echo 4. App se tu dong chay tren thiet bi
echo.
echo  CO THE TRUY CAP:
echo - http://localhost:8081   (Metro Bundler)
echo - http://localhost:19000  (Expo Dev Tools)
echo.
echo   LUU Y:
echo - Nhan Ctrl + C de tat server
echo - Dam bao may tinh va dien thoai chung WiFi
echo.
echo ==========================================
echo.

echo Bat dau trong 5 giay...
for /l %%i in (5,-1,1) do (
    echo %%i...
    timeout /t 1 /nobreak >nul
)

:: -----------------------------------------------------
:: 4. CHẠY EXPO DEV SERVER
:: -----------------------------------------------------
echo [5/5] Khoi dong Expo Development Server...
echo.
call npx expo start

:: -----------------------------------------------------
:: 5. KẾT THÚC
:: -----------------------------------------------------
echo.
echo ==========================================
echo        EXPO SERVER DA TAT
echo ==========================================
echo.
echo Cam on ban da su dung Heart Sync!
echo De chay lai, mo file batch mot lan nua.
echo.
pause
