#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://schhs.sharepoint.com/sites/SBH/ar/data'

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
$listCreationInformation.Title = "AR1158Form"
$listCreationInformation.Description = "Accounts Receivable 1158 Form created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#Certification Action - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='CertificationAction' Name='CertificationAction' StaticName='CertificationAction' >
                            <CHOICES>
                                <CHOICE>New</CHOICE>
                                <CHOICE>Change</CHOICE>                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Debt Classification - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='DebtClassification' Name='DebtClassification' StaticName='DebtClassification' >
                            <CHOICES>
                                <CHOICE>Fraud</CHOICE>
                                <CHOICE>Non-Fraud</CHOICE>                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Address of Debtor - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='Address' Name='Address' StaticName='Address' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="Counties"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#County Name - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='County' Name='County' StaticName='County' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#City - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='City' Name='City' StaticName='City' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#State - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='State' Name='State' StaticName='State' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Zip Code - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ZipCode' Name='ZipCode' StaticName='ZipCode' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Provider ID # or Family Case Number - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ProviderCaseNumber' Name='ProviderCaseNumber' StaticName='ProviderCaseNumber' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#From - Period Of Overpayment - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='FromDate' Name='FromDate' Format='DateOnly' StaticName='FromDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#To - Period Of Overpayment - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='ToDate' Name='ToDate' Format='DateOnly' StaticName='ToDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="Programs"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#Program Involved - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='Program' Name='Program' StaticName='Program' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Type of Service - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ServiceType' Name='ServiceType' StaticName='ServiceType' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Amount Due - Number
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='AmountDue' Name='AmountDue' StaticName='AmountDue' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Due Date - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='DueDate' Name='DueDate' Format='DateOnly' StaticName='DueDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Federal % - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='Federal' Name='Federal' StaticName='Federal' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#stateSource % - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='StateSource' Name='StateSource' StaticName='StateSource' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Other % - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='Other' Name='Other' StaticName='Other' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Other Fund Source - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='FundSource' Name='FundSource' StaticName='FundSource' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="Ledgers"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#General Ledger - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='GeneralLedger' Name='GeneralLedger' StaticName='GeneralLedger' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="CostCenter"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#Cost Center - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='CostCenter' Name='CostCenter' StaticName='CostCenter' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="FunctionalAreas"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#Functional Area - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='FunctionalAreas' Name='FunctionalAreas' StaticName='FunctionalAreas' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Payment Information - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Payment' Name='Payment' StaticName='Payment' >
                            <CHOICES>
                                <CHOICE>Deduct</CHOICE>
                                <CHOICE>Do Not Deduct</CHOICE>                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Comments - Notes
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='Comments' Name='Comments' StaticName='Comments'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ReasonForRejection - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='ReasonForRejection' Name='ReasonForRejection' StaticName='ReasonForRejection'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

# R E Q U E S T O R    S I G N A T U R E - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='RequestorSignature' Name='RequestorSignature' StaticName='RequestorSignature' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#I agree - check box field
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='IsAgree' Name='IsAgree' StaticName='IsAgree' >
                            <CHOICES>
                                <CHOICE>Yes</CHOICE>
                                <CHOICE>No</CHOICE>                                                              
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Requestor Title - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='RequestorTitle' Name='RequestorTitle' StaticName='RequestorTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#County/Division - Text Field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='CountyDivision' Name='CountyDivision' StaticName='CountyDivision' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Supervisor - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='Supervisor' Name='Supervisor' StaticName='Supervisor' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#WorkflowStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='WorkflowStatus' Name='WorkflowStatus' StaticName='WorkflowStatus' >
                            <CHOICES>
                                <CHOICE>Not Started</CHOICE>
                                <CHOICE>Initial Approval (Pending)</CHOICE>
                                <CHOICE>Initial Approval (Approved)</CHOICE>
                                <CHOICE>Final Approval (Pending)</CHOICE>
                                <CHOICE>Final Approval (Approved)</CHOICE>
                                <CHOICE>Rejected</CHOICE>                                
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("WorkflowStatus")
$field.DefaultValue = "Not Started"
$field.Update()
$context.ExecuteQuery()

#WorkflowStatus - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='Counter' Name='Counter' StaticName='Counter' >
                            <CHOICES>
                                <CHOICE>0</CHOICE>
                                <CHOICE>1</CHOICE>
                                <CHOICE>2</CHOICE>                                                                
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

$field = $list.Fields.GetByTitle("Counter")
$field.DefaultValue = "0"
$field.Update()
$context.ExecuteQuery()

#InitialNotificationEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='InitialNotificationEmailTitle' Name='InitialNotificationEmailTitle' StaticName='InitialNotificationEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitialNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='InitialNotificationEmailBody' Name='InitialNotificationEmailBody' StaticName='InitialNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitialSupervisorEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='InitialSupervisorEmailTitle' Name='InitialSupervisorEmailTitle' StaticName='InitialSupervisorEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#InitialSupervisorEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='InitialSupervisorEmailBody' Name='InitialSupervisorEmailBody' StaticName='InitialSupervisorEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ApprovalNotificationEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ApprovalNotificationEmailTitle' Name='ApprovalNotificationEmailTitle' StaticName='ApprovalNotificationEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ApprovalNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='ApprovalNotificationEmailBody' Name='ApprovalNotificationEmailBody' StaticName='ApprovalNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ApprovalGroupEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ApprovalGroupEmailTitle' Name='ApprovalGroupEmailTitle' StaticName='ApprovalGroupEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ApprovalGroupEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='ApprovalGroupEmailBody' Name='ApprovalGroupEmailBody' StaticName='ApprovalGroupEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RejectionNotificationEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='RejectionNotificationEmailTitle' Name='RejectionNotificationEmailTitle' StaticName='RejectionNotificationEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#RejectionNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='RejectionNotificationEmailBody' Name='RejectionNotificationEmailBody' StaticName='RejectionNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ResubmitNotificationEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ResubmitNotificationEmailTitle' Name='ResubmitNotificationEmailTitle' StaticName='ResubmitNotificationEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ResubmitNotificationEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='ResubmitNotificationEmailBody' Name='ResubmitNotificationEmailBody' StaticName='ResubmitNotificationEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ResubmitSupervisorEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='ResubmitSupervisorEmailTitle' Name='ResubmitSupervisorEmailTitle' StaticName='ResubmitSupervisorEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#ResubmitSupervisorEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='ResubmitSupervisorEmailBody' Name='ResubmitSupervisorEmailBody' StaticName='ResubmitSupervisorEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#FinalEmailTitle - Text field
$list.Fields.AddFieldAsXml("<Field Type='Text' DisplayName='FinalEmailTitle' Name='FinalEmailTitle' StaticName='FinalEmailTitle' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#FinalEmailBody - Multiple Lines of Text
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='FinalEmailBody' Name='FinalEmailBody' StaticName='FinalEmailBody' RestrictedMode='TRUE' RichText='TRUE' RichTextMode='FullHtml' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "My Items"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><Neq><FieldRef Name='WorkflowStatus'/><Value Type='String'>Rejected</Value></Neq></And><Neq><FieldRef Name='WorkflowStatus'/><Value Type='String'>Final Approval (Approved)</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Descending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Program", "CertificationAction", "DebtClassification", "ServiceType", "AmountDue", "DueDate", "Supervisor", "RequestorSignature", "City", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "My Rejected Items"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><Eq><FieldRef Name='WorkflowStatus'/><Value Type='String'>Rejected</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Descending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Program", "CertificationAction", "DebtClassification", "ServiceType", "AmountDue", "DueDate", "Supervisor", "RequestorSignature", "City", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "My Completed Items"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><Eq><FieldRef Name='WorkflowStatus'/><Value Type='String'>Final Approval (Approved)</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Descending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Program", "CertificationAction", "DebtClassification", "ServiceType", "AmountDue", "DueDate", "Supervisor", "RequestorSignature", "City", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "1158 Pending Manager Approvals"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><And><Eq><FieldRef Name='Author'/><Value Type='String'>[Me]</Value></Eq><Eq><FieldRef Name='WorkflowStatus'/><Value Type='String'>Initial Approval (Pending)</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Descending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Program", "CertificationAction", "DebtClassification", "ServiceType", "AmountDue", "DueDate", "Supervisor", "RequestorSignature", "City", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "Pending Items"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><Eq><FieldRef Name='WorkflowStatus'/><Value Type='String'>Initial Approval (Pending)</Value></Eq></Where><OrderBy><FieldRef Name='Created' Descending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Program", "CertificationAction", "DebtClassification", "ServiceType", "AmountDue", "DueDate", "Supervisor", "RequestorSignature", "City", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "Completed Items"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><Eq><FieldRef Name='WorkflowStatus'/><Value Type='String'>Final Approval (Approved)</Value></Eq></Where><OrderBy><FieldRef Name='Created' Descending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Program", "CertificationAction", "DebtClassification", "ServiceType", "AmountDue", "DueDate", "Supervisor", "RequestorSignature", "City", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

#Creating new view using ViewCreationInformation (VCI)
$vci = New-Object Microsoft.SharePoint.Client.ViewCreationInformation 
$vci.Title = "Rejected Items"
$vci.ViewTypeKind= [Microsoft.SharePoint.Client.ViewType]::None
$viewQuery = "<Where><Eq><FieldRef Name='WorkflowStatus'/><Value Type='String'>Rejected</Value></Eq></Where><OrderBy><FieldRef Name='Created' Descending='TRUE'/></OrderBy>"
$vci.Query = $viewQuery
$vci.RowLimit=50
$vci.ViewFields=@("ID", "Title", "Program", "CertificationAction", "DebtClassification", "ServiceType", "AmountDue", "DueDate", "Supervisor", "RequestorSignature", "City", "Comments", "Author", "Created", "Editor", "Modified")

#adding view to list
$listViews = $list.views
$context.load($listViews)
$addListView = $listViews.Add($vci)
$context.load($addListView)
$context.ExecuteQuery()

Write-Output "List has been created successfully!."
