import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        headers: Object,
        data: Object,
        url: String,
        method: String,
        type: String,
        mode: String,
    }

    render() {
        return /*html*/ `
            <slot></slot>
        `;
    }

    submit() {
        var data = __values__(this);
        XOEvent({
            name: "submit",
            target: self,
            detail: {
                data: data,
            },
            callback: e => {
                __submit__(this, data);
            }
        })
    }
}

function __values__(self) {
    var items = Array.from(self.getElementsByTagName('*')),
        data = self.data || {},
        formdata = new FormData(),
        result = [];
    Object.keys(data).forEach(k => {
        formdata.append(k, data[k]);
    })
    items.forEach(item => {
        if (
            item.parentElement.tagName !== "XO-SWITCH-GROUP" &&
            item.parentElement.tagName !== "XO-SELECT" &&
            ("value" in item || "files" in item) &&
            !item.matches("[blocked]")
        ) {
            result.concat(__empty__(self, item), __valid__(self, item));
            __data__(item, formdata);
        }
    });
    XOEvent({
        name: "validform",
        target: self,
        detail: {
            isValid: !result.includes(false)
        }
    })
    return formdata;
}

async function __submit__(self, data) {
    var url, method, headers, type;
    __entry__(self)
    method = self.method || "GET";
    type = self.type || "text";
    headers = headers || {};
    data = data || {};
    var [options, url] = __method__(method, self.url, data);
    options.method = method.toUpperCase()
    options.headers = new Headers(headers)
    if (self.mode) options.mode = self.mode;
    fetch(url, options).then(response => {
        response[__getType__(type)]().then(result => {
            __success__(self, response, result, __getType__(type));
        }).catch(error => {
            __error__(self, error, __getType__(type))
        })
    }).catch(error => {
        __error__(self, error, __getType__(type))
    })
}

function __success__(self, response, result, type) {
    XOEvent({
        name: "success",
        target: self,
        detail: {
            result: result,
            response: response,
            type: type,
        }
    })
}

function __error__(self, error, type) {
    XOEvent({
        name: "error",
        target: self,
        detail: {
            error: error,
            type: type,
        }
    })
}

function __empty__(self, item) {
    var result = [];
    if (
        (typeof item.value === "string" && item.value.trim() === "") ||
        ("files" in item && Object.keys(item.files).length === 0) ||
        item.value === undefined ||
        item.value === null
    ) {
        result.push(false);
        XOEvent({
            name: "invalidfield",
            target: self,
            detail: {
                item: item
            }
        })
    }
    return result;
}

function __valid__(self, item) {
    var result = [];
    if (
        (typeof item.value === "string" && item.value.trim() !== "") ||
        ("files" in item && Object.keys(item.files).length !== 0) ||
        item.value !== undefined ||
        item.value !== null
    ) {
        result.push(true);
        XOEvent({
            name: "validfield",
            target: self,
            detail: {
                item: item
            }
        })
    }
    return result;
}

function __data__(item, formdata) {
    if ("files" in item) {
        if (item.matches("[multiple]")) {
            if (Object.keys(item.files).length === 0) {
                formdata.append(item.getAttribute("name"), undefined);
            } else {
                Object.keys(item.files).forEach(k => {
                    formdata.append(item.getAttribute("name"), item.files[k]);
                });
            }
        } else {
            formdata.append(item.getAttribute("name"), item.files[0]);
        }
    } else {
        formdata.append(item.getAttribute("name"), item.value);
    }
}

function __method__(method, url, data) {
    var options = {};
    if (method) {
        switch (method.toUpperCase()) {
            case "POST":
                options.body = data;
                break;
            case "PUT":
                options.body = __toObjsect__(data);
                break;
            default:
                url = url + `?${__toParams__(data)}`;
        }
    }
    return [options, url];
}

function __entry__(self) {
    const methods = ["POST", "GET", "PUT", "DELETE"];

    if (self.method && !methods.includes(self.method.toUpperCase())) {
        throw new Error("method must be one of " + methods.join(", "));
    }

    if (self.type && !__getType__(self.type)) {
        throw new Error("type must be one of arraybuffer, blob, clone, formdata, json, text");
    }

    if (!self.url) {
        throw new Error("url is required");
    }
}

function __toObjsect__(fd) {
    if (fd instanceof FormData) {
        var object = {};
        fd.forEach(function(value, key) {
            object[key] = value;
        });
        return JSON.stringify(object);
    }
    return JSON.stringify(fd);;
}

function __toParams__(fd) {
    var str = [];
    fd = JSON.parse(__toObjsect__(fd));
    for (var key in fd) {
        str.push(key + "=" + fd[key]);
    }
    return str.join("&")
}

function __getType__(type) {
    var types = {
        arraybuffer: "arrayBuffer",
        blob: "blob",
        clone: "clone",
        formdata: "formData",
        json: "json",
        text: "text"
    }
    if (Object.keys(types).includes(type.toLowerCase())) return types[type.toLowerCase()];
    else return false;
}

function XOEvent({ name, target, detail, callback }) {
    const event = new CustomEvent(name, {
        bubbles: true,
        cancelable: true,
        composed: true,
        isTrusted: true,
        detail: detail
    });
    target.dispatchEvent(event);
    if (!event.defaultPrevented && callback) {
        callback(event)
    }
}