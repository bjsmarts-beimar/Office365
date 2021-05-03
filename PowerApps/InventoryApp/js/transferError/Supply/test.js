function displayQuantity(executionContext)
{    
    let formContext = executionContext.getFormContext();

    let quantity = formContext.getAttribute("scdhhs_quantity").getValue();    
    let supply = formContext.getAttribute("scdhhs_supply").getValue();

    let supplyName = supply[0].name;
    let supplyId = supply[0].id;

    // process request
    getTotalQuantityInHand(removeCurlyBraces(supplyId), supplyName, quantity, formContext);
    
}

function getTotalQuantityInHand(supplyId, supplyName, quantity, formContext) {

    let fetchXmlQuery = '<fetch><entity name="scdhhs_supply"><all-attributes/><filter><condition attribute="scdhhs_name" operator="eq" value="' + supplyName + '"/></filter></entity></fetch>';
    
    if(fetchXmlQuery != null)
    {
        let globalContext = parent.Xrm.Utility.getGlobalContext();

        let req = new XMLHttpRequest();  
        req.open(  
        "GET",  
        globalContext.getClientUrl() +  
            "/api/data/v9.2/scdhhs_supplies?fetchXml=" +  
            encodeURIComponent(fetchXmlQuery),  
        true  
        );  
        req.setRequestHeader("Prefer", 'odata.include-annotations="*"');  
        req.onreadystatechange = function() {  
            
            if (this.readyState === 4) {  
            
                req.onreadystatechange = null;  
                
                if (this.status === 200) {
                      
                    let results = JSON.parse(this.response);  

                    console.log('data', results);

                    if ( results ) {

                        let totalQuantity = results.value[0].scdhhs_quantity;                        

                        if ( totalQuantity )
                        {
                            
                            if ( totalQuantity < quantity )
                            {
                                let backlogQuantity = quantity - totalQuantity;
                                                        
                                let response = confirm(
                                    "This transfer order cannot be filled because " + 
                                    "we only have " + totalQuantity + " " + supplyName + " in hands. " + 
                                    "Click 'OK' if you want to fill " + totalQuantity + " " + supplyName + " " + 
                                    "and the other " + backlogQuantity + " " + supplyName + " " +
                                    "will be added to the backlog. ");
                                
                                if (response == true) {
                                    
                                    //set quantity to total quantity in hand
                                    formContext.getAttribute("scdhhs_quantity").setValue(totalQuantity); 

                                    
                                    //add the reminder of the quantity to backlog
                                    let backlog = {
                                        "scdhhs_name" : supplyName,
                                        "scdhhs_quantity": backlogQuantity 
                                    }
                                    
                                    var backlogid = createRecord("scdhhs_supplybacklogs", backlog);
                                    alert('backlog record was created successfully');
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

function removeCurlyBraces(supplyId) {
    return supplyId.slice(1, -1);
}