const closedDatabases = new WeakSet()

let databaseName = null
let connection = Promise.resolve(null)


const init = ({
    name,
}) => {
    if (!name || name === databaseName) return

    const previous = connection
    databaseName = name
    connection = previous.then((database) => {
        closeDatabase({ database })
        return null
    }).catch(() => null)
}

const list = async ({
    collectionName,
    filters,
    sorters,
    pageSize,
}) => {
    try {
        const records = await withStore({
            storeName: collectionName,
            mode: 'readonly',
            run: ({ store, resolve, reject }) => {
                readRequest({
                    request: store.getAll(),
                    resolve,
                    reject,
                })
            },
        })

        return {
            data: applyList({
                records,
                filters,
                sorters,
                pageSize,
            }),
        }
    } catch (err) {
        console.error(err)
        return { err }
    }
}

const get = async ({
    collectionName,
    id,
}) => {
    try {
        const data = await withStore({
            storeName: collectionName,
            mode: 'readonly',
            run: ({ store, resolve, reject }) => {
                readRequest({
                    request: store.get(id),
                    resolve: (record) => resolve(record ?? null),
                    reject,
                })
            },
        })

        return { data }
    } catch (err) {
        return { err }
    }
}

const add = async ({
    collectionName,
    docData,
}) => {
    try {
        const record = {
            ...docData,
            id: docData?.id ?? crypto.randomUUID(),
        }

        await withStore({
            storeName: collectionName,
            mode: 'readwrite',
            run: ({ store, resolve, reject }) => {
                readRequest({
                    request: store.add(record),
                    resolve,
                    reject,
                })
            },
        })

        return { data: record }
    } catch (err) {
        return { err }
    }
}

const update = async ({
    collectionName,
    docData,
}) => {
    try {
        const id = docData?.id
        if (!id) throw new Error('id is required')

        const data = await withStore({
            storeName: collectionName,
            mode: 'readwrite',
            run: ({ store, resolve, reject }) => {
                const request = store.get(id)

                request.onsuccess = () => {
                    if (!request.result) {
                        reject(new Error('Record not found'))
                        return
                    }

                    const record = {
                        ...request.result,
                        ...docData,
                        id,
                    }

                    readRequest({
                        request: store.put(record),
                        resolve: () => resolve(record),
                        reject,
                    })
                }

                request.onerror = (event) => {
                    event.preventDefault()
                    reject(request.error)
                }
            },
        })

        return { data }
    } catch (err) {
        return { err }
    }
}

const remove = async ({
    collectionName,
    id,
}) => {
    try {
        await withStore({
            storeName: collectionName,
            mode: 'readwrite',
            run: ({ store, resolve, reject }) => {
                readRequest({
                    request: store.delete(id),
                    resolve,
                    reject,
                })
            },
        })

        return { data: { id } }
    } catch (err) {
        return { err }
    }
}

const withStore = ({
    storeName,
    mode,
    run,
}) => {
    if (!databaseName) throw new Error('IndexedDB is not initialized')
    if (!storeName) throw new Error('collectionName is required')
    if (typeof indexedDB === 'undefined') throw new Error('IndexedDB is not available')

    let readyDatabase = null

    const pending = connection.then(async (database) => {
        readyDatabase = await openReadyDatabase({
            database,
            storeName,
        })

        return transact({
            database: readyDatabase,
            storeName,
            mode,
            run,
        })
    })

    connection = pending.then(() => readyDatabase).catch(() => null)

    return pending
}

const transact = ({
    database,
    storeName,
    mode,
    run,
}) => {
    return new Promise((resolve, reject) => {
        let settled = false

        const succeed = (value) => {
            if (settled) return
            settled = true
            resolve(value)
        }

        const fail = (err) => {
            if (settled) return
            settled = true
            reject(err ?? new Error('IndexedDB transaction failed'))
        }

        const transaction = database.transaction(storeName, mode)
        const store = transaction.objectStore(storeName)

        transaction.oncomplete = () => {
            if (!settled) succeed(undefined)
        }

        transaction.onerror = (event) => {
            event.preventDefault()
            fail(transaction.error)
        }

        transaction.onabort = () => fail(transaction.error)

        try {
            run({
                store,
                resolve: succeed,
                reject: fail,
            })
        } catch (err) {
            fail(err)
        }
    })
}

