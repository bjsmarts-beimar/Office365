#Import the required DLL
Import-Module 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'
#OR
#Add-Type -Path 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll'

#Mysite URL
$site = 'https://bjsmartsusa.sharepoint.com/sites/Powerapps'

#Admin User Principal Name
$admin = 'sales@bjsmartsusa.onmicrosoft.com'

#Get Password as secure String
#$password = Read-Host 'Enter Password' -AsSecureString
$password = ConvertTo-SecureString "P@ss(0)d!" -asplaintext -force
#Get the Client Context and Bind the Site Collection
$context = New-Object Microsoft.SharePoint.Client.ClientContext($site)

#Authenticate
$credentials = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($admin , $password)
$context.Credentials = $credentials

#Create List
$listCreationInformation = New-Object Microsoft.SharePoint.Client.ListCreationInformation
$listCreationInformation.Title = "PWEList"
$listCreationInformation.Description = "Personal Work Expense List created through PowerShell"
$listCreationInformation.TemplateType = 100
$list = $context.Web.Lists.Add($listCreationInformation)
$context.Load($list)
$context.ExecuteQuery()



#ExpenseType - Choice
$list.Fields.AddFieldAsXml("<Field Type='Choice' DisplayName='ExpenseType' Name='ExpenseType' StaticName='ExpenseType' >
                            <CHOICES>
                                <CHOICE>Airline</CHOICE>
                                <CHOICE>Hotel</CHOICE>
                                <CHOICE>Airbnb</CHOICE>
                                <CHOICE>Car Rental</CHOICE>
                                <CHOICE>Miscellaneous</CHOICE>                                                                                        
                            </CHOICES></Field>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#EffectiveDate  - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='EffectiveDate' Name='EffectiveDate' Format='DateOnly' StaticName='EffectiveDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Amount - Number field
$list.Fields.AddFieldAsXml("<Field Type='Number' DisplayName='Amount' Name='Amount' StaticName='Amount' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#TransactionPaidDate  - Date Field
$list.Fields.AddFieldAsXml("<Field Type='DateTime' DisplayName='TransactionPaidDate' Name='TransactionPaidDate' Format='DateOnly' StaticName='TransactionPaidDate' />",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Notes - Notes
$list.Fields.AddFieldAsXml("<Field Type='Note' NumLines='6' DisplayName='Notes' Name='Notes' StaticName='Notes'/>",$true,[Microsoft.SharePoint.Client.AddFieldOptions]::AddFieldToDefaultView)
$list.Update()
$context.ExecuteQuery()

#Hide the list
# $list.Hidden = $True
# $list.Update()
# $context.ExecuteQuery()

Write-Output "List has been created successfully!."
