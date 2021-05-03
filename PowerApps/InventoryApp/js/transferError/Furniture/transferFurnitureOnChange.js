var globalContextQuantity = 0;
function fieldOnChange(executionContext)
{   
    let formContext = executionContext.getFormContext();

    let quantity = formContext.getAttribute("scdhhs_quantity").getValue();    
    let furniture = formContext.getAttribute("scdhhs_furniture").getValue();

    let furnitureName = furniture[0].name;
    
    debugger;
    setTotalQuantityInHand(furnitureName, quantity, formContext);
}

function setTotalQuantityInHand(furnitureName, quantity, formContext) {

    
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
                                        "we only have " + totalQuantity + " " + furnitureName + " in hand. " + 
                                        "Click 'OK' if you want to fulfill " + totalQuantity + " " + furnitureName + " " + 
                                        "and the other " + backlogQuantity + " " + furnitureName + " " +
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