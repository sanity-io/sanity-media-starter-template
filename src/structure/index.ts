import {StructureBuilder} from 'sanity/desk';

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Home')
    .items([
      ...S.documentTypeListItems().filter(listItem => listItem.getId() !== 'media.tag')
    ]);

export default structure;
