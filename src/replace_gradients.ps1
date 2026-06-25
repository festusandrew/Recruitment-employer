Get-ChildItem -Path "C:/Users/Great Joe Computers/Desktop/Recruitment/Employer/src" -Recurse -Include *.tsx,*.jsx,*.ts,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $new = $content -replace 'bg-gradient-to-[a-z]+' , 'bg-primary' -replace 'from-\[[^\]]+\]' , '' -replace 'to-\[[^\]]+\]' , ''
    # Backup original file
    Copy-Item -Path $_.FullName -Destination "$($_.FullName).bak" -Force
    Set-Content -Path $_.FullName -Value $new
}
