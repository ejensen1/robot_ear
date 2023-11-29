import './Popup.css';
import React from 'react';
import {useState} from 'react';


export default function Popup(props){
    // const [email, setEmail] = useState<string>("");
    // const [password, setPassword] = useState<string>("");
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className = "close-btn" onClick={() => props.setTrigger(false)}
                >close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}