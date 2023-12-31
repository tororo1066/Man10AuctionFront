let obfuscators: number[] = [];
const styleMap: { [key: string]: string } = {
    '§4': 'font-weight:normal;text-decoration:none;color:#be0000',
    '§c': 'font-weight:normal;text-decoration:none;color:#fe3f3f',
    '§6': 'font-weight:normal;text-decoration:none;color:#d9a334',
    '§e': 'font-weight:normal;text-decoration:none;color:#fefe3f',
    '§2': 'font-weight:normal;text-decoration:none;color:#00be00',
    '§a': 'font-weight:normal;text-decoration:none;color:#3ffe3f',
    '§b': 'font-weight:normal;text-decoration:none;color:#3ffefe',
    '§3': 'font-weight:normal;text-decoration:none;color:#00bebe',
    '§1': 'font-weight:normal;text-decoration:none;color:#0000be',
    '§9': 'font-weight:normal;text-decoration:none;color:#3f3ffe',
    '§d': 'font-weight:normal;text-decoration:none;color:#fe3ffe',
    '§5': 'font-weight:normal;text-decoration:none;color:#be00be',
    '§f': 'font-weight:normal;text-decoration:none;color:#ffffff',
    '§7': 'font-weight:normal;text-decoration:none;color:#bebebe',
    '§8': 'font-weight:normal;text-decoration:none;color:#3f3f3f',
    '§0': 'font-weight:normal;text-decoration:none;color:#000000',
    '§l': 'font-weight:bold',
    '§n': 'text-decoration:underline;text-decoration-skip:spaces',
    '§o': 'font-style:italic',
    '§m': 'text-decoration:line-through;text-decoration-skip:spaces',
};

function obfuscate(string: string, elem: HTMLElement) {
    let magicSpan: HTMLElement | null;
    let currNode: Node;
    const len = elem.childNodes.length;

    if (string.indexOf('<br>') > -1) {
        elem.innerHTML = string;
        for (let j = 0; j < len; j++) {
            currNode = elem.childNodes[j];
            if (currNode.nodeType === Node.TEXT_NODE) {
                magicSpan = document.createElement('span');
                magicSpan.innerHTML = currNode.nodeValue || '';
                elem.replaceChild(magicSpan, currNode);
                init(magicSpan);
            }
        }
    } else {
        init(elem, string);
    }

    function init(el: HTMLElement, str?: string) {
        let i = 0;
        let obsStr = str || el.innerHTML;
        const obsLen = obsStr.length;

        obfuscators.push(window.setInterval(function () {
            if (i >= obsLen) i = 0;
            obsStr = replaceRand(obsStr, i);
            el.innerHTML = obsStr;
            i++;
        }, 0));
    }

    function randInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function replaceRand(string: string, i: number) {
        const randChar = String.fromCharCode(randInt(64, 90)); /* Numbers: 48-57 Al: 64-90 */
        return string.substr(0, i) + randChar + string.substr(i + 1, string.length);
    }
}

function applyCode(string: string, codes: string[]) {
    const len = codes.length;
    const elem = document.createElement('span');
    let obfuscated = false;

    for (let i = 0; i < len; i++) {
        elem.style.cssText += styleMap[codes[i]] + ';';
        if (codes[i] === '§k') {
            obfuscate(string, elem);
            obfuscated = true;
        }
    }

    if (!obfuscated) elem.innerHTML = string;
    return elem;
}

function parseStyle(inputString: string) {
    let codes = inputString.match(/§.{1}/g) || [];
    const indexes: number[] = [];
    let apply: string[] = [];
    let tmpStr: string;
    let indexDelta: number;
    let final = document.createElement("span")
    let len = codes.length;

    let string = inputString.replace(/\n|\\n/g, '<br>');

    for (let i = 0; i < len; i++) {
        indexes.push(string.indexOf(codes[i]));
        string = string.replace(codes[i], '\x00\x00');
    }

    if (indexes[0] !== 0) {
        final.appendChild(applyCode(string.substring(0, indexes[0]), []));
    }

    for (let i = 0; i < len; i++) {
        indexDelta = indexes[i + 1] - indexes[i];
        if (indexDelta === 2) {
            while (indexDelta === 2) {
                apply.push(codes[i]);
                i++;
                indexDelta = indexes[i + 1] - indexes[i];
            }
            apply.push(codes[i]);
        } else {
            apply.push(codes[i]);
        }

        if (apply.lastIndexOf('§r') > -1) {
            apply = apply.slice(apply.lastIndexOf('§r') + 1);
        }

        tmpStr = string.substring(indexes[i], indexes[i + 1]);
        final.appendChild(applyCode(tmpStr, apply));
    }

    return final;
}

function clearObfuscators() {
    let i = obfuscators.length;
    for (; i--;) {
        clearInterval(obfuscators[i]);
    }
    obfuscators = [];
}

function replaceColorCodes(str: string) {
    clearObfuscators();
    return parseStyle(str.toString());
}

export default replaceColorCodes;