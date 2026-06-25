Get-ChildItem -Path "C:/Users/Great Joe Computers/Desktop/Recruitment/Employer/src" -Recurse -Include *.tsx,*.jsx,*.ts,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    # Remove any Tailwind shadow classes (shadow-*)
    $new = $content -replace "\bshadow-[a-zA-Z0-9_-]+\b", ""
    # Backup original file
    Copy-Item -Path $_.FullName -Destination "$($_.FullName).bak" -Force
    Set-Content -Path $_.FullName -Value $new
}
