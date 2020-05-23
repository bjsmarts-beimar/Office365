#Import and Report

$aams = Import-Clixml .\Get-SPAlternateURL.xml

$aams

$aams | %{$_.Collection.DisplayName}