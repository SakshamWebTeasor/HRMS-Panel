import { useState } from "react";

function ReadMoreReadLess(props) {
    const text = props.text
    const limit = props.limit
    const [readMore, setReadMore] = useState(false)
    const toggle = ()=>{
        return setReadMore(!readMore);
    }
    return ( <>{text?<>
        {!readMore? text.substr(0,props.limit):text}
        {text.length>limit&&<button onClick={toggle}>{!readMore?"...Read More":"...Read Less"}</button>}
    </>:<></>
    }
    </> );
}

export default ReadMoreReadLess;