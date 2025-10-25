import * as AuthManager from '@/shared/managers/AuthManager'
import { delay } from '@/shared/utils/utils'
import { Source } from '@/shared/utils/constants'


const click = async ({
    e,
    srcElement,
}) => {
    e.preventDefault()
    
    await AuthManager.signOut({ source: Source.FIREBASE })
    await AuthManager.removeCredentialsFromCookies()
    await delay({ ms: 1_000 })
    location.reload()
}

export{
    click,
}