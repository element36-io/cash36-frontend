const Web3 = require('web3');
const React = require('react');
const PropTypes = require('prop-types');

const childContextTypes = {
    web3: PropTypes.shape({
        givenProvider: PropTypes.boolean,
        web3: PropTypes.object,
        network: PropTypes.string,
        networkId: PropTypes.number
    })
};

class Web3ProviderNew extends React.Component {

    static contextTypes = {
        store: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: true,
            networkId: null,
            networkError: false,
            givenProvider: false
        };

        this.initWeb3.bind(this);
        this.setNetwork.bind(this);
    }

    getChildContext() {
        return {
            web3: {
                givenProvider: this.state.givenProvider,
                web3: window.web3,
                network: this.getNetwork(this.state.networkId),
                networkId: this.state.networkId
            }
        };
    }

    componentDidMount() {
        this.initWeb3();
        this.setNetwork();
    }

    initWeb3() {
        let { web3 } = window;

        if (web3 !== undefined) {
            // Use Mist/MetaMask's provider.
            console.log('Injected web3 detected. We will override web3 provider. Your plugin might not work anymore.');
        }

        web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider("http://167.99.243.81:6688/"));

        window.web3 = web3;

        console.log('web3 injected and ready. Connected to: http://167.99.243.81:6688/');
    }

    setNetwork() {
        const { web3 } = window;

        return web3.eth.net.getId().then((id) => {
            console.log('set network '+ id);
            this.setState({
                networkId: id,
                loading: false
            });
            return id;
        }).catch(error => {
            console.log('Error: web3 not available '+ error);
            this.setState({
                networkError: true,
                loading: false
            });
            return null;
        });
    }

    getNetwork(networkId) {
        switch (networkId) {
            case 1:
                return 'MainNet';
            case 2:
                return 'Morden';
            case 3:
                return 'Ropsten';
            case 4:
                return 'Rinkeby';
            case 85588558:
                return 'Local'
            case 10:
                return 'DEV';
            default:
                return 'unknown';
        }
    }

    render() {
        if (this.state.loading) {
            return <div className="loading-full">Connecting to Ethereum node...</div>
        } else if (this.state.networkError) {
            return <div className="error-full">Error connecting to Ethereum node!</div>
        } else {
            return this.props.children;
        }
    }
}

Web3ProviderNew.childContextTypes = childContextTypes;
export default Web3ProviderNew;