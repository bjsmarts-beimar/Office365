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
$listCreationInformation.Title = "EmergencyFormList"
$listCreationInformation.Description = "Rebuttal List created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#Employee Name - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='EmployeeName' Name='EmployeeName' StaticName='EmployeeName' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Supervisor - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='Supervisor' Name='Supervisor' StaticName='Supervisor' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="AgencyArea"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#AgencyArea - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='AgencyArea' Name='AgencyArea' StaticName='AgencyArea' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="EmployeeType"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#EmployeeType - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='EmployeeType' Name='EmployeeType' StaticName='EmployeeType' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="Vendor"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#Vendor - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='Vendor' Name='Vendor' StaticName='Vendor' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#VendorName - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='VendorName' Name='VendorName' StaticName='VendorName' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#AfterHoursPhoneNumber - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='AfterHoursPhoneNumber' Name='AfterHoursPhoneNumber' StaticName='AfterHoursPhoneNumber' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#AfterHoursEmail - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='AfterHoursEmail' Name='AfterHoursEmail' StaticName='AfterHoursEmail' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Q1 - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Q1' Name='Q1' StaticName='Q1' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Q2 - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Q2' Name='Q2' StaticName='Q2' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="Reason"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#Reason - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='Reason' Name='Reason' StaticName='Reason' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#PaidSickLeaveStartDate  - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='PaidSickLeaveStartDate' Name='PaidSickLeaveStartDate' Format='DateOnly' StaticName='PaidSickLeaveStartDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#PaidSickLeaveEndDate - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='PaidSickLeaveEndDate' Name='PaidSickLeaveEndDate' Format='DateOnly' StaticName='PaidSickLeaveEndDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#EmployeeStartDate  - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='EmployeeStartDate' Name='EmployeeStartDate' Format='DateOnly' StaticName='EmployeeStartDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ReasonRequested - Notes
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='ReasonRequested' Name='ReasonRequested' StaticName='ReasonRequested'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#EmergencyRequestedStartDate  - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='EmergencyRequestedStartDate' Name='EmergencyRequestedStartDate' Format='DateOnly' StaticName='EmergencyRequestedStartDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#EmergencyRequestedEndDate - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='EmergencyRequestedEndDate' Name='EmergencyRequestedEndDate' Format='DateOnly' StaticName='EmergencyRequestedEndDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#workflowStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='WorkflowStatus' Name='WorkflowStatus' StaticName='WorkflowStatus' >
                            <CHOICES>
                                <CHOICE>Open</CHOICE>
                                <CHOICE>Closed</CHOICE>                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Hide the list
$list.Hidden = $True
$list.Update()
$context.ExecuteQuery()

Write-Output "List has been created successfully!."
