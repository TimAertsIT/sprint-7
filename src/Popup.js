import { useState } from "react";

function Popup( {text} ) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div style={{display: "inline-block"}}>
            <button style={{
                backgroundColor: "grey",
                border: "none", 
                borderRadius: "200px", 
            }} onClick={() => setShowPopup(true)}>i</button>
            {showPopup && (
            <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",}}
            onClick={() => setShowPopup(false)}>
                <div style={{
                    backgroundColor: "white",
                    border: "solid black 5px",
                    borderRadius: "200px",
                    padding: "20px",
                    }}
                    >
                        <p>{text}</p>
                        </div>
            </div>
            )}
            </div>
    );
                }
                export default Popup;