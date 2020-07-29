﻿#Add the SharePoint PowerShell Snap-In
Add-PSSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue 

#FileName
$outfile = "2013WF"
$fileName = ".\logs\$outfile-" + $(Get-Date -Format "yyyyMMddHHmmss") + ".csv"

#Output Array
[PSObject[]]$resultsarray = @()

Clear-Host

$WebApplications = Get-SPWebApplication
foreach($webApp in $WebApplications)
                        $wfm = New-object Microsoft.SharePoint.WorkflowServices.WorkflowServicesManager($web)
                        #-- Getting the subscriptions
                        $sub = $wfm.GetWorkflowSubscriptionService()
                        #Enum the web lists
                        foreach ($list in $web.Lists){
                            # Enum workflows
                            $workflows = $sub.EnumerateSubscriptionsByList($list.ID)
                            foreach ($workflow in $workflows){
                                Write-Host "Found 2013 Workflow: $($workflow.Name) on $($list.Title) in $($list.ParentWeb.Title)" -ForegroundColor Yellow
                                $outObject = new-object PSObject
                                $global:resultsarray += $outObject

                            }
                        }
                    }
                }
            }
            catch
                #Write-Host "Exception Type: $($_.Exception.GetType().FullName)" -ForegroundColor Red
                Write-Host "Exception Message: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

$resultsarray | Export-csv $fileName -notypeinformation