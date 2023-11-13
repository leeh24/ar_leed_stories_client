import React from "react";
import Header from "../components/Header";
import "@google/model-viewer/dist/model-viewer";

export default function LEEDStories() {
    return (
        <>
            <Header />
                <body>
                    <div class="row">
                    <div id="card">
                    <model-viewer src="./model/gladiador.glb"
                  ios-src="./model/gladiador.usdz"
                  poster="./model/gladiador.png"
                  alt="A 3D model of an Gladiador"
                  shadow-intensity="1"
                  ar-scale="fixed"
                  camera-controls
                  auto-rotate ar>
    </model-viewer>
                <section class="attribution">
                    <span>
                        <h1>Example 1</h1>
                        <span>Brief Description <a href="https://sketchfab.com/3d-models/gladiador-874fc7e11d674f51a4dc2082d29c9b9a" target="_blank">Link to Story</a></span>
                        <br></br>
                    </span>
                    </section>  
                </div>
            </div>
            
            <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
            
            </body>
        </>
    );
}