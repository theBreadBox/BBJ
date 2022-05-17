import React from 'react'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import  { providers } from 'web3modal';
import detectEthereumProvider from '@metamask/detect-provider'

import logo from "../images/BBJ_LOGO1.png.webp"
import Twitter from "../images/svgviewer-output.svg"
import Discord from "../images/discordLogo1.png"
import Opensea from "../images/opensea-logo.png"
import Closed from "../images/MINT_BBJ2.png" 
import Open from "../images/BBJ_LIT.png"
import clouds from "../images/clouds.png"

// Import ABI + Config
import CONTRACTS from '../abis/NFT.json';
import CONFIG from '../config.json';


import {
    MintPageContainer,
    MintPageNavbar,
    NavbarLinkA,
    MintPageMain,
	MintLabel,
	MintInput,
    DescriptionPanel,
    AmountMinted,
    MintPanel,
    GridCol,
    TextWrapper,
	Title,
	FooterLinks,
	FooterLinksWrapper,
	NavbarImage,
	MintPanelImage,
	Connect,
	Clouds,
	InputWrapper,
	InputArrows,
} from '../components/Mint/MintingPageElements'





function Mint() {
	//Required
	const [web3, setWeb3] = useState(null)
	const [nft, setNft] = useState(null) 
	const [contract, setContract] = useState(null)
	//Walletconnect
	const [multipleInjected, setMultipleInjected] = useState(null)
	const [providersLength, setProvidersLength] = useState(null)
	const [account, setAccount] = useState(null)
	//Standard
	const [Price, setPrice] = useState(0)
	const [presaleOnly, setPresaleOnly] = useState(null)
	const [totalBBJs, setTotalBBJs] = useState("8888")
    const [totalMinted, setTotalMinted] = useState(0)
	//Presale
	const { MerkleTree } = require('merkletreejs');
	const keccak256 = require('keccak256');
	const [isMVPlisted, setIsMVPlisted] = useState(false)
	const [mvpProof, setMVPProof] = useState(null)
	//Links
	const [openseaURL, setOpenseaURL] = useState('https://opensea.io/')
	const [websiteURL, setWebsiteURL] = useState('https://www.BakedBlueJays.io')
	const [contractOpenseaURL, setContractOpenseaURL] = useState('https://opensea.io/')
	const [twitterURL, setTwitterURL] = useState('https://www.twitter.com/BakedBlueJays')
	const [discordURL, setDiscordURL] = useState('https://www.discord.gg/BakedBlueJays')
	const [blockchainExplorerURL, setBlockchainExplorerURL] = useState('https://etherscan.io/')
	//Misc
	const [qty, setQty] = useState(1)
	const [inputValue, setInputValue] = useState(1)
	const [currentNetwork, setCurrentNetwork] = useState(null)
	const [message, setMessage] = useState(null)
	

	const loadBlockchainData = async (
    ) => {
		// Fetch Contract, Data, etc.
		if (web3) {
			const networkId = await web3.eth.net.getId()
			setCurrentNetwork(networkId)

			try {
				const nft = new web3.eth.Contract(CONTRACTS.abi, CONTRACTS.networks[networkId].address)
				setNft(nft)
				
				const contract = nft._address
				setContract(contract)

				const presaleOnly = await nft.methods.presaleOnly().call()
				setPresaleOnly(presaleOnly)


				if (networkId !== 5777) {
					setBlockchainExplorerURL(CONFIG.NETWORKS[networkId].blockchainExplorerURL)
					setOpenseaURL(CONFIG.NETWORKS[networkId].openseaURL)
				}
				
				const Price = await nft.methods.cost().call()
				setPrice(Price)

				const totalMinted = await nft.methods.totalMinted().call()
                setTotalMinted(totalMinted)
				

			} catch (error) {
				if (!nft) {
					setMessage("Contract not deployed to current network, please change network in MetaMask and refresh the page")
				}
				if (!account && contract) {
					setMessage("Please connect with MetaMask")
				}

			}
		}
	}

//Get Presale Json
    const [presaleData, setPresaleData] = useState([])
  	const [presaleUsers, setPresaleUsers] = useState("0x0...")

  	const fetchData = () => 
  	{
  		return fetch(`https://thebreadbox.github.io/TEST_PRESALE/data/presaleUsers.json`)
    	.then((response) => response.json())
    	.then((data) => setPresaleData(data))

  	}
    	//console.log(presaleData);
    	


    useEffect(() => {
    fetchData()
	}, [])

	
	
	

	const loadWeb3 = async () => {
		if (typeof window.ethereum !== 'undefined' && !account) {
			const web3 = new Web3(window.ethereum)
			setWeb3(web3)

			const accounts = await web3.eth.getAccounts()

			if (accounts.length > 0) {
				setAccount(accounts[0])

			} else {
				setMessage('Please connect with MetaMask')
			}

			window.ethereum.on('accountsChanged', function (accounts) {
				setAccount(accounts[0])
				setMessage(null)
				window.location.reload();
			});

//console.log(accounts)


			window.ethereum.on('chainChanged', (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				window.location.reload();
			});
		}
	}
    
    

	// MetaMask Login/Connect
	const web3Handler = async () => {
		try {
			const providerOptions = {
				walletconnect: {
					package: WalletConnectProvider, // required
					options: {
					  infuraId: "186a0e17f40041d489c490c85776879e" // required
					}
				},
				walletlink: {
					package: CoinbaseWalletSDK, 
					options: {
					  infuraId: "186a0e17f40041d489c490c85776879e" 
					}
				},
				"custom-metamask": {
					display: {
					  logo: providers.METAMASK.logo,
					  name: providers.METAMASK.name,
					  description: providers.METAMASK.description
					},
					package: detectEthereumProvider,
					options: {
					  mustBeMetamask: true,
					  infuraId: "186a0e17f40041d489c490c85776879e"
					},
					connector: async (detectEthereumProvider, options) => {
						console.log("trying now");
						const provider = new detectEthereumProvider(options);
						
						if (provider) {
							if (window.ethereum && window.ethereum.isMetaMask) {
								const web3 = new Web3(window.ethereum.isMetaMask);
								setWeb3(web3);
								if (web3) {
									
									try {
										const providersLength = window.ethereum.providers.length;
										console.log(providersLength);
										console.log(typeof providersLength);
										setProvidersLength(providersLength);
										setMultipleInjected(true);
										console.log(providersLength);
										console.log(typeof providersLength);
										if (typeof providersLength == 'number') {
											try{
												const provider = window.ethereum.providers.find((provider) => provider.isMetaMask);
												console.log("multiple injected is true");
												const accounts = await provider.request({ method: 'eth_requestAccounts' });
												console.log(accounts);
												setAccount(accounts[0])
												window.location.reload();
											} catch (error) {
												window.alert('Connection Denied')
											}
										} else {
										
										}
									} catch (error) {
										if (typeof providersLength == 'number') {
											
										} else {
											const provider = window.ethereum;
											console.log("multiple injected is false");
											const accounts = await provider.request({ method: 'eth_requestAccounts' });
											console.log(accounts);
											setAccount(accounts[0])
										}
		
									}
								}
							} else {
								window.open("https://metamask.io/download/");
								window.alert('You need to download the Metamask chrome extension.');
							}
						} else {
							console.log('Please install MetaMask!');
						}

						await provider.enable();
						console.log(provider);
						return provider;
						
					}
				  }
			  };
			  
			  const web3Modal = new Web3Modal({
				network: "mainnet", // optional
				disableInjectedProvider: true,
				cacheProvider: false, // optional
				providerOptions // required
			  });
			  console.log('before web3ModalConnect')
			  const provider = await web3Modal.connect();
			  console.log('provider is' + provider)
			  const web3 = new Web3(provider);
			  setWeb3(web3);
	
		} catch (error) {
		}
	}

	const handleInput = event => {
		setQty(event.target.value)
	}

	const decreaseClick = async () => {
		if(inputValue == 1) {

		} else {
			const newInputValue = inputValue - 1
			setInputValue(newInputValue)
			setQty(newInputValue)
		}
		
	}

	const increaseClick = async () => {
		const newInputValue = inputValue + 1
		setInputValue(newInputValue)
		setQty(newInputValue)
	}

	const presaleList = JSON.stringify(presaleData);
	const psUser = account;
	const result = presaleList.includes(psUser);
	
	//console.log(result);
	if(result==true){
		//console.log('onthelist');
	}

	const mintNFTHandler = async () => {
		let cost = 50000000000000000;
		let gasLimit = 80000;
		let totalGasLimit = String(gasLimit * qty);
		let totalCostWei = String(cost * qty);

	


		if (nft) {
			await nft.methods
			.publicMint(qty)
			.send({ 
				gasLimit: String(totalGasLimit),
				from: account, 
				value: totalCostWei,
				})
			.on('confirmation', async () => {
		
		const totalMinted = await nft.methods.totalMinted()
			.call()
			setTotalMinted(totalMinted)

				})
				.on('error', (error) => {
					window.alert('There was an error. You may have rejected the transaction. Please try again.')
				})
		}
	};




	const renderHandleBirb = () => {
		if (!account) {
			return 	<GridCol sm={12} md={6}>
				<MintPanelImage src={Closed}/>
					</GridCol>
		} else {
			return <GridCol sm={12} md={6}>
			<MintPanelImage src={Open}/>	
				</GridCol>
					
		}
	}
	const renderHandleTitle = () => {
		if (presaleOnly) {
			return <Title>Presale Only!</Title>
		} else {
			return <Title>Minting Now!</Title>
		}
	}
	

	const renderHandleButton = () => {
		if (!account) 
		{
			return 	<GridCol sm={12} md={6}>
				<Connect onClick={web3Handler}>
							Connect
						</Connect>
					</GridCol>
		} 
		else 
		{
			if(result===false)
			{
			return 	<GridCol sm={12} md={6}>
				<Connect onClick={web3Handler}>
							Presale Only
						</Connect>
					</GridCol>
			}


			return <GridCol sm={12} md={6}>
				<MintLabel for="qty">How many?</MintLabel><InputWrapper><InputArrows onClick={decreaseClick}>-</InputArrows><MintInput onChange={handleInput} type="number" name="Qty" id="Qty" max="100" min="1" value={inputValue}/><InputArrows onClick={increaseClick}>+</InputArrows></InputWrapper>
			<Connect onClick={mintNFTHandler}>
							Mint
						</Connect>				
				</GridCol>
					
		}
	}

	const renderSupplyAvailable = () => {
		if (!account) {
			return null
		} else if (!contract) {
			return null
		} else {
			return <AmountMinted>{totalMinted}/{'10000'} minted!</AmountMinted>
		}
	}




    useEffect(() => {
        loadWeb3()
        loadBlockchainData()
    }, [account]);

	return (
		<MintPageContainer>
			<Clouds src={clouds} />
			<MintPageNavbar>
				<NavbarLinkA href={websiteURL}>
					<NavbarImage src={logo} />
				</NavbarLinkA>
				<NavbarLinkA href={contractOpenseaURL}>
					<NavbarImage src={Opensea} />
				</NavbarLinkA>
				<NavbarLinkA href={twitterURL}>
					<NavbarImage src={Twitter} />
				</NavbarLinkA>
				<NavbarLinkA href={discordURL}>
					<NavbarImage src={Discord} />
				</NavbarLinkA>
			</MintPageNavbar>
			<DescriptionPanel>
				<TextWrapper>
					{renderHandleTitle()}
					{renderSupplyAvailable()}
				</TextWrapper>
			</DescriptionPanel>	
			<MintPageMain>	
				<MintPanel>
					{renderHandleBirb()}
					{renderHandleButton()}
				</MintPanel>	
			</MintPageMain>
		</MintPageContainer>
		
	)
}

export default Mint;


