import marked from 'marked'

// markdown 格式转换为 html
export const mdToHtml = (md) => {
  return marked(md)
}
