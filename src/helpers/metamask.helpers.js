import francIcon from '../assets/CHF36.png';
import eurIcon from '../assets/EUR36.png';

export const addTokensToMetamask = tokens => {
  if (!window.ethereum || !tokens) return;

  const symbolImages = {
    EUR36: eurIcon,
    CHF36: francIcon
  };

  window.ethereum.sendAsync(
    {
      method: 'metamask_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokens[0].tokenAddress,
          symbol: tokens[0].symbol,
          decimals: 18,
          image: symbolImages[tokens[0].symbol]
        }
      },
      id: Math.round(Math.random() * 100000)
    },
    error => {
      if (error) return;

      window.ethereum.sendAsync(
        {
          method: 'metamask_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokens[1].tokenAddress,
              symbol: tokens[1].symbol,
              decimals: 18,
              image: symbolImages[tokens[1].symbol]
            }
          },
          id: Math.round(Math.random() * 100000)
        },
        error => {
          if (error) return;
        }
      );
    }
  );
};

export const parseNetworkIdToName = networkId => {
  switch (parseInt(networkId)) {
    case 1:
      return 'MainNet';
    case 2:
      return 'Morden';
    case 3:
      return 'Ropsten';
    case 4:
      return 'Rinkeby';
    case 5:
      return 'Goerli';
    case 85458545:
      return 'Local';
    case 10:
      return 'DEV';
    case 42:
      return 'Kovan';
    default:
      return networkId;
  }
};