const readRequest = ({
    request,
    resolve,
    reject,
}) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = (event) => {
        event.preventDefault()
        reject(request.error)
    }
}

const openReadyDatabase = async ({
    database,
    storeName,
}) => {
    if (
        database
        && !closedDatabases.has(database)
        && database.name === databaseName
        && database.objectStoreNames.contains(storeName)
    ) return database

    closeDatabase({ database })

    return openDatabase({ storeName })
}

const openDatabase = ({
    storeName,
}) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(databaseName)

        request.onerror = () => reject(request.error)

        request.onupgradeneeded = () => {
            createStore({
                database: request.result,
                storeName,
            })
        }

        request.onsuccess = () => {
            const opened = watchVersionChange({ database: request.result })

            if (opened.objectStoreNames.contains(storeName)) {
                resolve(opened)
                return
            }

            const nextVersion = opened.version + 1
            closeDatabase({ database: opened })

            const upgrade = indexedDB.open(databaseName, nextVersion)

            upgrade.onerror = () => reject(upgrade.error)
            upgrade.onblocked = () => reject(new Error('IndexedDB upgrade is blocked'))

            upgrade.onupgradeneeded = () => {
                createStore({
                    database: upgrade.result,
                    storeName,
                })
            }

            upgrade.onsuccess = () => {
                resolve(watchVersionChange({ database: upgrade.result }))
            }
        }
    })
}

const createStore = ({
    database,
    storeName,
}) => {
    if (database.objectStoreNames.contains(storeName)) return
    database.createObjectStore(storeName, { keyPath: 'id' })
}

const watchVersionChange = ({
    database,
}) => {
    database.onversionchange = () => closeDatabase({ database })
    return database
}

const closeDatabase = ({
    database,
}) => {
    if (!database || closedDatabases.has(database)) return
    closedDatabases.add(database)
    database.close()
}

const applyList = ({
    records,
    filters,
    sorters,
    pageSize,
}) => {
    const filtered = filters?.length
        ? records.filter((record) => filters.every((filter) => matchesFilter({ record, filter })))
        : records

    const sorted = sorters?.length
        ? [...filtered].sort((left, right) => compareRecords({ left, right, sorters }))
        : filtered

    if (!pageSize) return sorted

    return sorted.slice(0, Number(pageSize))
}

const matchesFilter = ({
    record,
    filter,
}) => {
    const value = record?.[filter.field]
    const expected = filter.value
    const operator = filter.operator ?? '=='

    if (operator === '==') return value === expected
    if (operator === '!=') return value !== expected
    if (operator === '<') return value < expected
    if (operator === '<=') return value <= expected
    if (operator === '>') return value > expected
    if (operator === '>=') return value >= expected
    if (operator === 'in') return (expected ?? []).includes(value)
    if (operator === 'array-contains') return Array.isArray(value) && value.includes(expected)
    if (operator === 'array-contains-any') return Array.isArray(value) && (expected ?? []).some((item) => value.includes(item))

    return false
}

const compareRecords = ({
    left,
    right,
    sorters,
}) => {
    for (const sorter of sorters) {
        const leftValue = left?.[sorter.field]
        const rightValue = right?.[sorter.field]

        if (leftValue === rightValue) continue

        const isBefore = leftValue < rightValue
        const isDescending = sorter.direction === 'desc'

        if (isBefore) return isDescending ? 1 : -1
        return isDescending ? -1 : 1
    }

    return 0
}

export {
    init,

    list,
    get,
    add,
    update,
    remove,
}
