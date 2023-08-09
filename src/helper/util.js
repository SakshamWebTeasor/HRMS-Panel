function CalculationLate( result ) {

    return ( 
        result.late !== "ONTIME"
          ? Number(result.late.slice(3,5))<=15 && Number(result.late.slice(0,2))<1?<span className="bg-warning text-white late-area">{result.late}</span>:<span className="bg-danger text-white late-area">{result.late}</span>
          : <span className="bg-success text-white late-area">On&#10240;Time</span>
        );
}

function CalculateEarlyLeave(result){
  const {outTime, checkOut} = result
  const date = new Date(outTime)
  const houre = parseInt(date.getHours().toString().padStart(2, '0'))
  const min = parseInt(date.getMinutes().toString().padStart(2, '0'))

  let data;
  if(checkOut){
    let date1 = new Date(checkOut)
    let h = parseInt(date1.getHours().toString().padStart(2, '0'))
    let m = parseInt(date1.getMinutes().toString().padStart(2, '0'))
    if(houre===h){
      if(min<=m){
        data = <span className="bg-success text-white late-area">On&#10240;Time</span>
      }else{
        data = <span className="bg-danger text-white late-area">00:{(min-m).toString().padStart(2, '0')}</span>
      }
    }else{
      //console.log(checkOut, outTime)
      if(houre>h){
        let diff_time = (houre*60+min)-(h*60+m)
        data = <span className="bg-danger text-white late-area">{(Math.floor(diff_time/60)).toString().padStart(2, '0')}:{(diff_time%60).toString().padStart(2, '0')}</span>
      }else{
        data = <span className="bg-success text-white late-area">On&#10240;Time</span>
      }

    }
  }
  return data
}

export {CalculateEarlyLeave}
export default CalculationLate;