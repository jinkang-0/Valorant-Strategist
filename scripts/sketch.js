const moveSpeed = 3;
const zoomMin = 0.75;
const zoomMax = 2;
let mapUnlabeled;
let mapLabeled;
let mapImg;
let imagePos;
let imageOriginalPos;
let mouseOriginalPos;
let zoom = 1;
let zoomRef;

let utils = {};
let selectedUtil;


const settings = {
    "Astra": {
        "utils": ["Nova Pulse", "Nebula", "Gravity Well"],
        "Nova Pulse": false,
        "Nebula": true,
        "Gravity Well": false
    },
    "Brimstone": {
        "utils": ["Incendiary", "Sky Smoke"],
        "Incendiary": false,
        "Sky Smoke": true
    },
    "Cypher": {
        "utils": ["Trapwire", "Cyber Cage", "Spycam"],
        "Trapwire": true,
        "Cyber Cage": false,
        "Spycam": true
    },
    "KAY/O": {
        "utils": ["FRAG/MENT", "ZERO/POINT"],
        "FRAG/MENT": false,
        "ZERO/POINT": true
    },
    "Killjoy": {
        "utils": ["Nanoswarm", "Alarmbot", "Turret"],
        "Nanoswarm": false,
        "Alarmbot": true,
        "Turret": false
    },
    "Sova": {
        "utils": ["Shock Dart", "Recon Bolt"],
        "Shock Dart": false,
        "Recon Bolt": true
    },
    "Viper": {
        "utils": ["Snake Bite", "Poison Cloud", "Toxic Screen"],
        "Snake Bite": true,
        "Poison Cloud": false,
        "Toxic Screen": false
    }
}


function preload() {
    // sova
    utils["Shock Dart"] = loadImage('../../assets/utility/shock_dart.png');
    utils["Recon Bolt"] = loadImage('../../assets/utility/recon_bolt.png');
    // cypher
    utils["Spycam"] = loadImage('../../assets/utility/spycam.png');
    utils["Trapwire"] = loadImage('../../assets/utility/trapwire.png');
    utils["Cyber Cage"] = loadImage('../../assets/utility/cyber_cage.png');
    // brimstone
    utils["Sky Smoke"] = loadImage('../../assets/utility/sky_smoke.png');
    utils["Incendiary"] = loadImage('../../assets/utility/incendiary.png');

    loadMaps();
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    // set default position
    imagePos = createVector(width*0.65, height/2);
    imageOriginalPos = imagePos.copy();
    mouseOriginalPos = createVector(width/2, height/2);

    zoomRef = createVector(width/2, height/2);

    // set image
    mapImg = mapUnlabeled;

    // set modes
    imageMode(CENTER);
}

function draw() {
    background('#1D3246');
    
    push();

    // account for zoom
    translate(zoomRef.x, zoomRef.y);
    scale(zoom);
    translate(-zoomRef.x, -zoomRef.y);

    // draw map
    image(mapImg, imagePos.x, imagePos.y, mapImg.width, mapImg.height);

    // draw util test
    noStroke();
    if (selectedAgent && setups[selectedAgent]) {
        for (let u of setups[selectedAgent]) {
            if (side != u.side || (settings[selectedAgent] && !settings[selectedAgent][u["util"]]))
                continue;

            const x = imagePos.x + u['x'];
            const y = imagePos.y + u['y'];
            fill(0);

            if (u == selectedUtil)
                fill('darkslateblue');

            circle(x, y, 27);
            image(utils[u['util']], x, y, 18, 18);
        }
    }

    pop();
}

// set for drag
function mousePressed() {
    mouseOriginalPos.set(mouseX, mouseY);
}

// drag event to move map
function mouseDragged() {
    const mousePos = createVector(mouseX, mouseY);
    const diff = p5.Vector.sub(mousePos, mouseOriginalPos).div(zoom*1.25);
    imagePos.set( p5.Vector.add(imageOriginalPos, diff) );
    imagePos.x = constrain(imagePos.x, 0, width);
    imagePos.y = constrain(imagePos.y, 0, height);
}

// set map center
function mouseReleased() {
    if (imageOriginalPos.x == imagePos.x && imageOriginalPos.y == imagePos.y) {
        selectedUtil = undefined;
        utilGuide.classList.add('hidden');
    }

    if (selectedAgent && setups[selectedAgent]) {
        let recordDist = 100000;
        let recordUtil;

        // find closest util
        for (let u of setups[selectedAgent]) {
            if (side != u.side || (settings[selectedAgent] && !settings[selectedAgent][u["util"]]))
                continue;
            const [x, y] = relativeToGlobal(imagePos.x + u['x'], imagePos.y + u['y']);
            const d = dist(x, y, mouseX, mouseY);
            if (d < recordDist) {
                recordDist = d;
                recordUtil = u;
            }
        }

        // print util
        if (recordDist < 15*zoom) {
            // print(recordUtil['x'], recordUtil['y']);
            selectedUtil = recordUtil;
            utilGuide.classList.remove('hidden');
            switchImage(selectedUtil['guide']);

            // if there are alternative locations
            if (selectedUtil['alternatives']) {
                // update radio buttons
                removeAllChildNodes(guideSelect);
                for (let i = 0; i < selectedUtil['alternatives'].length + 1; i++) {
                    let radio = (i == 0)? makeGuideSelector(selectedUtil['guide']) : makeGuideSelector(selectedUtil['alternatives'][i-1]);
                    guideSelect.appendChild(radio);
                }
                guideSelect.firstChild.checked = true;

                // show selection menu 
                guideSelect.classList.remove('hidden');
            } else {
                // otherwise, hide selection menu
                guideSelect.classList.add('hidden');
            }
        }
    }

    imageOriginalPos.set(imagePos.copy());
}

// scroll event for zoom
function mouseWheel(e) {
    // offset for mouse
    if (zoom > zoomMin && zoom < zoomMax) {
        zoomRef.set(mouseX, mouseY);
    }
    // zoom
    zoom += -e.delta*0.001;
    zoom = constrain(zoom, zoomMin, zoomMax);
}




//
//  tools
//



// translate zoom relative coords to global coords 
function relativeToGlobal(x, y) {
    const ax = zoomRef.x - zoomRef.x*zoom + x*zoom;
    const ay = zoomRef.y - zoomRef.y*zoom + y*zoom;
    return [ax, ay];
}



