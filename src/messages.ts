export default class Messages {
    static getMessage(type: string) {
        const position = Math.floor(Math.random() * this.messages.length);
        return this.messages[position].replace('{}', type.toLowerCase());
    }
    static messages = [
        'Awesome! Je hebt een {} gegenereerd! Veel plezier samen!',
        'Niemand kan een {} genereren als jij...',
        'Alsjeblieft! Een nieuwe {} - je bent echt een genereerbeer',
        'Genereren kan je leren. Als je valt kan je je bezeren. Alsjeblieft; hier de  {} waar je om vroeg.',
        'Rozen zijn rood, violen zijn blauw. Ik ben awesome, deze {} genereer ik voor jou.',
        'E = MC({})'
    ];
}