/** @typedef {import("../../../Adapter/Implementation/Implementation.mjs").Implementation} Implementation */

export class StoreCommand {
    /**
     * @type {Implementation}
     */
    #implementation;

    /**
     * @param {Implementation} implementation
     * @returns {StoreCommand}
     */
    static new(implementation) {
        return new this(
            implementation
        );
    }

    /**
     * @param {Implementation} implementation
     * @private
     */
    constructor(implementation) {
        this.#implementation = implementation;
    }

    /**
     * @param {string} key
     * @param {*} value
     * @returns {Promise<void>}
     */
    async store(key, value) {
        await this.#implementation.store(
            key,
            value
        );
    }
}
