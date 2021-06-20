export default class {
    constructor() {
        this.notFound = null;
        this.target = null;
        this.routes = null;
        this.redo = null;
        this.pop = null;
    }

    init() {
        if (!location.hash) location.hash = "#/"
        window.addEventListener("popstate", () => {
            if (typeof this.pop === "function") this.pop()
            this.run();
        });
    }

    async run() {
        this.target.innerHTML = "";
        this.target.style.transform = "translateY(100px)";
        document.body.insertAdjacentHTML("beforeend", `<xo-loader id="XOSpaGlobalLoader" theme='night' global></xo-loader>`);
        const potentialMatches = this.routes.map((route) => {
            return {
                route: route,
                result: location.hash.substring(1).match(this.getPath(route.path)),
            };
        });
        let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);
        if (!match) {
            match = {
                route: this.notFound,
                result: [location.hash.substring(1)],
            };
        }
        const view = new match.route.view(this.getParams(match));
        this.target.innerHTML = await view.render();
        if (typeof match.route.callback === "function") match.route.callback();
        if (typeof this.redo === "function") this.redo();
        this.target.style.transition = "transform 200ms ease-in-out";
        this.target.style.transform = "translateY(0)";
        document.querySelector("xo-loader#XOSpaGlobalLoader").remove()
        setTimeout(() => {
            this.target.style.transition = "";
            this.target.style.transform = "";
        }, 100);
    }

    getPath(path) {
        return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
    }

    getParams(match) {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

        return Object.fromEntries(
            keys.map((key, i) => {
                return [key, values[i]];
            })
        );
    }

    send(url) {
        var path = location.origin;
        url = url.replace(path, "");
        url = location.origin + location.pathname + "#" + url;
        history.pushState(null, null, url);
        this.run();
    }
}

window.require = async({ name, path }) => {
    if (!customElements.get(name)) {
        const Element = await (await
            import (`./XO.Components/${path}.js`)).default;
        customElements.define(name, Element);
    }
}

require({ name: "xo-app", path: "XO.Container" });
require({ name: "xo-loader", path: "XO.Loader" });