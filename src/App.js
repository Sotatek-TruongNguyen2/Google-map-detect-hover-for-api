
import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
import {OpenSeaPort, Network} from 'opensea-js';
import {OrderSide} from 'opensea-js/lib/types'
import {WyvernSchemaName} from "opensea-js/lib/types";
import Web3 from 'web3';

function App() {
  // const MAINNET_PROVIDER_URL = 'https://api.opensea.io/jsonrpc/v1/'
  const RINKEBY_PROVIDER_URL = 'https://rinkeby-api.opensea.io/jsonrpc/v1/'
  const RINKEBY_API_KEY = 'd0151169c69948a884ef91d59c96c1d9';
  const rinkebyProvider = new Web3.providers.HttpProvider(RINKEBY_PROVIDER_URL)

  // const provider = new ethers.providers.InfuraProvider("rinkeby", "d0151169c69948a884ef91d59c96c1d9");
  const seaport = new OpenSeaPort(rinkebyProvider, {
    networkName: Network.Rinkeby,
    apiKey: RINKEBY_API_KEY
  }, line => console.info(`RINKEBY: ${line}`));

  useEffect(() => {
    const fetchOpenseaAsset = async () => {
      // const asset = await seaport.api.getAsset({
      //   tokenAddress: "0xee45b41d1ac24e9a620169994deb22739f64f231", // string
      //   tokenId: "88098899261770269549701403148184322340493740593445749308862304275055142502401", // string | number | null
      //   schemaName: WyvernSchemaName.ERC1155
      // });

      // const balance = await seaport.getAssetBalance({
      //   accountAddress: "0xe164E49ED19DDBC32ce7Dd9DE7E28DF3b721B037", // string
      //   asset: {
      //     tokenAddress: "0xee45b41d1ac24e9a620169994deb22739f64f231", // string
      //     tokenId: "88098899261770269549701403148184322340493740593445749308862304275055142502401", // string | number | null
      //     schemaName: WyvernSchemaName.ERC1155
      //   },
      // });

      const orders = await seaport.api.getOrders({
        asset_contract_address: "0xee45b41d1ac24e9a620169994deb22739f64f231",
        token_id: "88098899261770269549701403148184322340493740593445749308862304275055142502401",
        side: OrderSide.Sell,
        sale_kind: 0,
        maker: "0xe164E49ED19DDBC32ce7Dd9DE7E28DF3b721B037"
      }, 1);

      console.log(orders);


      // const offer = await seaport.createBuyOrder({
      //   asset: {
      //     tokenAddress: "0x82ca85a881169dae80377c3d205d16a1f8c86a48",
      //     tokenId: "12",
      //     schemaName: "ERC721" // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
      //   },
      //   accountAddress: "0xe164E49ED19DDBC32ce7Dd9DE7E28DF3b721B037",
      //   // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
      //   startAmount: 1.2,
      // });

      // console.log('asset', asset);
      // console.log('balance', balance.toString());
    };


    seaport && fetchOpenseaAsset();
  }, [seaport]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
