import * as FirestoreAdapter from '@/shared/adapters/firebase/FirebaseFirestoreLite'
import { FIREBASE_CREDENTIALS, Source } from '@/shared/utils/constants'


const Operators = {
    LessThan: '<',
    LessThanOrEqualTo: '<=',
    EqualTo: '==',
    GreaterThan: '>',
    GreaterThanOrEqualTo: '>=',
    NotEqualTo: '!=',
    In: 'in',
    Contains: 'array-contains',
    ContainsAny: 'array-contains-any',
}

const list = ({
    source,
    collectionName,
    filters,
    sorters,
    pageSize,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.list({
            collectionName,
            filters,
            sorters,
            pageSize,
        })
    }
}

const get = ({
    source,
    collectionName,
    id,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.get({
            collectionName,
            id,
        })
    }
}

const add = ({
    source,
    collectionName,
    data,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.add({
            collectionName,
            docData: data,
        })
    }
}

const update = ({
    source,
    collectionName,
    data,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.update({
            collectionName,
            docData: data,
        })
    }
}

const remove = ({
    source,
    collectionName,
    id,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.remove({
            collectionName,
            id,
        })
    }
}

const incrementCounter = ({
    source,
    collectionName,
    id,
    value,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.incrementCounter({
            collectionName,
            id,
            value,
        })
    }
}

const onTransaction = ({
    source,
    transaction,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.onTransaction({
            transaction,
        })
    }
}

const getWithTransaction = ({
    source,
    tx,
    collectionName,
    id,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.getWithTransaction({
            tx,
            collectionName,
            id,
        })
    }
}

const addWithTransaction = ({
    source,
    tx,
    collectionName,
    ref,
    data,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.addWithTransaction({
            tx,
            collectionName,
            ref,
            data,
        })
    }
}

const updateWithTransaction = ({
    source,
    tx,
    collectionName,
    ref,
    data,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.updateWithTransaction({
            tx,
            collectionName,
            ref,
            data,
        })
    }
}

const listArgumentsToQueryString = ({
    filters,
    sorters,
    pageSize,
}) => {
    return listArgumentsToSearchParams({ filters, sorters, pageSize }).toString()
}

const listArgumentsToSearchParams = ({
    filters,
    sorters,
    pageSize,
    page,
}) => {
    const searchParams = new URLSearchParams()

    if (filters) {
        filters.forEach(filter => {
            searchParams.set(
                filter.field === 'keywords' 
                    ? 'search' 
                    : 'filter'
                , `${filter.field}:${filter.value}`
            )
        })
    }

    if (sorters) {
        const sortersString = (sorters ?? []).reduce((acc, sorter) => {
            acc += `${sorter.field}:${sorter.direction},`
            return acc
        }, '')

        searchParams.set('sorters', sortersString.slice(0, -1)) // Remove trailing comma
    }

    if (pageSize) {
        searchParams.set('pageSize', pageSize)
    }

    if (page) {
        searchParams.set('page', page)
    }

    return searchParams
}

const queryBySearchParams = ({
    query,
    searchParams,
}) => {
    const listArgumentsArray = searchParamsToListArgumentsArray({ searchParams })

    return removeDuplicatesFromDataArrays({
        dataArraysPromises: listArgumentsArray.map((listArguments) => {
            return query({ listArguments })
        }),
    })
}

const removeDuplicatesFromDataArrays = async ({
    dataArraysPromises,
}) => {
    const dataArrays = await Promise.all(dataArraysPromises)
    const uniqueDataMap = new Map()
    const errors = []
    const areCached = []

    dataArrays.forEach(({ data: dataArray, isCached, err }) => {
        if (err){
            errors.push(err)
            return
        }

        if (!Array.isArray(dataArray)) return

        areCached.push(isCached)
        
        dataArray.forEach((data) => {
            uniqueDataMap.set(data.id, data)
        })

    })

    return {
        data: Array.from(uniqueDataMap.values()), 
        isCached: areCached,
        ...(errors.length > 0 && { err: errors }),
    }
}

