const handler = async function (event: any, context: any) {
  console.log(event, context);
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
