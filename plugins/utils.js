import marked from 'marked'

export const mdToHtml = (md) => {
  return marked(md)
}