const searchParamsToListArgumentsArray = ({
    searchParams,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })
    console.log('listArguments =', listArguments)

    const {
        containsAnyFilters,
        restOfFilters,
    } = (listArguments.filters ?? []).reduce((acc, filter) => {
        if (filter.operator === Operators.ContainsAny) acc.containsAnyFilters.push(filter)
        else acc.restOfFilters.push(filter)
        return acc
    }, { containsAnyFilters: [], restOfFilters: [] })

    if (containsAnyFilters.length === 0) return [listArguments]

    return containsAnyFilters.map((containsAnyFilter) => ({
        filters: [
            ...restOfFilters,
            containsAnyFilter,
        ],
        sorters: listArguments.sorters,
        pageSize: listArguments.pageSize,
        page: listArguments.page,
    }))
}

const searchParamsToListArguments = ({
    searchParams,
}) => {
    const filters = []
    const sorters = []
    let pageSize = null
    let page = null

    searchParams.forEach((value, key) => {
        switch (key) {
            case 'search':
                filters.push({
                    field: 'keywords',
                    operator: Operators.ContainsAny,
                    value: value.toLowerCase().split(' '),
                })
                break
            case 'sort':
                value.split(',').forEach((sorter) => {
                    const [field, direction] = sorter.split(':')
                    sorters.push({
                        field: field,
                        direction: direction,
                    })
                })
                break
            case 'pageSize':
                pageSize = value
                break
            case 'page':
                page = value
                break
            case 'filter':
                value.split(',').forEach((filter) => {
                    const [field, rawValue] = filter.split(':')
                    const isValueArray = rawValue.startsWith('[') && rawValue.endsWith(']')

                    const operator = isValueArray 
                        ? Operators.ContainsAny 
                        : Operators.EqualTo

                    const value = isValueArray 
                        ? rawValue.slice(1, -1).split(';') 
                        : rawValue

                    filters.push({
                        field: field,
                        operator,
                        value,
                    })
                })
                break
            default:
                break
        }
    })

    return {
        ...(filters.length && { filters }),
        ...(sorters.length && { sorters }),
        ...(pageSize && { pageSize }),
        ...(page && { page }),
    }
}

const getUrlByFilterForm = ({
    form,
    filterKeys = [],
    url,
}) => {
    const filterParam = filterKeys.map((filterKey) => {
        const filterValue = [...form.querySelectorAll(`input[name="${filterKey}"]:checked`)].map((input) => input.value)
        const filterValueParam = filterValue.length > 0 
            ? `${filterKey}:[${filterValue.join(';')}]` 
            : ''
        return filterValueParam
    }).filter((param) => param !== '').join(',')

    filterParam === ''
        ? url.searchParams.delete('filter')
        : url.searchParams.set('filter', filterParam)

    return url
}

const getUrlBySortForm = ({
    form,
    sortKey,
    url,
}) => {
    const sortParam = form.querySelector(`[name="${sortKey}"]:checked`).value
    url.searchParams.set('sort', sortParam)

    return url
}

const getUrlBySearchForm = ({
    form,
    searchKey,
    url,
}) => {
    const search = form.querySelector(`[name="${searchKey}"`).value
    
    search === ''
        ? url.searchParams.delete('search')
        : url.searchParams.set('search', search)

    return url
}

export {
    Operators,

    list,
    get,
    add,
    update,
    remove,

    incrementCounter,

    onTransaction,
    getWithTransaction,
    addWithTransaction,
    updateWithTransaction,

    listArgumentsToQueryString,
    searchParamsToListArguments,

    searchParamsToListArgumentsArray,
    removeDuplicatesFromDataArrays,
    queryBySearchParams,
    getUrlByFilterForm,
    getUrlBySortForm,
    getUrlBySearchForm,
}