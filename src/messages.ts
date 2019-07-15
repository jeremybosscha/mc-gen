export default class Messages {
    static getMessage(type: string) {
        const position = Math.floor(Math.random() * this.messages.length);
        return this.messages[position].replace('{}', type.toLowerCase());
    }
    static messages = [
        'Awesome! Je hebt een {} gegenereerd! Veel plezier samen!',
        'Niemand kan een {} genereren als jij...'
    ];
}