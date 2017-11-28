const location = window.location;


export function objectToQueryString(obj: any) {
    if (obj) {
        var parms = Object.keys(obj).map(function (t) {
            return encodeURIComponent(t) + "=" + encodeURIComponent(obj[t]);
        });

        if (parms.length) {
            return '?' + parms.join("&");
        } else {
            return '';
        }

    } else {
        return '';
    }
}

export class HashUrlQuery {

    constructor(queryString: string) {
        var self = this;

        queryString && queryString.replace(/([^=?#&]*)=([^?#&]*)/g, (t: string, match1: string, match2: string) => {

            (self as any)[decodeURIComponent(match1)] = decodeURIComponent(match2);

            return t;

        });


    }

    toString() {
        return objectToQueryString(this);
    }

}


export function checkedPath(value: string | null) {
    if (!value || value.length < 1) {
        return '/';
    }
    else {
        var val = value.replace(/\s/g, '');

        if (value[0] !== '/') {
            return '/' + val;
        }
        else {
            return val;
        }
    }
}

export class HashUrl {
    _path: string;
    query: any;

    constructor(hashUrl: string | null = null) {

        var self = this;
        let hash: string | null = null;
        if (hashUrl) {
            if (hashUrl.length) {
                if (hashUrl[0] != '#') {
                    hash = '#' + hashUrl;
                } else {
                    hash = hashUrl;
                }
            } else {
                hash = '';
            }
        } else {
            hash = location.hash;
        }

        var path = '/';
        var queryString = '';


        if (hash && hash.length > 1) {
            var qstart = hash.indexOf('?');
            if (qstart > 0) {
                queryString = hash.substring(qstart);
                path = checkedPath(hash.substring(1, qstart));
            } else {
                path = checkedPath(hash.substring(1));
            }
        } else {
            path = checkedPath(hashUrl);
        }

        self._path = path;
        self.query = new HashUrlQuery(queryString);


    }
    set path(value) {
        this._path = checkedPath(value);
    }
    get path() {
        return this._path;
    }

    toString() {
        var self = this;
        var url = '' + self.path + self.query.toString();
        if (url.length > 0) {
            url = '#' + url;
        }
        return url;
    }
}

export default HashUrl;
