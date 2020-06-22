import React from "react"
import logo from "./logo.png";
import './Landing.css';
function Landing() {
    return (
        <div>
            <header class="showcase">
                <div class="showcase-top">
                    <img src={logo} alt="Logo"/>
                    <a herf="#" class = "btn btn-rounded">Sign In</a>
                </div>
                <div class= "showcase-content">
                    <h1>catch phase la la la</h1>
                    <p>A catapult is a ballistic device used to launch a projectile a great distance without the aid of gunpowder or other propellants.</p>
                    <a href="#" class="btn btn-xl"
                        >Sign up for free <i class="fas fa-chevron-right btn-icon"></i
                    ></a>
                </div>
            </header>
            <p>this is footer idk what to put here pls help</p>
        </div>
    )
}

export default Landing;