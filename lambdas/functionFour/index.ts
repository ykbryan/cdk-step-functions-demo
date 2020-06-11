const handler = async function (event: any, context: any) {
  var body = {
    message: 'hello world 2',
  };
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(body),
  };
};

export { handler };
