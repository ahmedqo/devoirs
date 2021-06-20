var re = /<\$([\s\S]+?)\$>/g,
    valueExp = /<{(.+?)}>/g;

function parse(exp, html, parseAction) {
    var match,
        cursor = 0,
        code = "";
    while (match = exp.exec(html)) {
        code += parseAction(html.slice(cursor, match.index));
        code += parseAction(match[1], true);
        cursor = match.index + match[0].length;
    }
    code += parseAction(html.substr(cursor, html.length - cursor));
    return code;
}

function conditions(line) {
    var data = line.trim().split(" ");
    switch (data[0]) {
        case "if":
        case "for":
        case "switch":
            data.splice(1, 0, "(");
            data.splice(data.length, 0, ") {");
            break;
        case "else":
            data.shift();
            data.splice(data.length, 0, "} else {");
            break;
        case "end":
            data.shift();
            data.splice(data.length, 0, "}");
            break;
        case "assign":
            data.shift();
            data.splice(0, 0, "var");
            data[data.length - 1] = data[data.length - 1] + ";";
            break;
        case "log":
            data.shift();
            data.splice(0, 0, "console.log(");
            data[data.length - 1] = data[data.length - 1] + ");";
            break;
        case "filter":
            const v = data[1],
                f = data[2];
            data.splice(0, 3);
            data = [filter(v, f, data.join(" "))];
            break;
        default:
            return line;
    }
    return data.join(" ");
}

function filter(v, f, c) {
    var res;
    switch (f.toLowerCase().slice(1, -1)) {
        case "upper":
            res = `${v}.toUpperCase();`;
            break;
        case "lower":
            res = `${v}.toLowerCase();`;
            break;
    }
    return `${v} = ${res}`;
}

function addVariable(line, js) {
    var code = "";
    if (js) code = "r.push(" + line + ");";
    else if (line != "") {
        code = "r.push(\"" + line.replace(/"/g, '\\"').replace(/\r\n|\n/g, "") + "\");\n";
    }
    return code;
}

function add(line, js) {
    var code = "";
    if (js) {
        line = conditions(line);
        code += line.replace(/\s+/g, " ") + "\n";
    } else {
        if (line.match(valueExp)) {
            code += parse(valueExp, line, addVariable);
        } else if (line != "") {
            code += "r.push(`" + line.replace(/"/g, '\\"').replace(/\r\n|\n/g, "") + "`);\n";
        }
    }
    return code;
}

async function shape(html) {
    var code = "var r=[]; var __temp;\n";
    html = await include(html);
    code += parse(re, html, add);
    code += 'return r.join("");';
    code = "with(obj || {}){" + code + "}";
    return code;
}

function render(html, data) {
    return new Function("obj", "ctx", html.replace(/[\r\t\n]/g, "")).call(data, data || {});
}

async function include(html) {
    var match, cursor,
        code = [];
    while (match = re.exec(html)) {
        if (match[1].trim().startsWith("extends")) {
            code.push(match)
            cursor = match.index + match[0].length;
        }
    }
    for (var i = 0; i < code.length; i++) {
        var data = await request(code[i][1].replace("extends", "").trim().slice(1, -1));
        html = html.replace(code[i][0], data);
        html = await include(html);
    }
    return html;
}

async function request(page) {
    var req = await fetch(page);
    if (req.status !== 200) return "";
    var res = await req.text();
    return res;
}

function html(data) {
    return async function(html) {
        if (html.length === 1) html = html[0];
        html = await shape(html);
        return render(html, data).replace(/\s\s+/g, ' ');
    }
}

function style(el) {
    return function(code) {
        if (code.length === 1) code = code[0];
        var style = document.createElement("style"),
            re = /{{(.+?)}}/g,
            cursor = 0,
            css = "",
            match;
        while (match = re.exec(code)) {
            css += code.slice(cursor, match.index);
            css += getComputedStyle(el).getPropertyValue(match[1]).replace("{", "").replace("}", "").trim();
            cursor = match.index + match[0].length;
        }
        css += code.substr(cursor, code.length - cursor)
        style.appendChild(document.createTextNode(css));
        return style
    }
}

export { html, style };