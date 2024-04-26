"use strict";
(function () {
    function updateXpBar(xp) {
        const maxXp = 1000;

        let progress = (xp / maxXp) * 100;

        document.getElementById('xp-progress').style.width = progress + '%';
    }

    updateXpBar(100);
})();
