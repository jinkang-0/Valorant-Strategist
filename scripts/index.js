// listen for label check
const labelBox = document.getElementById('label');
labelBox.addEventListener('change', () => {
    if (labelBox.checked)
        mapImg = mapLabeled;
    else
        mapImg = mapUnlabeled;
});

// listen for buttons
const attackButton = document.getElementById('attacking');
const defendButton = document.getElementById('defending');
let side = "Attacking";
attackButton.addEventListener('click', () => {
    if (!attackButton.classList.contains('selected')) {
        attackButton.classList.add('selected');
        defendButton.classList.remove('selected');
        side = 'Attacking';
        selectedUtil = undefined;
    }
})
defendButton.addEventListener('click', () => {
    if (!defendButton.classList.contains('selected')) {
        defendButton.classList.add('selected');
        attackButton.classList.remove('selected');
        side = 'Defending';
        selectedUtil = undefined;
    }
})

// get util settings
const utilBoxes = document.querySelectorAll('.util');

// listen for agent select
const agents = document.querySelectorAll('.agent');
let selectedAgent;
for (let a of agents) {
    a.addEventListener('click', () => {
        for (let b of agents) {
            b.classList.remove('selected');
        }

        utilBoxes.forEach(u => {
            u.classList.add('hidden');
            u.lastChild.removeEventListener('click', () => {});
        });

        // if already selected, unselect
        if (selectedAgent == a.lastChild.innerHTML) {
            selectedAgent = undefined;
            selectedUtil = undefined;
            return;
        }

        // mark select
        a.classList.add('selected');
        selectedAgent = a.lastChild.innerHTML;

        // set corresponding util settings
        if (settings[selectedAgent]) {
            for (let i = 0; i < settings[selectedAgent]["utils"].length; i++) {
                const utilName = settings[selectedAgent]["utils"][i];
                utilBoxes.item(i).classList.remove('hidden');
                utilBoxes.item(i).lastChild.innerHTML = utilName;
                utilBoxes.item(i).firstChild.checked = settings[selectedAgent][utilName];
                utilBoxes.item(i).firstChild.addEventListener('click', () => {
                    settings[selectedAgent][utilName] = utilBoxes.item(i).firstChild.checked;
                })
            }
        }
    });
}

// util guide box
const utilGuide = document.querySelector('.util-guides');
const guideSelect = document.querySelector('.guide-select');
const guidesBox = document.querySelector('.guide-box');
let displayingGuide = false;
let guideDisplayed = 1;

function switchImage(path) {
    if (displayingGuide) {
        if (guideDisplayed == 1) {
            guidesBox.firstChild.classList.add('hidden');
            guidesBox.lastChild.classList.remove('hidden');
            guidesBox.firstChild.src = "";
            guidesBox.lastChild.src = path;
            guideDisplayed = !guideDisplayed;
        } else {
            guidesBox.firstChild.classList.remove('hidden');
            guidesBox.lastChild.classList.add('hidden');
            guidesBox.firstChild.src = path;
            guidesBox.lastChild.src = "";
            guideDisplayed = !guideDisplayed;
        }
    } else {
        guidesBox.firstChild.classList.remove('hidden');
        guidesBox.firstChild.src = path;
        displayingGuide = true;
    }
}

function makeGuideSelector(path) {
    const radio = document.createElement('input');
    radio.type = "radio";
    radio.name = "guide";
    radio.addEventListener('click', () => {
        utilGuide.classList.remove('hidden');
        switchImage(path);
    });
    return radio;
}


// remove all child nodes of a HTML node
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

