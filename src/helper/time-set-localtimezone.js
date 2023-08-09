function LocalTimeZone(arg) {
    const {time} = arg
    const date = new Date(time)
    const val = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    return val
}
function LocaDateFormate(arg){
    const { date_arg } = arg
    let date = new Date(date_arg);
    
    let date_formated = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    return date_formated
}
function GetLocalTime(arg){
    const {date_arg} = arg
   return  new Date(date_arg).toLocaleString().split(',')[1]
}
export { LocaDateFormate, GetLocalTime }
export default LocalTimeZone;