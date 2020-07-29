﻿#Add the SharePoint PowerShell Snap-In
Add-PSSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue 
Import-Module Visio -ErrorAction SilentlyContinue

cls

#Templates: C:\Program Files (x86)\Microsoft Office\Office15\Visio Content\1033

function Draw-SubSites($web, $parent)
    {
        Write-Host "Drawing root site at: $($web.Url)" -ForegroundColor Green

        $masHome = Get-VisioMaster "Home" $web_shapes
        $parent = New-VisioShape $masHome 1,1
        Set-VisioShapeText $web.Title
        New-VisioHyperlink -Address $web.Url -Shapes $parent
        
    }
    { 
        #if ($depth -eq $maxdepth) {return}
        Write-Host "Drawing Subsite at: $($subweb.Url)" -ForegroundColor Green
        #Shapes if isAppWeb
        #$ac = Start-SPAssignment
        
        $shpweb = New-VisioShape -Masters $masWeb -Points 4,4 -NoSelect
        Set-VisioShapeText $subweb.Title -Shapes @($shpweb)
        New-VisioHyperlink -Address $subweb.Url -Shapes $shpweb

        New-VisioConnection -From $parent -To $shpweb | Out-Null
        
        #Stop-SPAssignment $ac
        Draw-SubSites $subweb $shpweb
    }
$site = Get-SPSite $siteurl -ErrorAction SilentlyContinue
if ($site)
{
    Write-Host "This script will enumerate $($site.AllWebs.Count) subsites. Press [Enter] to continue [X] to abort."
    {
        Draw-SubSites $site.RootWeb $null
    }
}