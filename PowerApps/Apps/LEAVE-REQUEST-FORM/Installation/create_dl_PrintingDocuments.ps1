#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://schhs.sharepoint.com/sites/SCDHHSLeaveRequestForm'

#Admin User Principal Name
$admin = 'beimar.medina@scdhhs.gov'

#Get Password as secure String
$password = Read-Host 'Enter Password' -AsSecureString
#$password = ConvertTo-SecureString "YourPassword" -asplaintext -force
#Get the Client Context and Bind the Site Collection
$context = New-Object Microsoft.SharePoint.Client.ClientContext($site)

#Authenticate
$credentials = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($admin , $password)
$context.Credentials = $credentials

#Create List
$listCreationInformation = New-Object Microsoft.SharePoint.Client.ListCreationInformation
$listCreationInformation.Title = "Printing"
$listCreationInformation.Description = "Printing created through PowerShell"
$listCreationInformation.TemplateType = 101
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#sharepoint online create folder powershell
$inputFolderName = 'Printing/Input' 
$list.RootFolder.Folders.Add($inputFolderName)
$Ctx.ExecuteQuery()
Write-host "Folder '$inputFolderName' Created Successfully!" -ForegroundColor Green

$outputFolderName = 'Printing/Output' 
$list.RootFolder.Folders.Add($outputFolderName)
$Ctx.ExecuteQuery()
Write-host "Folder '$outputFolderName' Created Successfully!" -ForegroundColor Green

Write-Output "Document Library has been created successfully!."