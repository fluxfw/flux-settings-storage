/** @typedef {import("mongodb").Collection} Collection */
/** @typedef {import("../StorageImplementation.mjs").StorageImplementation} StorageImplementation */

/**
 * @param {Collection | null} mongo_db_collection
 * @param {string | null} json_file_path
 * @returns {Promise<StorageImplementation>}
 */
export async function getNodeJsStorageImplementation(mongo_db_collection = null, json_file_path = null) {
    try {
        if (mongo_db_collection !== null) {
            return (await import("./MongoDbNodeJsStorageImplementation.mjs")).MongoDbNodeJsStorageImplementation.new(
                mongo_db_collection
            );
        }
    } catch (error) {
        console.error("Try using MongoDbNodeJsStorageImplementation failed (", error, ")");
    }

    try {
        if (json_file_path !== null) {
            const storage_implementation = (await import("./JsonFileNodeJsStorageImplementation.mjs")).JsonFileNodeJsStorageImplementation.new(
                json_file_path
            );
            await storage_implementation.init();
            return storage_implementation;
        }
    } catch (error) {
        console.error("Try using JsonFileNodeJsStorageImplementation failed (", error, ")");
    }

    console.warn("Neither MongoDbNodeJsStorageImplementation nor JsonFileNodeJsStorageImplementation are available - Using MemoryStorageImplementation fallback");

    return (await import("../MemoryStorageImplementation.mjs")).MemoryStorageImplementation.new();
}
