import banoLog from '../../assets/images/logo.png';
import Spinner from 'react-bootstrap/Spinner';
import './index.css';

function Loader(){
    return (<>
            <div className="loader">
                <img src={banoLog} alt="banoLog"/><br/><br/>
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
            </div>
    </>)
}

export default Loader;