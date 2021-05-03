#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://schhs.sharepoint.com/sites/ET/data/'

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
$listCreationInformation.Title = "MAGI"
$listCreationInformation.Description = "MAGI Form created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#Hide the list
$list.Hidden = $True
$list.Update()
$context.ExecuteQuery()

#Title2 - Text Field 
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='Title2' Name='Title2' StaticName='Title2' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Description - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='Description' Name='Description' Required='TRUE' StaticName='Description'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Active - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Active' Name='Active' StaticName='Active' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("Active")
$field.DefaultValue = "No"
$field.Update()
$context.ExecuteQuery()

#Category - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Category' Name='Category' StaticName='Category' >
                            <CHOICES>
                                <CHOICE>Application Process</CHOICE>
                                <CHOICE>Case Management</CHOICE>      
                                <CHOICE>Conversion</CHOICE>   
                                <CHOICE>Evidence</CHOICE>   
                                <CHOICE>Navigation</CHOICE>   
                                <CHOICE>Reference</CHOICE>   
                                <CHOICE>Reviews</CHOICE>   
                                <CHOICE>Interfaces</CHOICE>   
                                <CHOICE>LTC</CHOICE>                                                                           
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#JobAidLink - Text Field 
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='JobAidLink' Name='JobAidLink' StaticName='JobAidLink' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#QuickStepsLink - Text Field 
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='QuickStepsLink' Name='QuickStepsLink' StaticName='QuickStepsLink' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ShowMeLink - Text Field 
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ShowMeLink' Name='ShowMeLink' StaticName='ShowMeLink' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#PolicyReferenceLink - Text Field 
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='PolicyReferenceLink' Name='PolicyReferenceLink' StaticName='PolicyReferenceLink' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#PPTLink - Text Field 
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='PPTLink' Name='PPTLink' StaticName='PPTLink' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#WBTLink - Text Field 
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='WBTLink' Name='WBTLink' StaticName='WBTLink' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#OtherLink - Text Field 
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='OtherLink' Name='OtherLink' StaticName='OtherLink' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

Write-Output "List has been created successfully!."
