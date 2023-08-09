import React from "react";
import './index.css'; 

function Footer() {
    return (<>
        <footer>
            <div className="footer">
                <div className="row">
                    <div className="col-12">
                        <div className="footer-text">
                            <h4>Copyright © {new Date().getFullYear()} Webteasor. Designed and Developed by Webteasor</h4>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>);
}

export default Footer;