# ========================================================
# Pocket Quest - Localhost HTTP Web Server (PowerShell)
# ========================================================

param(
    [int]$Port = 3000,
    [string]$HostIP = "127.0.0.1"
)

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $rootDir) { $rootDir = (Get-Location).Path }

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  POCKET QUEST / PHÉP THUẬT - LOCALHOST WEB SERVER" -ForegroundColor Yellow
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  Hosting Root: $rootDir" -ForegroundColor Gray
Write-Host "  Local URL:    http://localhost:$Port" -ForegroundColor Green
Write-Host "  IP URL:       http://${HostIP}:$Port" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  Press Ctrl+C in this terminal to stop the server.`n" -ForegroundColor DarkGray

$mimeMap = @{
    ".html" = "text/html; charset=utf-8";
    ".htm"  = "text/html; charset=utf-8";
    ".css"  = "text/css; charset=utf-8";
    ".js"   = "application/javascript; charset=utf-8";
    ".json" = "application/json; charset=utf-8";
    ".svg"  = "image/svg+xml";
    ".png"  = "image/png";
    ".jpg"  = "image/jpeg";
    ".jpeg" = "image/jpeg";
    ".gif"  = "image/gif";
    ".ico"  = "image/x-icon";
    ".txt"  = "text/plain; charset=utf-8"
}

$listener = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Parse($HostIP)), $Port
try {
    $listener.Start()
} catch {
    Write-Host "Error starting server on port $($Port): $_" -ForegroundColor Red
    exit 1
}

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $stream.ReadTimeout = 5000
        $stream.WriteTimeout = 5000

        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII)
        $requestLine = $reader.ReadLine()

        if (-not $requestLine) {
            $client.Close()
            continue
        }

        # Parse request line: GET /path HTTP/1.1
        $parts = $requestLine.Split(" ")
        $method = $parts[0]
        $rawPath = if ($parts.Length -gt 1) { $parts[1] } else { "/" }
        
        # Remove query parameters if present
        if ($rawPath.Contains("?")) {
            $rawPath = $rawPath.Substring(0, $rawPath.IndexOf("?"))
        }

        # Decode path
        $decodedPath = [System.Uri]::UnescapeDataString($rawPath)
        if ($decodedPath -eq "/" -or [string]::IsNullOrWhiteSpace($decodedPath)) {
            $decodedPath = "/index.html"
        }

        # Convert to local filesystem path
        $relativePath = $decodedPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        $targetFile = [System.IO.Path]::Combine($rootDir, $relativePath)

        # Normalize path to prevent directory traversal
        $targetFile = [System.IO.Path]::GetFullPath($targetFile)

        if ($targetFile.StartsWith($rootDir, [System.StringComparison]::OrdinalIgnoreCase) -and [System.IO.File]::Exists($targetFile)) {
            $extension = [System.IO.Path]::GetExtension($targetFile).ToLower()
            $mimeType = if ($mimeMap.ContainsKey($extension)) { $mimeMap[$extension] } else { "application/octet-stream" }
            $fileBytes = [System.IO.File]::ReadAllBytes($targetFile)

            $header = "HTTP/1.1 200 OK`r`n" +
                      "Content-Type: $mimeType`r`n" +
                      "Content-Length: $($fileBytes.Length)`r`n" +
                      "Access-Control-Allow-Origin: *`r`n" +
                      "Cache-Control: no-cache`r`n" +
                      "Connection: close`r`n`r`n"
            
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($fileBytes, 0, $fileBytes.Length)
            $stream.Flush()
            Write-Host "[200 OK]  $rawPath ($($fileBytes.Length) bytes)" -ForegroundColor Green
        } else {
            $notFoundBody = "<html><body><h1>404 Not Found</h1><p>The requested file was not found.</p></body></html>"
            $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($notFoundBody)
            $header = "HTTP/1.1 404 Not Found`r`n" +
                      "Content-Type: text/html; charset=utf-8`r`n" +
                      "Content-Length: $($bodyBytes.Length)`r`n" +
                      "Connection: close`r`n`r`n"
            
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($bodyBytes, 0, $bodyBytes.Length)
            $stream.Flush()
            Write-Host "[404 NF]  $rawPath" -ForegroundColor DarkYellow
        }

        $client.Close()
    } catch {
        # Catch individual request errors so server continues running
    }
}
