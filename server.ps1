# Simple HTTP Server in PowerShell
param (
    [int]$Port = 8080,
    [string]$Root = "."
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Host "Server started at http://localhost:$Port/"
Write-Host "Serving files from $Root"
Write-Host "Press Ctrl+C to stop the server"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") {
            $localPath = "/index.html"
        }
        
        $filePath = Join-Path $Root $localPath.TrimStart("/")
        
        if (Test-Path $filePath -PathType Leaf) {
            # Set content type based on file extension
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($extension) {
                ".html" { $contentType = "text/html" }
                ".css" { $contentType = "text/css" }
                ".js" { $contentType = "application/javascript" }
                ".png" { $contentType = "image/png" }
                ".jpg" { $contentType = "image/jpeg" }
                ".gif" { $contentType = "image/gif" }
                default { $contentType = "application/octet-stream" }
            }
            
            # Read file content based on type
            if (".html", ".css", ".js" -contains $extension) {
                # Text files
                $content = Get-Content $filePath -Raw
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
            } else {
                # Binary files (images, etc.)
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $content = "<html><body><h1>404 Not Found</h1></body></html>"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
            $response.ContentType = "text/html"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
