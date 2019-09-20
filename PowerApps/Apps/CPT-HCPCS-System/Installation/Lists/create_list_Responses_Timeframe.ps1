#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://schhs.sharepoint.com/sites/cpthcpps2'

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
$listCreationInformation.Title = "ResponsesTimeframe"
$listCreationInformation.Description = "Responses Timeframe created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#AlertID Type - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='ListID' Name='ListID' StaticName='ListID' >
                            <CHOICES>
                                <CHOICE>1</CHOICE>
                                <CHOICE>2</CHOICE>
                                <CHOICE>3</CHOICE>                                
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Days - Number field
$list.Fields.AddFieldAsXml("<Field Type='Number' DisplayName='Days' Name='Days' StaticName='Days' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Hide the list
$list.Hidden = $True
$list.Update()
$context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "1st Reminder"
$item["ListID"] = 1
$item["Days"] = 1
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "2nd Reminder"
$item["ListID"] = 2
$item["Days"] = 2
$item.Update()
$Context.ExecuteQuery()

Write-Output "List has been created successfully!."
