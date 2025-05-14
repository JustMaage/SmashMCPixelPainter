export class SmashMessage {
    constructor(public username: string, public message: string) {}
}

const messageRegex = /^([^●]+)● ([^✯]+)( ✯+)? ➥ (.+)$/;

export function isSmashMessage(message: string) {
    return messageRegex.test(message);
}

export function parseSmashMessage(messagestr: string) {
    const match = messagestr.match(messageRegex);
    if (!match) return null;

    //TODO: REGEX VERSCHÖNERN
    let username: string = match[2].trim();
    let message: string = match[4].trim();

    return new SmashMessage(username, message);
}
