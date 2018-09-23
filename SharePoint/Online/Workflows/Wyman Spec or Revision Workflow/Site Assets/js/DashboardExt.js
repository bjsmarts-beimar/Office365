

function getRowBackgroundColor(created)
{
    var color = "lightgreen";

    //DATE ROW WAS CREATED
    var dateCreated = moment(created);
    
    //TODAYS DATE
    var dateToday = moment(new Date());
    
    //CALCULATE THE DIFFERENCE IN MINUTES
    var days = dateToday.diff(dateCreated, 'days');

    if ( days < 2 )
        color = "lightgreen";

    if ( days >= 2 && days <= 3 )
        color = "yellow";

    if ( days > 3 )
        color = "red";
    
    return color;
}

function getRowColor(created)
{
        var color = "black";
    
        //DATE ROW WAS CREATED
        var dateCreated = moment(created);
        
        //TODAYS DATE
        var dateToday = moment(new Date());
        
        //CALCULATE THE DIFFERENCE IN MINUTES
        var days = dateToday.diff(dateCreated, 'days');
    
        if ( days < 2 )
            color = "black";
    
        if ( days >= 2 && days <= 3 )
            color = "black";
    
        if ( days > 3 )
            color = "white";
        
        return color;
}