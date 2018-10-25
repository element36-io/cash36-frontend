import { Connect, SimpleSigner } from 'uport-connect';

const uport = new Connect('cash36', {
  clientId: '2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6',
  network: 'rinkeby',
  signer: SimpleSigner('98fe93a539f8ed46def934713918f888df1e088dc0ec6c58333f131b4f4ca358')
});

export default uport;
