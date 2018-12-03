
function getRowBackgroundColor(created)
{    
    var IsGood = Alerts[0].Days;
    var isOk = Alerts[1].Days;
    var isBad = Alerts[2].Days;

    var color = "lightgreen";

    //DATE ROW WAS CREATED
    var dateCreated = moment(created);
    
    //TODAYS DATE
    var dateToday = moment(new Date());
    
    //CALCULATE THE DIFFERENCE IN MINUTES
    var days = dateToday.diff(dateCreated, 'days');
    

    if ( days <= IsGood )
        color = "lightgreen";

    else if ( days > IsGood && days <= isOk )
        color = "yellow";

    else if ( days >= isBad )
        color = "red";
    
    return color;
}

function getRowColor(created)
{

        var color = "black";

        var IsGood = Alerts[0].Days;
        var isOk = Alerts[1].Days;
        var isBad = Alerts[2].Days;
    
        //DATE ROW WAS CREATED
        var dateCreated = moment(created);
        
        //TODAYS DATE
        var dateToday = moment(new Date());
        
        //CALCULATE THE DIFFERENCE IN MINUTES
        var days = dateToday.diff(dateCreated, 'days');
    
        if ( days <= IsGood )
            color = "black";
    
        else if ( days > IsGood && days <= isOk )
            color = "black";
    
        else if ( days >= isBad )
            color = "white";
        
        return color;
}