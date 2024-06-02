
export const openDatabase = (dbName, dbVersion, upgradeCallback) => {
    return new Promise((resolve, reject) => {
        const DBOpenRequest = window.indexedDB.open(dbName, dbVersion);

        DBOpenRequest.onupgradeneeded = (event) => {
            const db = event.target.result;
            upgradeCallback(db);
        };

        DBOpenRequest.onsuccess = (event) => {
            resolve(event.target.result);
        };

        DBOpenRequest.onerror = (event) => {
            reject(event.target.error);
        };

    });
};


export const upgradeDB = (db) => {
    if (!db.objectStoreNames.contains('conversations')) {
        const store = db.createObjectStore('conversations', { keyPath: 'id', autoIncrement: true });
        store.createIndex('day', 'day', { unique: false });
        store.createIndex('month', 'month', { unique: false });
        store.createIndex('year', 'year', { unique: false });
    }
};


export const saveConversation = (db, conversation) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['conversations'], 'readwrite');
        const store = transaction.objectStore('conversations');
        const objectStoreRequest = store.add(conversation);

        objectStoreRequest.onsuccess = () => {
            console.log("creado");
            resolve();
        };

        objectStoreRequest.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export const getConversations = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['conversations'], 'readonly');
        const store = transaction.objectStore('conversations');
        const request = store.getAll();

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};