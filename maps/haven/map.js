function loadMaps() {
    mapUnlabeled = loadImage('../../assets/maps/haven_map.png')
    mapLabeled = loadImage('../../assets/maps/haven_map_labeled.png');
}

const setups = {
    "Sova": [
        {
            "util": "Recon Bolt",
            "side": "Defending",
            "x": 110,
            "y": 178,
            "guide": "../../assets/guides/Sova/Haven/A_Lobby_From_A_Tunnel.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Defending",
            "x": 340,
            "y": -45,
            "guide": "../../assets/guides/Sova/Haven/A_Site_From_A_Link.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Defending",
            "x": 0,
            "y": 150,
            "guide": "../../assets/guides/Sova/Haven/Window_From_B_Site.png",
            "alternatives": [
                "../../assets/guides/Sova/Haven/Window_From_Gong.png"
            ]
        },
        {
            "util": "Recon Bolt",
            "side": "Defending",
            "x": -240,
            "y": 297,
            "guide": "../../assets/guides/Sova/Haven/C_Lobby_From_C_Site.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Defending",
            "x": -275,
            "y": 195,
            "guide": "../../assets/guides/Sova/Haven/C_Long_From_C_Site.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Defending",
            "x": -95,
            "y": 160,
            "guide": "../../assets/guides/Sova/Haven/Mid_From_C_Link.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Defending",
            "x": -50,
            "y": 280,
            "guide": "../../assets/guides/Sova/Haven/Attacker_Spawn_From_C_Site.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Defending",
            "x": -410,
            "y": -55,
            "guide": "../../assets/guides/Sova/Haven/C_Site_From_C_Link.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Defending",
            "x": 30,
            "y": 280,
            "guide": "../../assets/guides/Sova/Haven/Garden_From_A_Site.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Attacking",
            "x": 380,
            "y": -180,
            "guide": "../../assets/guides/Sova/Haven/A_Heaven_From_Garden.png",
            "alternatives": [
                "../../assets/guides/Sova/Haven/A_Heaven_From_A_Long.png"
            ]
        },
        {
            "util": "Recon Bolt",
            "side": "Attacking",
            "x": -140,
            "y": -20,
            "guide": "../../assets/guides/Sova/Haven/Garage_From_Spawn.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Attacking",
            "x": 0,
            "y": -40,
            "guide": "../../assets/guides/Sova/Haven/B_Site_From_Garden.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Attacking",
            "x": -320,
            "y": -195,
            "guide": "../../assets/guides/Sova/Haven/C_Back_From_C_Lobby.png"
        },
        {
            "util": "Recon Bolt",
            "side": "Attacking",
            "x": -405,
            "y": -115,
            "guide": "../../assets/guides/Sova/Haven/C_Plat_From_C_Lobby.png"
        }
    ]
}

