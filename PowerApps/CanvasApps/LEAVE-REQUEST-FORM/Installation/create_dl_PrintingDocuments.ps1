#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://schhs.sharepoint.com/sites/Powerapps'

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

Write-Output "Document Library has been created successfully!."

$ListName = 'Printing'
$ParentFolder= $context.Web.GetFolderByServerRelativeUrl($ListName)

$inputFolderName = 'Input' 
$Folder = $ParentFolder.Folders.Add($inputFolderName)  
$context.Load($Folder)  
$context.ExecuteQuery()  

Write-host "Folder '$inputFolderName' Created Successfully!" -ForegroundColor Green

$outputFolderName = 'Output' 
$Folder = $ParentFolder.Folders.Add($outputFolderName)  
$context.Load($Folder)  
$context.ExecuteQuery()  

Write-host "Folder '$outputFolderName' Created Successfully!" -ForegroundColor Green
