#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://schhs.sharepoint.com/sites/tpc/data'

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
$listCreationInformation.Title = "fiscalYears"
$listCreationInformation.Description = "fiscalYears created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#AlertID Type - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Active' Name='Active' StaticName='Active'>
                            <DEFAULT>No</DEFAULT>
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                     
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#fiscalStartDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='fiscalStartDate' Name='fiscalStartDate' Format='DateOnly' StaticName='fiscalStartDate'  />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#fiscalEndDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='fiscalEndDate' Name='fiscalEndDate' Format='DateOnly' StaticName='fiscalEndDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "2019"
$item["Active"] = "Yes"
$item["fiscalStartDate"] = "7/1/2018"
$item["fiscalEndDate"] = "6/30/2019"
$item.Update()
$Context.ExecuteQuery()

Write-Output "List has been created successfully!."