import { Implementation } from "./Implementation.mjs";

export class StorageImplementation extends Implementation {
    /**
     * @type {string}
     */
    #key_prefix;
    /**
     * @type {Storage}
     */
    #storage;

    /**
     * @param {string} key_prefix
     * @param {Storage} storage
     * @returns {StorageImplementation}
     */
    static new(key_prefix = "", storage) {
        return new this(
            key_prefix,
            storage
        );
    }

    /**
     * @param {string} key_prefix
     * @param {Storage} storage
     * @private
     */
    constructor(key_prefix, storage) {
        super();

        this.#key_prefix = key_prefix;
        this.#storage = storage;
    }

    /**
     * @returns {Promise<void>}
     */
    async clear() {
        await Promise.all(this.#getAll().map(async ([
            key
        ]) => this.delete(
            key
        )));
    }

    /**
     * @param {string} key
     * @returns {Promise<void>}
     */
    async delete(key) {
        this.#storage.removeItem(`${this.#key_prefix}${key}`);
    }

    /**
     * @param {string} key
     * @returns {Promise<*>}
     */
    async get(key) {
        const value = this.#storage.getItem(`${this.#key_prefix}${key}`);

        if (value === null) {
            return null;
        }

        return JSON.parse(value);
    }

    /**
     * @returns {Promise<{[key: string]: *}>}
     */
    async getAll() {
        return Object.fromEntries(this.#getAll().map(([
            key,
            value
        ]) => [
                key,
                JSON.parse(value)
            ]));
    }

    /**
     * @param {string} key
     * @returns {Promise<boolean>}
     */
    async has(key) {
        return this.#storage.getItem(`${this.#key_prefix}${key}`) !== null;
    }

    /**
     * @param {string} key
     * @param {*} value
     * @returns {Promise<void>}
     */
    async store(key, value) {
        this.#storage.setItem(`${this.#key_prefix}${key}`, JSON.stringify(value));
    }

    /**
     * @returns {[string, *]}
     */
    #getAll() {
        return Object.entries({
            ...this.#storage
        }).filter(([
            key
        ]) => key.startsWith(this.#key_prefix));
    }
}
