#Audit Farm

Add-PSSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue
#Audit Farm
Clear-Host
$outfile = ".\Logs\Audit-Farm.csv"
#Write the CSV header
"Config DB `tBuild Version `tServers `tOutbound Email" > $outfile

$farm = Get-SPFarm

$farm.Name + "`t" + $farm.BuildVersion + "`t" + $farm.Servers.Count + "`t" + $((Get-SPWebapplication)[0] | %{$_.outboundmailserviceinstance.server.Address}) >> $outfile


$outfile = ".\logs\Audit-FarmServers.csv"
"Server `tRole `tStatus" > $outfile
#Web Application
foreach ($server in $farm.Servers)
{
    #WebApp URL, Content DB, Content DB Size, Site Collection Count, Site Limit
    $server.Name + "`t" + $server.Role +"`t" + $server.Status >> $outfile
}

