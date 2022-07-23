import {saveAs} from 'file-saver';

export class File {
    constructor(file) {
        this.value = file;
        this.id = this.#generateId();
        this.extended = false;
    }

    #generateId = () => (performance.now().toString(36) +
        Math.random().toString(36)).replace(/\./g, '');

    save = () => saveAs(this.value, this.value.name);

    toggleExtended = () => this.extended = !this.extended;
}