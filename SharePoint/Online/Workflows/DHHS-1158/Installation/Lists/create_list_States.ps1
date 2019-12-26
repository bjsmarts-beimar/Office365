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
$listCreationInformation.Title = "States"
$listCreationInformation.Description = "States created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()
 
#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Alabama"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Alaska"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Arkansas"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "California"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Colorado"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Connecticut"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Delaware"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Florida"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Georgia"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Hawaii"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Idaho"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Illinois"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Indiana"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Iowa"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Kansas"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Kentucky"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Louisiana"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Maine"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Maryland"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Massachusetts"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Michigan"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Minnesota"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Mississippi"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Missouri"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Montana"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Nebraska"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Nevada"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "New Hampshire"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "New Jersey"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "New Mexico"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "New York"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "North Carolina"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "North Dakota"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Ohio"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Oklahoma"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Oregon"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Pennsylvania"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Rhode Island"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "South Carolina"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "South Dakota"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Tennessee"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Texas"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Utah"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Vermont"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Virginia"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Washington"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "West Virginia"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Wisconsin"
$item.Update()
$Context.ExecuteQuery()

#Adds an item to the list
$listItemInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
$item = $list.AddItem($listItemInfo)
$item["Title"] = "Wyoming"
$item.Update()
$Context.ExecuteQuery()

Write-Output "List has been created successfully!."
