import {type SchemaTypeDefinition} from 'sanity'
import {page} from './page'
import {homePage} from './homePage'
import {aboutPage} from './aboutPage'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [page, homePage, aboutPage],
}
