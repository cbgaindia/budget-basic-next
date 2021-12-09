export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  var myHeaders = new Headers();
 myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM4MDE5Njg4LCJleHAiOjE2NDA2MTE2ODh9.lwepABcjKz9_cZVtZnuJ89URla7LVVkeJsKiOtAwd7g");
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
  const response = await fetch(requestUrl,requestOptions);
  // const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}
