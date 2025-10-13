const COMPANY_NAME = 'Nombre empresa'

const FIREBASE_CREDENTIALS = {
    apiKey: "AIzaSyB5NJbhKBzseqpw4fTg8e0Pmzyv4ZhtLec",
    authDomain: "ferreteria-ayv.firebaseapp.com",
    projectId: "ferreteria-ayv",
    storageBucket: "ferreteria-ayv.firebasestorage.app",
    messagingSenderId: "389452779173",
    appId: "1:389452779173:web:5fbe12ad2de855f8fdc74c"
}

const Source = {
    FIREBASE: 'firebase',
}

const DEFAULT_PAGE_SIZE = 20
const DEFAULT_PAGE = 1
const DEFAULT_SORTERS = 'updatedAt:desc'

const CMS_CODES = {
    brands: 'MAR',
    subCategories: 'SUBCAT',
    categories: 'CAT',
    promotions: 'PROM',
    products: 'PROD',
    orders: 'COT',
}

export {
    COMPANY_NAME,
    FIREBASE_CREDENTIALS,
    Source,
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE,
    DEFAULT_SORTERS,
    CMS_CODES,
}