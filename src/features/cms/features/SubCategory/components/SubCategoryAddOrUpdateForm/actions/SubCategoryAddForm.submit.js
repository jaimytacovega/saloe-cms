import * as Form from '@/shared/components/Form'
import { Source } from '@/shared/utils/constants'
import { keywords } from '@/shared/utils/utils'
import * as SubCategoryManager from '@/shared/managers/SubCategoryManager'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const name = form.querySelector('#name').value.trim()
    const description = form.querySelector('#description').value.trim()
    const image = form.querySelector('#image').files[0]
    const seoKeywords = form.querySelector('#seoKeywords').value.trim()

    const subCatergory = {
        name,
        description,
        seoKeywords,
        image,
        keywords: keywords({ keys: [name, description, seoKeywords] }),
        createdAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const addResult = await SubCategoryManager.add({
                source: Source.FIREBASE,
                data: subCatergory,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {    
            location.href = `/cms/subcategorias/${result.data.id}`
        },
    })
}


export {
    submit,
}