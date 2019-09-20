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
$listCreationInformation.Title = "Approvers"
$listCreationInformation.Description = "Approvers created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#AlertID Type - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='ApproversId' Name='ApproversId' StaticName='ApproversId' >
                            <CHOICES>
                                <CHOICE>1</CHOICE>
                                <CHOICE>2</CHOICE>
                                <CHOICE>3</CHOICE>        
                                <CHOICE>4</CHOICE>     
                                <CHOICE>5</CHOICE>
                                <CHOICE>6</CHOICE>     
                                <CHOICE>7</CHOICE>     
                                <CHOICE>8</CHOICE>     
                                <CHOICE>9</CHOICE>                                  
                                <CHOICE>10</CHOICE>     
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ADAccount - free Text
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ADAccount' Name='ADAccount' StaticName='ADAccount' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Senior Consultant - Beimar Medina"
$item["ApproversId"] = 1
$item["ADAccount"] = "i:0#.f|membership|beimar.medina@scdhhs.gov"
$item.Update()
$Context.ExecuteQuery()

Write-Output "List has been created successfully!."