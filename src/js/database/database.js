import * as idb from 'idb';

let db;

let DB_NAME = 'local_list_db';

let RECIPE_STORE_NAME = 'recipe_store';
let ITEM_STORE_NAME = 'item_store';

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
                if (!upgradeDb.objectStoreNames.contains(ITEM_STORE_NAME)) {
                    let itemDB = upgradeDb.createObjectStore(ITEM_STORE_NAME, {
                        autoIncrement: true
                    });
                    itemDB.createIndex('id', 'id', {unique: true});
                    console.log("Attempted recipe store create.")

                }else{
                    console.log("Error on create obj store.");
                }
                storeData({
                    id:"default_list",
                    looseItems: new Map(),
                    recipes: new Map()
                },'item_store');
                storeData({
                    id:"shopping_list",
                    looseItems: new Map(),
                    recipes: new Map()
                },'item_store');
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

export async function updateData(id,new_data,store_name) {
    console.log('Updating: '+ id+" in: " + store_name);
    if (!db)
        await initDatabase();
    if (db) {
        let tx = await db.transaction(store_name, 'readwrite');
        let key = await tx.store.index('id').getKey(id);
        if(!(key ===  undefined)){
            await tx.store.put(new_data,key);
            await  tx.done;
        }else{
            throw new Error('Item not found');
        }
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

export async function retrieveData(id,store_name) {
    console.log('Retrieving: '+ id+" from: " + store_name);
    if (!db)
        await initDatabase();
    if (db) {
        let tx = await db.transaction(store_name, 'readonly');
        let key = await tx.store.index('id').getKey(id);
        if(!(key ===  undefined)){
            let data = await tx.store.get(key);
            await  tx.done;
            return data;
        }else{
            throw new Error('Item not found');
        }
    }
}