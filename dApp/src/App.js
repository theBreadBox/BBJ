import { useState, useEffect, useRef } from 'react'
import { ethers } from 'ethers'
import Modal from './components/Modal'

import websiteLogo from './assets/BBJ_LOGO1.png.webp'
import twitterLogo from './assets/svgviewer-output.svg'
import openseaLogo from './assets/opensea-logo.png'
import discordLogo from './assets/discordLogo1.png'

import myEpicNft from './utils/MyEpicNFT.json'
import clouds from './images/clouds.png'
import './App.css';

const TWITTER_HANDLE = 'BakedBlueJays';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/BakedBlueJays';
const DISCORD_LINK = 'https://discord.gg/BakedBlueJays';
const WEBSITE_LINK = 'https://bakedbluejays.io';
const TOTAL_MINT_COUNT = 10000;

const CONTRACT_ADDRESS = "0xC927f6b7DAc4B660349D596d219f6eA7B7C01B57";

const App = () => {
  let totalMinted
  const [currentAccount, setCurrentAccount] = useState("")
  const [miningAnimation, setMiningAnimation] = useState(false)
  const [mintTotal, setMintTotal] = useState(totalMinted)
  const [currentNetwork, setCurrentNetwork] = useState("")

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!")
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
      console.log(window.ethereum.networkVersion, 'window.ethereum.networkVersion');
    }
    
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)
      setupEventListener()
    } else {
      console.log("No authorized account found")
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0])
      setCurrentAccount(accounts[0])

      setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        })
        console.log("Setup event listener!")
      } else {
        console.log("Ethereum object doesn't exist")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner()
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer)

          // console.log("Going to pop wallet now to pay gas...")
          let nftTxn = await connectedContract.makeAnEpicNFT()

          // console.log("Mining... please wait")
          
          await nftTxn.wait()
          console.log(nftTxn)
          console.log(`Mined, tee transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
          
        } else {
          console.log("Ethereum object doesn't exist")
        }
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    getTotalNFTsMintedSoFar()
  }, [])

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect
    </button>
  );

  const renderMintUI = () => (
    <button onClick={askContractToMintNft} className="cta-button mint-button">
      MINT 
    </button>
  )

  const renderNetworkPrompt = () => (
    alert("Hello there, This app is built on the rinkeby testnet and it looks like you are on a different ethereum network. Please switch to the Rinkeby testnet to continue")
  )

  const getTotalNFTsMintedSoFar = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
    
    let count = await connectedContract.getTotalNFTsMintedSoFar()
    setMintTotal(count._hex.substring(3))
    console.log(count._hex.substring(3))
  }

  return (

  <div>
    
    <div className="App">
    <div class="w3-modal w3-animate-opacity">
      {
        miningAnimation ? (
          <Modal />
        ) : null
      }
   </div>
      <div className="container">
        <div
          className="moving-clouds"
          style={{
            backgroundImage:
              "url(" + require('./images/clouds.png').default + ")",
          }}
        />
          <div className="footer-container">
            
            <a
            img alt="Website Logo"
            src={websiteLogo}
            className="footer-text"
            href={WEBSITE_LINK}
            target="_blank"
            rel="noreferrer"
          >{<img alt="Website Logo" className="website-logo" src={websiteLogo} />}</a>

            <a
            className="opensea-button"
            href={OPENSEA_LINK}
            target="_blank"
            rel="noreferrer"
            >
            <img src={openseaLogo} alt="opensea-logo" className="opensea-logo" /></a>
          
        
            <a
            img alt="Twitter Logo"
            src={twitterLogo}
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />}</a>
          
          <a
            img alt="Discord Logo"
            src={discordLogo}
            className="footer-text"
            href={DISCORD_LINK}
            target="_blank"
            rel="noreferrer"
          >{<img alt="Discord Logo" className="discord-logo" src={discordLogo} />}</a>




          </div>



        
        <div className="header-container">
          <p className="neonText">Minting Now!</p>
          
          <p className="sub-text">
            
          </p>
          <p className="sub-text">
            {mintTotal}/10000 NFTs minted.
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
        </div>
        
        </div>
      
      
     
     
      
    
    </div>
    </div>
  );
}

export default App;
