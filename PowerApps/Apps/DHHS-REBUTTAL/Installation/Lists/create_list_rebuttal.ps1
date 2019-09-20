#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://schhs.sharepoint.com/sites/HREPSMRebuttal'

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
$listCreationInformation.Title = "RebuttalList"
$listCreationInformation.Description = "Rebuttal List created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#Supervisor - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='Supervisor' Name='Supervisor' StaticName='Supervisor' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Manager Name - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='ManagerName' Name='ManagerName' StaticName='ManagerName' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Regional Director Name - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='RegionalDirector' Name='RegionalDirector' StaticName='RegionalDirector' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Location - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Location' Name='Location' StaticName='Location' >
                            <CHOICES>
                                <CHOICE>Region 1</CHOICE>
                                <CHOICE>Region 2</CHOICE>
                                <CHOICE>Region 3</CHOICE>
                                <CHOICE>Region 4</CHOICE>
                                <CHOICE>Richland Processing Center</CHOICE>
                                <CHOICE>Aiken Processing Center</CHOICE>
                                <CHOICE>Spantanburg Processing Center</CHOICE>
                                <CHOICE>Midlands Processing Center</CHOICE>                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#TypeOfRebuttal - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='TypeOfRebuttal' Name='TypeOfRebuttal' StaticName='TypeOfRebuttal' >
                            <CHOICES>
                                <CHOICE>Timeliness Metric</CHOICE>
                                <CHOICE>Accuracy Metric</CHOICE>
                                <CHOICE>Timeliness and Accuracy Metrics</CHOICE>
                                <CHOICE>Other</CHOICE>                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Comments - Notes
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='Comments' Name='Comments' StaticName='Comments'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#preMeetingFindings - Notes
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='PreMeetingFindings' Name='PreMeetingFindings' StaticName='PreMeetingFindings'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#rebuttalCommitteeNotes - Notes
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='RebuttalCommitteeNotes' Name='RebuttalCommitteeNotes' StaticName='RebuttalCommitteeNotes'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RebuttalCommitteeDate - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='RebuttalCommitteeDate' Name='RebuttalCommitteeDate' Format='DateOnly' StaticName='RebuttalCommitteeDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ResponseDate - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='ResponseDate' Name='ResponseDate' Format='DateOnly' StaticName='ResponseDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Person Responsible for Error - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='PRforError' Name='PRforError' StaticName='PRforError' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Follow-Up Needed - Notes
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='FollopUpNeeded' Name='FollopUpNeeded' StaticName='FollopUpNeeded'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
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
