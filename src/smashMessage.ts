export class SmashMessage {
    constructor(public username: string, public message: string) {}
}

const messageRegex = /[^●]+● [^✯]+ ✯ ➥ .+/;

export function isSmashMessage(message: string) {
    return messageRegex.test(message);
}

export function parseSmashMessage(messagestr: string) {
    const match = messagestr.match(/[^●]+● ([^✯]+) ✯ ➥ (.+)/);
    if (!match) return null;

    let username: string = match[1].trim();
    let message: string = match[2].trim();

    return new SmashMessage(username, message);
}
