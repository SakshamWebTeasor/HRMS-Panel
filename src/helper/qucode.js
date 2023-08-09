import { useEffect, useState } from "react";
import { QRCode } from 'react-qrcode-logo';
import qrlogo from '../assets/images/qrlogo.png';
function Qrcode(props) {
    const user = props.current_user;
    const [date, setDate] = useState(Date.now())
   useEffect(() => {
    const interval = setInterval(() => setDate(Date.now()), 300000);
    return () => {
      clearInterval(interval);
    };
  }, []);
    return ( 
      <div className="p-2">
        <QRCode 
            value={user._id+"-"+date} 
            size={150}
            qrStyle={{ height: "auto", maxWidth: "60%", width: "60%" }}
            logoImage={qrlogo}
            logoWidth={40*2}
            logoHeight={40*2}
            viewBox={`0 0 256 256`}
        />
      </div>
    );
}

export default Qrcode;