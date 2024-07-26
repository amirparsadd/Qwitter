//* WARNING! CHATGPT CODE
export function extractError(html: string) {
  const preTagContentMatch = html.match(/<pre>(.*?)<\/pre>/s);
  if (preTagContentMatch && preTagContentMatch[1]) {
    try {
      const preTagContent = preTagContentMatch[1].replace(/&quot;/g, '"');
      const errorObject = JSON.parse(preTagContent);
      // console.log(errorObject)
      return errorObject;
    } catch (e) {
      throw new Error('Invalid JSON in pre tag');
    }
  } else {
    throw new Error('No pre tag found in the HTML');
  }
}