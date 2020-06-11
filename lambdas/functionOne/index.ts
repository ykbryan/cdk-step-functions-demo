const handler = async function (event: any, context: any) {
  var body = {
    message: 'hello world',
  };
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(body),
  };
};

export { handler };
