import * as idb from 'idb';

let db;

let DB_NAME = 'local_list_db';

let RECIPE_STORE_NAME = 'recipe_store';

let DB_VERSION = 1;

async function initDatabase(){
    if (!db){
        db = await idb.openDB(DB_NAME, DB_VERSION, {
            upgrade(upgradeDb, oldVersion, newVersion) {
                if (!upgradeDb.objectStoreNames.contains(RECIPE_STORE_NAME)) {
                    let recipeDB = upgradeDb.createObjectStore(RECIPE_STORE_NAME, {
                        autoIncrement: true
                    });
                    recipeDB.createIndex('id', 'id', {unique: true});
                    console.log("Attempted recipe store create.")

                }else{
                    console.log("Error on create obj store.");
                }
                
            }
        });
        
        
    }
}

export async function storeData(data,store_name) {
    if (!db)
        await initDatabase();
    if (db) {
            let tx = await db.transaction(store_name, 'readwrite');
            await tx.store.add(data);
            await  tx.done;
    }
}

/**
 * gets the whole data store
 * @returns {Promise<*>} the chat object
 */
 export async function getAll(store_name) {
    if (!db)
        await initDatabase();
    if (db) {
        console.log('Fetching data.');
        let tx = db.transaction(store_name, 'readonly');
        let store = await tx.objectStore(store_name);
        let data = await store.getAll();
        
        await tx.done;
        if (data){
            await  tx.done;         
            return data;
            
        }
        else{
            throw new Error('Data not found');
        }
        
    } else {
        throw Error('DB failed');
    }
}