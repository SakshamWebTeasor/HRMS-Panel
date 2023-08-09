import { useEffect, useState } from "react";

function Watch() {
    const [value, setValue] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
        clearInterval(interval);
        };
    }, []);
    return  <span>{value.toLocaleTimeString()}</span>
}

function CalculateRealTimePresence(data) {
    const [value1, setValue1] = useState("00:00");
    useEffect(() => {
        const interval1 = setInterval(() => {
        if (data.outTime) {
            return setValue1(data.duration?data.duration:data.effective);
        }
        if (data.inTime) {
            //check in time
            let intime_h = new Date(data.inTime).getHours()
            let intime_m = new Date(data.inTime).getMinutes()
            let intime_in_minutes=0

            //current time 
            let current_h = new Date().getHours();
            let current_m = new Date().getMinutes();
            let current_in_minutes = current_h * 60 + current_m;

            let diff_min
            if(current_h>=intime_h){
                intime_in_minutes = intime_h * 60 + intime_m;
                diff_min = (current_in_minutes - intime_in_minutes);
            }else{
                if((60 - intime_m) === 0){
                    intime_in_minutes = (24-intime_h) * 60
                }else{
                    intime_in_minutes = (24-intime_h-1) * 60 + (60 - intime_m)
                }
                diff_min = (current_in_minutes + intime_in_minutes);
            }

            
           
            let duration_hours = `${(parseInt(diff_min / 60).toString().padStart(2, '0'))}:${
            diff_min % 60 <= 9
                ? `${(Math.round(diff_min % 60)).toString().padStart(2, '0')}`
                : `${diff_min % 60}`
            }`;
            
            return setValue1(duration_hours);
        }
        }, 1000);
        return () => {
        clearInterval(interval1);
        };
    }, [data]);

    return <span>{value1}</span>
}

export {CalculateRealTimePresence};
export default Watch;