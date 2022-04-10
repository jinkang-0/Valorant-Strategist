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
const utilGuide = document.querySelector('.util-guide');




