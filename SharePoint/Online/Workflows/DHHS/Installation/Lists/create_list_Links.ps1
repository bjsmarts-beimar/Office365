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
$listCreationInformation.Title = "Links"
$listCreationInformation.Description = "Links created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#Link - field Text
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='Link' Name='Link' StaticName='Link' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#WorkAroundID - Number field
$list.Fields.AddFieldAsXml("<Field Type='Number' DisplayName='WorkAroundID' Name='WorkAroundID' StaticName='WorkAroundID' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#AlertID Type - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='IsTestCaseAttachment' Name='IsTestCaseAttachment' StaticName='IsTestCaseAttachment'>
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                                     
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("IsTestCaseAttachment")
$field.DefaultValue = "No"
$field.Update()
$context.ExecuteQuery()

Write-Output "List has been created successfully!."

