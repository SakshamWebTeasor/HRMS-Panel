function TitleCase(props) {
    var str = props.text?props.text:"";
    if(typeof str == "number") {
        str = str.toString();
    }
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase()+splitStr[i].substring(1);
    }
    str = splitStr.join(" ");  
    return str;
}

export default TitleCase;