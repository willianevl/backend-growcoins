import bcrypt from 'bcrypt';

export class CryptographyAdapter {
    readonly #salt: number;

    constructor(salt: number){
        this.#salt = salt;
    }

    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, this.#salt);
    }

    async compare(value: string, valueToCompare: string): Promise<boolean> {
        return bcrypt.compare(valueToCompare, value);
    }
}