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
$listCreationInformation.Title = "Emails"
$listCreationInformation.Description = "Emails created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#AlertID Type - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='EmailID' Name='EmailID' StaticName='EmailID' >
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
                                <CHOICE>11</CHOICE>
                                <CHOICE>12</CHOICE>                                
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#EmailSubject - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='EmailSubject' Name='EmailSubject' StaticName='EmailSubject' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#EmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='EmailBody' Name='EmailBody' StaticName='EmailBody'  />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 1 
$item["Title"] = "Initial Notification Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' waiting your review and approval"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been initiated for your review/approval.<BR><BR> Please take action immediately by clicking on the following <a href='/sites/TPC/Pages/approval.aspx?WorkaroundId={ID}&ApprovalType={TypeID}'>link.</a><br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 2 
$item["Title"] = "Rejected Notification Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' was rejected by approver"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been rejected for one of the approvers.<BR><BR> Review this Temporary Process Change (TPC) '{Title}' using the following <a href='/sites/TPC/Pages/resubmit.aspx?WorkaroundId={ID}'>link.</a><br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 3 
$item["Title"] = "Initial Approval Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' approved"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been initially approved.<BR><BR> Review this Temporary Process Change (TPC) '{Title}' using the following <a href='/sites/TPC/Pages/final.aspx?WorkaroundId={ID}&ApprovalType={TypeID}'>link</a> and submit it for final approval.<br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 4 
$item["Title"] = "Final Approval Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' approved"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been approved.<BR><BR> Review this Temporary Process Change (TPC) '{Title}' using the following <a href='/sites/TPC/Pages/view.aspx?WorkaroundId={ID}'>link.</a>.<br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 5 
$item["Title"] = "Pending Final Approval Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' waiting your review and approval"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been submitted for approval.<BR><BR> Review this Temporary Process Change (TPC) '{Title}' using the following <a href='/sites/TPC/Pages/approval.aspx?WorkaroundId={ID}&ApprovalType={TypeID}'>link.</a><br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 6 
$item["Title"] = "Initiate OM Approval Notification Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' waiting your review and approval"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been approved.<BR><BR> Review this Temporary Process Change (TPC) '{Title}' using the following <a href='/sites/TPC/Pages/goTo.aspx?WorkaroundId={ID}&ApprovalType={TypeID}'>link</a> submit it for O&M approval.<br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 7 
$item["Title"] = "After Reject Resubmit Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' waiting your review and approval"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been submitted again after been rejected initially.<BR><BR> Review and approve this Temporary Process Change (TPC) '{Title}' using the following <a href='/sites/TPC/Pages/approval.aspx?WorkaroundId={ID}&ApprovalType={TypeID}'>link</a>.<br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 8 
$item["Title"] = "All Rejected Notification Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' was rejected by approver"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been rejected for one of the approvers.<BR><BR> Review this Temporary Process Change (TPC) '{Title}' using the following <a href='/sites/TPC/Pages/edit.aspx?WorkaroundId={ID}&DisplayRejection=True'>link.</a><br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 9 
$item["Title"] = "Traning Team Notification Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' was approved"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been approved.<BR><BR> Review this Temporary Process Change (TPC) '{Title}' using the following <a href='/sites/TPC/Pages/view.aspx?WorkaroundId={ID}'>link.</a>.<br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 10 
$item["Title"] = "Retired Approval Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' was retired"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been retired.<BR><BR> Review this Temporary Process Change (TPC) '{Title}' using the following <a href='/sites/TPC/Pages/view.aspx?WorkaroundId={ID}'>link.</a>.<br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 11 
$item["Title"] = "Retired Initial Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' waiting your review and approval"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been initiated for retirement and it needs your review/approval.<BR><BR> Please take action immediately by clicking on the following <a href='/sites/TPC/Pages/approval.aspx?WorkaroundId={ID}&ApprovalType={TypeID}'>link.</a><br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 12 
$item["Title"] = "Retired Reject Email"
$item["EmailSubject"] = "Temporary Process Change (TPC) Form '{Title}' has been rejected by Approver"
$item["EmailBody"] = "<p>You are receiving this email notifying you that a Temporary Process Change (TPC) '{Title}' has been initiated for retirement and it got rejected by Approver.<BR><BR> Please take action immediately by clicking on the following <a href='/sites/TPC/Pages/retire.aspx?WorkaroundId={ID}'>link.</a><br><br>Please do not reply to this e-mail. If you need help, please call Help Desk: 803-898-2575</p>"
$item.Update()
$Context.ExecuteQuery()

Write-Output "List has been created successfully!."