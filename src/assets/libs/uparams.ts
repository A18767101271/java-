const e = RegExp.prototype.test.bind(/^(?:toString|valueOf)$/);

function UParamsConstor(n?: any) {
    if (!(this instanceof UParams)) return new UParams(n);
    n || (n = location.search + location.hash);
    let r = this;
    switch (typeof n) {
        case "object":
            for (let o in n) e(o) || (r[o] = n[o] + "");
            break;
        case "string":
            n.replace(/([^=?#&]*)=([^?#&]*)/g,
                function (_, n, o) {
                    e(n) || (r[decodeURIComponent(n)] = decodeURIComponent(o))
                });
            break;
    }

    return r;
}

class UParams {
    constructor(n?: any) {
        return UParamsConstor.call(this, n);
    }

    toString() {
        var e = this;
        return Object.keys(e).map(function (t) {
            return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
        }).join("&");
    }
}



export default UParamsConstor;