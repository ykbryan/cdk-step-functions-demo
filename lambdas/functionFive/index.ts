const handler = async function (event: any, context: any) {
  console.log(event, context);
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
