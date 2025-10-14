import { getUrlByFilterForm } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    location.href = getUrlByFilterForm({
        form,
        filterInKeys: ['brandId'],
        url: new URL(location.href),
    })
}

export {
    submit,
}