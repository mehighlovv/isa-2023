export function GreaterThan(date1: Date,date2: Date) : boolean{
    if(date1.getHours()>date2.getHours()){
        return true;
    }
    else if(date1.getHours()==date2.getHours())
    {
        if(date1.getMinutes()> date2.getMinutes()){
            return true;
        }
        else if(date1.getMinutes()==date2.getMinutes()){
            if(date1.getSeconds()>date2.getSeconds()){
                return true;
            }
        }
    }
    return false;
}

export function GreaterThanOrEqual(date1: Date,date2: Date) : boolean{
    if(date1.getHours()>date2.getHours()){
        return true;
    }
    else if(date1.getHours()==date2.getHours())
    {
        if(date1.getMinutes()> date2.getMinutes()){
            return true;
        }
        else if(date1.getMinutes()==date2.getMinutes()){
            if(date1.getSeconds()>=date2.getSeconds()){
                return true;
            }
        }
    }
    return false;
}

export function LessThan(date1: Date,date2: Date) : boolean{
    if(date1.getHours()<date2.getHours()){
        return true;
    }
    else if(date1.getHours()==date2.getHours())
    {
        if(date1.getMinutes()<date2.getMinutes()){
            return true;
        }
        else if(date1.getMinutes()==date2.getMinutes()){
            if(date1.getSeconds()<date2.getSeconds()){
                return true;
            }
        }
    }
    return false;
}

export function LessThanOrEqual(date1: Date,date2: Date) : boolean{
    if(date1.getHours()<date2.getHours()){
        return true;
    }
    else if(date1.getHours()==date2.getHours())
    {
        if(date1.getMinutes()<date2.getMinutes()){
            return true;
        }
        else if(date1.getMinutes()==date2.getMinutes()){
            if(date1.getSeconds()<=date2.getSeconds()){
                return true;
            }
        }
    }
    return false;
}