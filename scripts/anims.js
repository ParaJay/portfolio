window.addEventListener("load", () => {
    let el = document.getElementsByClassName("navbar");

    let sheets = document.styleSheets;

    const query = window.location.search;
    const params = new URLSearchParams(query);

    const anim = params.get('anim');

    const disableNavbarAnim = anim == "false" || anim === null || anim === undefined;

    for(let i = 0; i < sheets.length; i++) {
        let sheet = sheets[i];
        let rules = sheet.cssRules;

        for(let j = 0; j < rules.length; j++) {
            let rule = rules[j];
            let name = rule.name;

            if(name == "navbarAnimation") {
                if(disableNavbarAnim) {
                    sheet.deleteRule(j);
                }
            }
        }
    }

    let classes = document.getElementsByClassName("linkedPage");

    for(let i = 0; i < classes.length; i++) {
        let cl = classes[i];

        cl.href = cl.href.split("?")[0] + extractParam("anim");
    }

    function extractParam(param) {
        const query = window.location.search;

        if(query === undefined) {
            return "";
        }

        const params = new URLSearchParams(query);

        const value = params.get(param);

        if(value === null) {
            return "";
        }

        return `?${param}=${value}`;
    }
});