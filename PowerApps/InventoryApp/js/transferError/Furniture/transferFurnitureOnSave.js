function formOnSave(executionContext)
{    
    debugger;
    let formContext = executionContext.getFormContext();

    let quantity = formContext.getAttribute("scdhhs_quantity").getValue();    
    let furniture = formContext.getAttribute("scdhhs_furniture").getValue();
    let location = formContext.getAttribute("scdhhs_location").getValue();

    let furnitureName = furniture[0].name;    

    debugger;
    processTransferFurnitureOnSave(furnitureName, quantity, location);

}

function processTransferFurnitureOnSave(furnitureName, quantity, location) {

    let fetchXmlQuery = '<fetch><entity name="scdhhs_furniture"><all-attributes/><filter><condition attribute="scdhhs_name" operator="eq" value="' + furnitureName + '"/></filter></entity></fetch>';
        
        if(fetchXmlQuery != null)
        {
            let globalContext = parent.Xrm.Utility.getGlobalContext();
    
            let req = new XMLHttpRequest();  
            req.open(  
            "GET",  
            globalContext.getClientUrl() +  
                "/api/data/v9.2/scdhhs_furnitures?fetchXml=" +  
                encodeURIComponent(fetchXmlQuery),  
            true  
            );  
            req.setRequestHeader("Prefer", 'odata.include-annotations="*"');  
            req.onreadystatechange = function() {  
                
                if (this.readyState === 4) 
                {  
                
                    req.onreadystatechange = null;  
                    
                    if (this.status === 200) 
                    {
                          
                        let results = JSON.parse(this.response);  
    
                        console.log('data', results);

                        debugger;
    
                        if ( results ) 
                        {
    
                            let totalQuantity = results.value[0].scdhhs_quantity;                        

                            if ( totalQuantity )
                            {                                
                                if ( totalQuantity < quantity)
                                {
                                    let backlogQuantity = quantity - totalQuantity;      
                                    
                                    let response = confirm(
                                        "This transfer order cannot be filled because " + 
                                        "we only have " + totalQuantity + " " + furnitureName + " in hand. " + 
                                        "Click 'OK' if you want to fulfill " + totalQuantity + " " + furnitureName + " " + 
                                        "and the other " + backlogQuantity + " " + furnitureName + " " +
                                        "will be added to the backlog. ");

                                    let note = furnitureName + " transfer to " + location + " cannot be filled because " + 
                                        "we only have " + totalQuantity + " " + furnitureName + " in hand. " + 
                                        totalQuantity + " of " + furnitureName + " was fulfilled " + 
                                        "and the other " + backlogQuantity + " " + furnitureName + " " +
                                        "was added to the backlog. ";
                                    
                                    if (response == true) {                                                                            

                                        //add the reminder of the quantity to backlog
                                            let backlog = {
                                                "scdhhs_name" : furnitureName,
                                                "scdhhs_quantity": backlogQuantity,
                                                "scdhhs_description": note     
                                        }
                                            
                                        var backlogid = createRecord("scdhhs_furniturebacklogs", backlog);
                                    }
                                        
                                        
                                }     

                            }
                            
                        }                     
                    } 
                    else {                      
                        alert('Error has occurred: ' + this.responseText);  
                    }  
                }  
            };  
            req.send();   
        }

}


function createRecord(entityPluralName, entityObject) {
    var id = null;
    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.2/" + entityPluralName, false);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.send(JSON.stringify(entityObject));
    if (req.readyState === 4) {
        if (req.status === 204) {
            var uri = req.getResponseHeader("OData-EntityId");
            var regExp = /\(([^)]+)\)/;
            var matches = regExp.exec(uri);
            id = matches[1];
        }
        else {
            var error = JSON.parse(req.response).error;
            Xrm.Utility.alertDialog(error.message);
        }
    }
    return id;
}