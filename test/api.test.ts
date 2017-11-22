const handler = require('../src/handler');

it('should work', async () => {
  const context = {
    event: {
      isMessage: true,
      isText: true,
      text: 'Awesome',
      message: {
        text: 'Awesome',
      },
    },
    sendText: jest.fn(),
  };

  await handler(context);
  expect(context.sendText).toBeCalledWith('You say: Awesome');
});
