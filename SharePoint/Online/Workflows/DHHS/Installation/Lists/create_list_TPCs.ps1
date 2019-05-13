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
$listCreationInformation.Title = "Workaround"
$listCreationInformation.Description = "Workaround created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#WorkaroundType - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='WorkaroundType' Name='WorkaroundType' StaticName='WorkaroundType' >
                            <CHOICES>
                                <CHOICE>DDI Pre-Implementation</CHOICE>
                                <CHOICE>DDI Post-Implementation</CHOICE>
                                <CHOICE>OM</CHOICE>                                
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Workaround Number - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='Workaround Number' Name='Workaround Number' StaticName='Workaround Number' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Release Number - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='Release Number' Name='Release Number' StaticName='Release Number' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Workaround Trigger - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='Workaround Trigger' Name='Workaround Trigger' StaticName='Workaround Trigger' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#WorkaroundUsage - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='WorkaroundUsage' Name='WorkaroundUsage' StaticName='WorkaroundUsage' >
                            <CHOICES>
                                <CHOICE>Daily</CHOICE>
                                <CHOICE>Weekly</CHOICE>
                                <CHOICE>Monthly</CHOICE>
                                <CHOICE>Anually</CHOICE>                                
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#WorkaroundGoLive - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='WorkaroundGoLive' Name='WorkaroundGoLive' StaticName='WorkaroundGoLive' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#GoLiveComments - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='GoLiveComments' Name='GoLiveComments' StaticName='GoLiveComments'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Impacted Audience - Choice
$list.Fields.AddFieldAsXml("<Field Type='MultiChoice' DisplayName='Impacted Audience' Name='Impacted Audience' StaticName='Impacted Audience' >
                            <CHOICES>
                                <CHOICE>Eligibility Case Workers</CHOICE>
                                <CHOICE>Specialty Units</CHOICE>
                                <CHOICE>Help Desk</CHOICE>
                                <CHOICE>Policy Specialist</CHOICE>
                                <CHOICE>Escalation Team</CHOICE>                                
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Issue - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='Issue' Name='Issue' StaticName='Issue' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Workaround Steps - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='Workaround Steps' Name='Workaround Steps' StaticName='Workaround Steps'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Test Case - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Test Case' Name='Test Case' StaticName='Test Case' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Test Case Pass - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Test Case Pass' Name='Test Case Pass' StaticName='Test Case Pass' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Test Case Fail - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Test Case Fail' Name='Test Case Fail' StaticName='Test Case Fail' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#DefectCRNumber - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='DefectCRNumber' Name='DefectCRNumber' StaticName='DefectCRNumber' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Comments - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='Comments' Name='Comments' StaticName='Comments'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ReasonForRejection - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='ReasonForRejection' Name='ReasonForRejection' StaticName='ReasonForRejection'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#IBM BA - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='IBM BA' Name='IBM BA' StaticName='IBM BA'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Testing Team - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='Testing Team' Name='Testing Team' StaticName='Testing Team' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#State BA Lead - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='State BA Lead' Name='State BA Lead' StaticName='State BA Lead' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#MMRP State Project Manager - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='Project Manager' Name='Project Manager' StaticName='Project Manager' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#State MMRP O&M Business Analyst - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='OM Business Analyst' Name='OM Business Analyst' StaticName='OM Business Analyst' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#State MMRP Testing Analyst - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='OM Testing Analyst' Name='OM Testing Analyst' StaticName='OM Testing Analyst' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#State MMRP O&M Manager - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='OM Manager' Name='OM Manager' StaticName='OM Manager' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#State MMRP Program Director - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='OM Program Director' Name='OM Program Director' StaticName='OM Program Director' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#finalApprover - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='finalApprover' Name='finalApprover' StaticName='finalApprover' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RetiredApprover - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='RetiredApprover' Name='RetiredApprover' StaticName='RetiredApprover' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#IBMBAStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='IBMBAStatus' Name='IBMBAStatus' StaticName='IBMBAStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("IBMBAStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#TestingTeamStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='TestingTeamStatus' Name='TestingTeamStatus' StaticName='TestingTeamStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("TestingTeamStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#StateBaLeadStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='StateBaLeadStatus' Name='StateBaLeadStatus' StaticName='StateBaLeadStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("StateBaLeadStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#ProjectManagerStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='ProjectManagerStatus' Name='ProjectManagerStatus' StaticName='ProjectManagerStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("ProjectManagerStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#O&MBusinessAnalystStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='OMBusinessAnalystStatus' Name='OMBusinessAnalystStatus' StaticName='OMBusinessAnalystStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("OMBusinessAnalystStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#O&MTestingAnalystStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='OMTestingAnalystStatus' Name='OMTestingAnalystStatus' StaticName='OMTestingAnalystStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("OMTestingAnalystStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#O&MManagerStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='OMManagerStatus' Name='OMManagerStatus' StaticName='OMManagerStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("OMManagerStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#O&MDirectorStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='OMDirectorStatus' Name='OMDirectorStatus' StaticName='OMDirectorStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("OMDirectorStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#finalApproverStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='finalApproverStatus' Name='finalApproverStatus' StaticName='finalApproverStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("finalApproverStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#RetiredApprovalStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='RetiredApprovalStatus' Name='RetiredApprovalStatus' StaticName='RetiredApprovalStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>In Progress</CHOICE>
                                <CHOICE>Approved</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                                              
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("RetiredApprovalStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#IBMBAStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='IBMBAStatusDate' Name='IBMBAStatusDate' Format='DateOnly' StaticName='IBMBAStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#TestingTeamStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='TestingTeamStatusDate' Name='TestingTeamStatusDate' Format='DateOnly' StaticName='TestingTeamStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#StateBaLeadStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='StateBaLeadStatusDate' Name='StateBaLeadStatusDate' Format='DateOnly' StaticName='StateBaLeadStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ProjectManagerStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='ProjectManagerStatusDate' Name='ProjectManagerStatusDate' Format='DateOnly' StaticName='ProjectManagerStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#O&MBAStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='OMBAStatusDate' Name='OMBAStatusDate' Format='DateOnly' StaticName='OMBAStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#O&MTAStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='OMTAStatusDate' Name='OMTAStatusDate' Format='DateOnly' StaticName='OMTAStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#O&MManagerStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='OMManagerStatusDate' Name='OMManagerStatusDate' Format='DateOnly' StaticName='OMManagerStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#O&MDirectorStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='OMDirectorStatusDate' Name='OMDirectorStatusDate' Format='DateOnly' StaticName='OMDirectorStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#finalApproverStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='finalApproverStatusDate' Name='finalApproverStatusDate' Format='DateOnly' StaticName='finalApproverStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RetiredApprovalStatusDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='RetiredApprovalStatusDate' Name='RetiredApprovalStatusDate' Format='DateOnly' StaticName='RetiredApprovalStatusDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#IsInitialEmailSendOut - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='IsInitialEmailSendOut' Name='IsInitialEmailSendOut' StaticName='IsInitialEmailSendOut' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("IsInitialEmailSendOut")
$field.DefaultValue = "No"
$field.Update()
$context.ExecuteQuery()

#IsInitialOMEmailSendOut - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='IsInitialOMEmailSendOut' Name='IsInitialOMEmailSendOut' StaticName='IsInitialOMEmailSendOut' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("IsInitialOMEmailSendOut")
$field.DefaultValue = "No"
$field.Update()
$context.ExecuteQuery()

#IsThisItemResubmitted - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='IsThisItemResubmitted' Name='IsThisItemResubmitted' StaticName='IsThisItemResubmitted' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("IsThisItemResubmitted")
$field.DefaultValue = "No"
$field.Update()
$context.ExecuteQuery()

#IsInitialEmailPMSendOut - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='IsInitialEmailPMSendOut' Name='IsInitialEmailPMSendOut' StaticName='IsInitialEmailPMSendOut' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("IsInitialEmailPMSendOut")
$field.DefaultValue = "No"
$field.Update()
$context.ExecuteQuery()

#WorkaroundIsRetired - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='WorkaroundIsRetired' Name='WorkaroundIsRetired' StaticName='WorkaroundIsRetired' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("WorkaroundIsRetired")
$field.DefaultValue = "No"
$field.Update()
$context.ExecuteQuery()

#WorkaroundRetiredDate - DateTime
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='WorkaroundRetiredDate' Name='WorkaroundRetiredDate' Format='DateOnly' StaticName='WorkaroundRetiredDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#WorkaroundWorkflowStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='WorkaroundWorkflowStatus' Name='WorkaroundWorkflowStatus' StaticName='WorkaroundWorkflowStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>Initial Approval (Pending)</CHOICE>
                                <CHOICE>Initial Approval (Approved)</CHOICE>
                                <CHOICE>OM Initial Approval (Pending)</CHOICE>                                                              
                                <CHOICE>OM Initial Approval (Approved)</CHOICE>
                                <CHOICE>Final Approval (Pending)</CHOICE>
                                <CHOICE>Final Approval (Approved)</CHOICE>
                                <CHOICE>Rejected</CHOICE>
                                <CHOICE>Completed</CHOICE>
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("WorkaroundWorkflowStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#InitialNotificationEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='InitialNotificationEmailTitle' Name='InitialNotificationEmailTitle' StaticName='InitialNotificationEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#BAInitialNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='BAInitialNotificationEmailBody' Name='BAInitialNotificationEmailBody' StaticName='BAInitialNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#TAInitialNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='TAInitialNotificationEmailBody' Name='TAInitialNotificationEmailBody' StaticName='TAInitialNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#LAInitialNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='LAInitialNotificationEmailBody' Name='LAInitialNotificationEmailBody' StaticName='LAInitialNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#PMInitialNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='PMInitialNotificationEmailBody' Name='PMInitialNotificationEmailBody' StaticName='PMInitialNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#OMBAInitialNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='OMBAInitialNotificationEmailBody' Name='OMBAInitialNotificationEmailBody' StaticName='OMBAInitialNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#OMTAInitialNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='OMTAInitialNotificationEmailBody' Name='OMTAInitialNotificationEmailBody' StaticName='OMTAInitialNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#OMManagerInitialNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='OMManagerInitialNotificationEmailBody' Name='OMManagerInitialNotificationEmailBody' StaticName='OMManagerInitialNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#OMDirectorInitialNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='OMDirectorInitialNotificationEmailBody' Name='OMDirectorInitialNotificationEmailBody' StaticName='OMDirectorInitialNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitiatorInitialApprovedEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='InitiatorInitialApprovedEmailTitle' Name='InitiatorInitialApprovedEmailTitle' StaticName='InitiatorInitialApprovedEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitiatorInitialApprovedEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='InitiatorInitialApprovedEmailBody' Name='InitiatorInitialApprovedEmailBody' StaticName='InitiatorInitialApprovedEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitiatorPendingFinalEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='InitiatorPendingFinalEmailTitle' Name='InitiatorPendingFinalEmailTitle' StaticName='InitiatorPendingFinalEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitiatorPendingFinalEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='InitiatorPendingFinalEmailBody' Name='InitiatorPendingFinalEmailBody' StaticName='InitiatorPendingFinalEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitiatorFinalApprovedEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='InitiatorFinalApprovedEmailTitle' Name='InitiatorFinalApprovedEmailTitle' StaticName='InitiatorFinalApprovedEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitiatorFinalApprovalEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='InitiatorFinalApprovalEmailBody' Name='InitiatorFinalApprovalEmailBody' StaticName='InitiatorFinalApprovalEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitiatorInitialRejectedEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='InitiatorInitialRejectedEmailTitle' Name='InitiatorInitialRejectedEmailTitle' StaticName='InitiatorInitialRejectedEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitiatorInitialRejectedEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='InitiatorInitialRejectedEmailBody' Name='InitiatorInitialRejectedEmailBody' StaticName='InitiatorInitialRejectedEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitiatorInitialRejectedEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='AllInitialRejectedEmailTitle' Name='AllInitialRejectedEmailTitle' StaticName='AllInitialRejectedEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#AllInitialRejectedEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='AllInitialRejectedEmailBody' Name='AllInitialRejectedEmailBody' StaticName='AllInitialRejectedEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#AfterRejectResubmitEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='AfterRejectResubmitEmailTitle' Name='AfterRejectResubmitEmailTitle' StaticName='AfterRejectResubmitEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#AfterRejectResubmitEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='AfterRejectResubmitEmailBody' Name='AfterRejectResubmitEmailBody' StaticName='AfterRejectResubmitEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitialOMApprovalEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='InitialOMApprovalEmailTitle' Name='InitialOMApprovalEmailTitle' StaticName='InitialOMApprovalEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitialOMApprovalEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='InitialOMApprovalEmailBody' Name='InitialOMApprovalEmailBody' StaticName='InitialOMApprovalEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#trainingTeamEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='trainingTeamEmailTitle' Name='trainingTeamEmailTitle' StaticName='trainingTeamEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#trainingTeamEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='trainingTeamEmailBody' Name='trainingTeamEmailBody' StaticName='trainingTeamEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RetiredRejectedEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='RetiredRejectedEmailTitle' Name='RetiredRejectedEmailTitle' StaticName='RetiredRejectedEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RetiredRejectedEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='RetiredRejectedEmailBody' Name='RetiredRejectedEmailBody' StaticName='RetiredRejectedEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RetiredEmailApprovalTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='RetiredEmailApprovalTitle' Name='RetiredEmailApprovalTitle' StaticName='RetiredEmailApprovalTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RetiredEmailApprovalBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='RetiredEmailApprovalBody' Name='RetiredEmailApprovalBody' StaticName='RetiredEmailApprovalBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RetiredInitialEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='RetiredInitialEmailTitle' Name='RetiredInitialEmailTitle' StaticName='RetiredInitialEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RetiredInitialEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='RetiredInitialEmailBody' Name='RetiredInitialEmailBody' StaticName='RetiredInitialEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "MyItems"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><Neq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Rejected</Value></Neq></And><Neq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Completed</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "MyItemsRetired"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><Eq><FieldRef Name='WorkaroundIsRetired'/><Value Type='String'>Yes</Value></Eq></And><Eq><FieldRef Name='RetiredApprovalStatus'/><Value Type='String'>Approved</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "MyItemsCompleted"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><Eq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Completed</Value></Eq></And><Neq><FieldRef Name='RetiredApprovalStatus'/><Value Type='String'>Approved</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "MyItemsRejected"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><Eq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Rejected</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "MyItemsInitialApproval"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><BeginsWith><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Initial Approval</Value></BeginsWith></And><BeginsWith><FieldRef Name='WorkaroundType'/><Value Type='String'>DDI</Value></BeginsWith></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "MyItemsFinalApproval"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><BeginsWith><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Final Approval</Value></BeginsWith></And><BeginsWith><FieldRef Name='WorkaroundType'/><Value Type='String'>DDI</Value></BeginsWith></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "MyOMItemsInitialApproval"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><BeginsWith><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Initial Approval</Value></BeginsWith></And><BeginsWith><FieldRef Name='WorkaroundType'/><Value Type='String'>O</Value></BeginsWith></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "MyOMItemsFinalApproval"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><BeginsWith><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Final Approval</Value></BeginsWith></And><BeginsWith><FieldRef Name='WorkaroundType'/><Value Type='String'>O</Value></BeginsWith></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "WorkAroundsRetired"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><Eq><FieldRef Name='WorkaroundIsRetired'/><Value Type='String'>Yes</Value></Eq><Eq><FieldRef Name='RetiredApprovalStatus'/><Value Type='String'>Approved</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "WorkAroundsCompleted"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><Eq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Completed</Value></Eq><Neq><FieldRef Name='RetiredApprovalStatus'/><Value Type='String'>Approved</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "WorkAroundsRejected"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><Eq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Rejected</Value></Eq></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "WorkaroundsInitialApproval"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><Or><Eq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Initial Approval (Pending)</Value></Eq><Eq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Initial Approval (Approved)</Value></Eq></Or></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "WorkaroundsFinalApproval"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><Or><Eq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Final Approval (Pending)</Value></Eq><Eq><FieldRef Name='WorkaroundWorkflowStatus'/><Value Type='String'>Final Approval (Approved)</Value></Eq></Or></Where><OrderBy><FieldRef Name='Created' Ascending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Workaround Number", "WorkaroundType", "WorkaroundWorkflowStatus", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

Write-Output "List has been created successfully!."