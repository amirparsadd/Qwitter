//* WARNING! CHATGPT CODE
// Update: Cleaned Up ChatGPT Copy Pasted Code 7/27/2024
export function extractError(html: string) {
  const preTagContentMatch = html.match(/<pre>(.*?)<\/pre>/s)
  if (!(preTagContentMatch && preTagContentMatch[1])) throw new Error('No pre tag found in the HTML')

  try {
    const preTagContent = preTagContentMatch[1].replace(/&quot;/g, '"')
    const errorObject = JSON.parse(preTagContent)

    return errorObject;
  } catch (e) {
    throw new Error('Invalid JSON in pre tag')
  }
}