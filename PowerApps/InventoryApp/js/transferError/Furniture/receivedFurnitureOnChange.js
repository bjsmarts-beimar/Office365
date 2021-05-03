function fieldOnChange(executionContext)
{   
    let formContext = executionContext.getFormContext();

    let quantity = formContext.getAttribute("scdhhs_quantity").getValue();    
    let furniture = formContext.getAttribute("scdhhs_furniture").getValue();

    let furnitureName = furniture[0].name;
    
    debugger;
    processOnChangeReceived(furnitureName, quantity, formContext);
}

function processOnChangeReceived(furnitureName, quantity, formContext) {

    let fetchXmlQuery = '<fetch><entity name="scdhhs_furniturebacklog"><all-attributes/><filter type="and"><condition attribute="scdhhs_name" operator="eq" value="' + furnitureName + '"/><condition attribute="scdhhs_status" operator="eq" value="238190000"/></filter></entity></fetch>';
    
    if(fetchXmlQuery != null)
    {
        let globalContext = parent.Xrm.Utility.getGlobalContext();

        let req = new XMLHttpRequest();  
        req.open(  
        "GET",  
        globalContext.getClientUrl() +  
            "/api/data/v9.2/scdhhs_furniturebacklogs?fetchXml=" +  
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

                    debugger;
                    if ( results ) {

                        let backlogQuantity = results.value[0].scdhhs_quantity;                                  
                        let status = results.value[0].scdhhs_status;

                        if ( backlogQuantity )
                        {                            
                            if ( backlogQuantity > 0 )
                            {

                                if ( status === 238190000 )
                                {
                                    let actualQuantity = quantity - backlogQuantity;
                                                        
                                    let response = confirm(
                                        furnitureName + " has a back order of " + backlogQuantity + " items that have not yet been shipped out to the customer." +
                                        "Go ahead and ship out this back order." +
                                        "The system will adjust the total number of " + furnitureName + " in hand." 
                                        );                                                                 

                                    if (response == true) {
                                        
                                        //set quantity to total quantity in hand
                                        debugger;
                                        globalContextQuantity = actualQuantity;
                                        formContext.getAttribute("scdhhs_quantity").setValue(actualQuantity); 
                                    }
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