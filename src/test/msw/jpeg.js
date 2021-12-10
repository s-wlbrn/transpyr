import { compose, context } from 'msw';

export async function jpeg(base64) {
  const buffer = Buffer.from(base64, 'base64');

  return compose(
    context.set('Content-Length', buffer.byteLength.toString()),
    context.set('Content-Type', 'image/jpeg'),
    context.body(buffer)
  );
}
