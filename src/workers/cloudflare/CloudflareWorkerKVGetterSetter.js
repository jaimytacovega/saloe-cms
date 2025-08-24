import { getFromKV, putInKV } from 'saloe/cloudflare-kv'
import { addRoute } from 'saloe/router'


const getter = async ({
    request,
    env,
    cookies,
}) => {
    try{
        const { key, store } = await request.json()
        const getFromKvResult = await getFromKV({
            env,
            kv: store,
            key,
        })

        if (getFromKvResult?.err) throw getFromKvResult.err

        return { response: new Response(JSON.stringify({ data: getFromKvResult.data }), { status: 200 }) }
    }catch(err){
        console.error(err)
        return { response: new Response(err, { status: 500 }) }
    }
}

const setter = async ({
    request, 
    env, 
    cookies,
}) => {
    try{
        const { key, data, store } = await request.json()

        const putInKvResult = await putInKV({
            env,
            kv: store,
            key,
            data: JSON.stringify(data),
        })

        if (putInKvResult?.err) throw putInKvResult.err 

        return { response: new Response(JSON.stringify({ data }), { status: 200 }) }
    }catch(err){
        console.error(err)
        return { response: new Response(err, { status: 500 }) }
    }
}

const setKvGetterSetter = () => {
    addRoute({ pathname: '/~/kv/getter', route: getter })
    addRoute({ pathname: '/~/kv/setter', route: setter })
}

export {
    setKvGetterSetter,  
}