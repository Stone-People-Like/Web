param(
  [int]$Port = 8000,
  [string]$Root = (Get-Location)
)

function Get-ContentType($path) {
  $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
  switch ($ext) {
    ".html" { return "text/html; charset=utf-8" }
    ".htm" { return "text/html; charset=utf-8" }
    ".css" { return "text/css" }
    ".js" { return "application/javascript" }
    ".json" { return "application/json" }
    ".png" { return "image/png" }
    ".jpg" { return "image/jpeg" }
    ".jpeg" { return "image/jpeg" }
    ".svg" { return "image/svg+xml" }
    ".gif" { return "image/gif" }
    ".ico" { return "image/x-icon" }
    ".txt" { return "text/plain; charset=utf-8" }
    ".md" { return "text/plain; charset=utf-8" }
    default { return "application/octet-stream" }
  }
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root at http://localhost:$Port/"
while ($true) {
  $context = $listener.GetContext()
  $req = $context.Request
  $resp = $context.Response
  $path = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart('/'))
  if ([string]::IsNullOrWhiteSpace($path)) { $path = 'index.html' }
  $full = Join-Path $Root $path
  if (-not (Test-Path $full)) {
    $resp.StatusCode = 404
    $writer = New-Object System.IO.StreamWriter($resp.OutputStream)
    $writer.Write("Not Found")
    $writer.Flush()
    $resp.OutputStream.Close()
    continue
  }
  try {
    $bytes = [System.IO.File]::ReadAllBytes($full)
    $resp.ContentType = Get-ContentType($full)
    $resp.ContentLength64 = $bytes.Length
    $resp.OutputStream.Write($bytes, 0, $bytes.Length)
    $resp.OutputStream.Close()
  } catch {
    $resp.StatusCode = 500
    $writer = New-Object System.IO.StreamWriter($resp.OutputStream)
    $writer.Write("Server Error")
    $writer.Flush()
    $resp.OutputStream.Close()
  }
}
