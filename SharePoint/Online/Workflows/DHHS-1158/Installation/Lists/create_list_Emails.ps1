#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://schhs.sharepoint.com/sites/ar/data'

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
$item["EmailSubject"] = "Form 1158 - '{Title}' - Submitted"
$item["EmailBody"] = "<p>Hi,<br><br>Your form 1158 got submitted to '{Supervisor}'.<br><br>Form Title - '{Title}'<br><br>Thank You</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 2
$item["Title"] = "Initial Supervisor Notification Email"
$item["EmailSubject"] = "New 1158 Form submitted for approval - '{Title}'"
$item["EmailBody"] = "<p>Hi,<br><br>Find the new 1158 form submitted for approval click <a href='/sites/ar/Pages/approval.aspx?RecordID={ID}&ApprovalType={TypeID}'>here</a><br><br>Thank You</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 3
$item["Title"] = "Initial Approval Email"
$item["EmailSubject"] = "Form 1158 approved - '{Title}'"
$item["EmailBody"] = "<p>Hi,<br><br>Form 1158 got approved by {Supervisor} - {Supervisor Signature}<br><br>Title - {Title}<br><br>Find 1158 click <a href='/sites/ar/Pages/view.aspx?RecordID={ID}&ApprovalType={TypeID}'>here</a><br><br>Thank You</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 4
$item["Title"] = "Initial Group Approval Email"
$item["EmailSubject"] = "New 1158 submitted and approved by supervisor - '{Title}'"
$item["EmailBody"] = "<p>Hi,<br><br>New 1158 form got submitted and approved by {Supervisor} - {Supervisor Signature} <br><br>Title - {Title} <br><br> Find the form <a href='/sites/ar/Pages/approval.aspx?RecordID={ID}&ApprovalType={TypeID}'>here</a> <br><br>Thank You</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 5
$item["Title"] = "Rejection Email"
$item["EmailSubject"] = "Form 1158 got rejected - '{Title}'"
$item["EmailBody"] = "<p>Hi, <br><br>Form 1158 get rejeted<br><br>Title - {Title}<br><br> find 1158 click <a href='/sites/ar/Pages/resubmit.aspx?RecordID={ID}'>here</a><br><br>Thank You</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 6
$item["Title"] = "Resubmit Email"
$item["EmailSubject"] = "Form 1158 - '{Title}' - Resubmitted"
$item["EmailBody"] = "<p>Hi,<br><br>Your form 1158 got resubmitted to '{Supervisor}'.<br><br>Form Title - '{Title}'<br><br>Thank You</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 7
$item["Title"] = "Resubmit Supervisor Email"
$item["EmailSubject"] = "New 1158 Form resubmitted for approval - '{Title}'"
$item["EmailBody"] = "<p>Hi,<br><br>Find the new 1158 form resubmitted for approval click <a href='/sites/ar/Pages/approval.aspx?RecordID={ID}&ApprovalType={TypeID}'>here</a><br><br>Thank You</p>"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["EmailID"] = 8
$item["Title"] = "Final Notification Approval Email"
$item["EmailSubject"] = "New 1158 Form got final approval - '{Title}'"
$item["EmailBody"] = "<p>Hi,<br><br>Find the approved 1158 click <a href='/sites/ar/Pages/view.aspx?RecordID={ID}&ApprovalType={TypeID}'>here</a><br><br>Thank You</p>"
$item.Update()
$Context.ExecuteQuery()

Write-Output "List has been created successfully!."