#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://schhs.sharepoint.com/sites/cpthcpps2'

#Admin User Principal Name
$admin = 'beimar.medina@scdhhs.gov'

#Get Password as secure String
#$password = Read-Host 'Enter Password' -AsSecureString
$password = ConvertTo-SecureString "Tipit098!!!" -asplaintext -force
#Get the Client Context and Bind the Site Collection
$context = New-Object Microsoft.SharePoint.Client.ClientContext($site)

#Authenticate
$credentials = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($admin , $password)
$context.Credentials = $credentials

#Create List
$listCreationInformation = New-Object Microsoft.SharePoint.Client.ListCreationInformation
$listCreationInformation.Title = "EscalationChart"
$listCreationInformation.Description = "Escalation Chart created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()

#Get Lookup list
$LookupListName="Programs"
$LookupList = $context.Web.Lists.GetByTitle($LookupListName)
$context.Load($LookupList)
$context.ExecuteQuery()
$LookupListID= $LookupList.id
$LookupWebID=$context.Web.Id

#Program - Lookup Field
$list.Fields.AddFieldAsXml("<Field Type='Lookup' DisplayName='Program' Name='Program' StaticName='Program' List='$LookupListID' WebId='$LookupWebID' ShowField='Title' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Director - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='Director' Name='Director' StaticName='Director' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Assistance - People Field
$list.Fields.AddFieldAsXml("<Field Type='User' UserSelectionMode='PeopleOnly' NumLines='6' DisplayName='Assistance' Name='Assistance' StaticName='Assistance' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Hide the list
$list.Hidden = $True
$list.Update()
$context.ExecuteQuery()

$SupervisorUser = $context.web.EnsureUser("beimar.medina@scdhhs.gov")
$DirectorUser = $context.web.EnsureUser("beimar.medina@scdhhs.gov")

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="1;#Ambulance"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="2;#ADS"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="3;#Clinic"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="4;#CLTC"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="5;#CMH"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="6;#Dental"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="7;#DME"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="8;#Early Intervention"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="9;#Enhanced"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="10;#FQHC"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="11;#Home Health"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="12;#Hospice"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="13;#Hospital"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="14;#LIPS"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="15;#Local ED"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="16;#Nursing"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="17;#OSS"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="18;#Pharmacy"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="19;#Physicians"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="20;#Private REHAB"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="21;#Psychiatric Hospital"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="22;#RBHS"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="23;#RHC"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="24;#TCM"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="25;#Appendices 1, 3 Section 1, 3 5"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="26;#Supplements"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="27;#TPL Supplement"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = ""
$item["Program"]="28;#Managed Care P&P"
$item["Director"] = $DirectorUser
$item["Assistance"] = $SupervisorUser
$item.Update()
$Context.ExecuteQuery()


Write-Output "List has been created successfully!."
