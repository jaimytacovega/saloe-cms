import { html } from 'saloe/html'

import SubCategoryMenu from '@/features/web/features/SubCategory/components/SubCategoryMenu'
import SubCategoryHeroSection from '@/features/web/features/SubCategory/components/SubCategoryHeroSection'


const SubCategoryPage = async ({
    subCategoryId,
}) => {
    return html`
        ${
            await SubCategoryMenu()
        }
        ${
            await SubCategoryHeroSection({
                subCategoryId,
            })
        }
    `
}

export default SubCategoryPage