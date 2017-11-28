import { HashUrl as SourceHashUrl, HashUrlQuery } from './hash-url';


const location = window.location;


export const HashUrl = SourceHashUrl;

export interface HashRoute {
    path: string;
    action: (query: HashUrlQuery) => void;
}

export interface HashRouterOptions {
    routes?: Array<HashRoute>;
    notfound?: (query: HashUrlQuery) => void;
}

export class HashRouter {
    options: HashRouterOptions;
    hashUrl: SourceHashUrl;
    constructor(options: HashRouterOptions) {
        if (!options) {
            throw new Error("options is null");
        }
        var self = this;
        self.options = options;
        self.hashUrl = new HashUrl();
    }
    onHashChanged() {
        this.hashUrl = new HashUrl();

        var path = this.hashUrl.path;

        if (this.options.routes) {
            for (var i in this.options.routes) {
                let route = this.options.routes[i];
                if (route.path === path) {
                    route.action && route.action(this.hashUrl.query);
                    return;
                }
            }
        }

        this.options.notfound && this.options.notfound(this.hashUrl);
    }
    init(defaultPath: string) {
        var self = this;
        var listen = this.onHashChanged.bind(self);
        window.addEventListener("hashchange", listen);
        if (!location.hash || location.hash.length < 2) {
            var defaultUrl = new HashUrl(defaultPath);
            location.hash = defaultUrl.toString();
        } else {
            listen();
        }
    }
}



