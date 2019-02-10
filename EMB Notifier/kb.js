function checkKey(event)
{
    if(alertison)
    {
        if(event.keyCode == 13)//enter
        {
            closeAlert();
        }
    }
}