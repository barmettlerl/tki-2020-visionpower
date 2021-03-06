export const callApi = async () => {
  const response = await fetch("/api/hello");
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};
