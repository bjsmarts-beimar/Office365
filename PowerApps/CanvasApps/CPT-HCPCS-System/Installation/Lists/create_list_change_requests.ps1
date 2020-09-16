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
$listCreationInformation.Title = "RequestList"
$listCreationInformation.Description = "Request List created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#Change Request Number - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ChangeRequestNumber' Name='ChangeRequestNumber' StaticName='ChangeRequestNumber' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Reviewers - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' Mult='TRUE' NumLines='6' DisplayName='Reviewers' Name='Reviewers' StaticName='Reviewers' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="Programs"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#Programs - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='Programs' Name='Programs' StaticName='Programs' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="MedicalCodes"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#Medical Codes - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='MedicalCodes' Name='MedicalCodes' StaticName='MedicalCodes' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Due Date for Policy - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='DueDatePolicy' Name='DueDatePolicy' Format='DateOnly' StaticName='DueDatePolicy' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Due Date for Response - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='DueDateResponse' Name='DueDateResponse' Format='DateOnly' StaticName='DueDateResponse' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Comments - Notes
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='Comments' Name='Comments' StaticName='Comments'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#WorkflowStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='WorkflowStatus' Name='WorkflowStatus' StaticName='WorkflowStatus' >
                            <CHOICES>
                                <CHOICE>Save As Draft</CHOICE>
                                <CHOICE>Preliminary Review</CHOICE>
                                <CHOICE>Formal Review</CHOICE>
                                <CHOICE>Completed</CHOICE>
                                <CHOICE>Escalated</CHOICE>                                
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("WorkflowStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#Hide the list
$list.Hidden = $True
$list.Update()
$context.ExecuteQuery()

Write-Output "List has been created successfully!."