var globalContextQuantity = 0;

function fieldOnChange(executionContext)
{    
    let formContext = executionContext.getFormContext();

    let quantity = formContext.getAttribute("scdhhs_quantity").getValue();    
    let supply = formContext.getAttribute("scdhhs_supply").getValue();

    let supplyName = supply[0].name;
    let supplyId = supply[0].id;

    debugger;

    // process request
    processTransferSupplyOnChange(supplyName, quantity, formContext);
    
}

function processTransferSupplyOnChange(supplyName, quantity, formContext) {

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

                    debugger;

                    if ( results ) {

                        let totalQuantity = results.value[0].scdhhs_quantity;                        

                        if ( totalQuantity )
                        {
                            
                            if ( totalQuantity < quantity )
                            {
                                let backlogQuantity = quantity - totalQuantity;
                                                        
                                let response = confirm(
                                    "This transfer order cannot be filled because " + 
                                    "we only have " + totalQuantity + " " + supplyName + " in hand. " + 
                                    "Click 'OK' if you want to fulfill " + totalQuantity + " " + supplyName + " " + 
                                    "and the other " + backlogQuantity + " " + supplyName + " " +
                                    "will be added to the backlog. ");
                                
                                if (response == true) {
                                    
                                    //set quantity to total quantity in hand                                    
                                    globalContextQuantity = quantity;
                                    formContext.getAttribute("scdhhs_quantity").setValue(totalQuantity); 
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