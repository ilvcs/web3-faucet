import { Button, HStack, Heading, Input, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { address, abi } from "./abi/abiFile";

function App() {
	const [tokenAmount, setTokenAmount] = useState("");
	const [userAddress, setUserAddress] = useState("");
	const [userBalance, setUserBalance] = useState(0);
	const [provider, setProvider] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log(address);
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			console.log("privider present");
			setProvider(provider);
		}
	}, []);

	useEffect(() => {
		if (userAddress) {
			fetchBalance();
		}
	}, [userAddress]);

	const connectWallet = async () => {
		console.log("connectWallet");

		if (window.ethereum) {
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			console.log(address);
			setUserAddress(address);
		} else {
			alert("Please install Metamask");
		}
	};

	const onChange = async (e) => {
		const value = e.target.value;
		if (value) {
			setTokenAmount(value);
		} else {
			setTokenAmount(0);
		}
	};

	const mintTokens = async () => {
		if (!tokenAmount || tokenAmount === 0) {
			alert("Please enter token amount");
			return;
		}

		if (provider) {
			setLoading(true);
			try {
				const signer = provider.getSigner();
				const contract = new ethers.Contract(address, abi, signer);
				const tx = await contract.mintForMe(
					ethers.utils.parseEther(tokenAmount.toString()),
				);
				await tx.wait();
				setLoading(false);
				alert("Tokens minted");
				fetchBalance();
			} catch (error) {
				setLoading(false);
				console.log(error);
				alert("Error minting tokens");
			}
		}
	};

	const fetchBalance = async () => {
		if (provider) {
			setLoading(true);
			try {
				const signer = provider.getSigner();
				const contract = new ethers.Contract(address, abi, signer);
				const balance = await contract.balanceOf(userAddress);
				console.log(`balance: ${balance}`);
				if (balance) {
					setUserBalance(ethers.utils.formatEther(balance));
				} else {
					setUserBalance(0);
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		}
	};

	return (
		<VStack w='full' h='100vh' p={20} spacing={8} bg='gray.300'>
			<Heading>Token Faucet</Heading>

			<VStack w='full' h='full' bg='white' align='center' p={20}>
				<Button colorScheme='gray' size='md' w='sm' onClick={connectWallet}>
					Connect With Metamask{" "}
				</Button>
				<VStack w='full' align='center' p={8}>
					<HStack>
						<Heading size='sm'>User</Heading>{" "}
						<Text>
							{userAddress && userAddress.length > 1
								? userAddress
								: "Please Connect to Metamask"}
						</Text>
					</HStack>
					<HStack>
						<Heading size='sm'>Token Balance</Heading>{" "}
						<Text>
							{userBalance && userBalance > 0
								? userBalance + " MCN"
								: "Not Available"}
						</Text>
					</HStack>
				</VStack>

				<VStack w='full' bg='white' align='center' p={8} spacing={8}>
					<Input
						placeholder='Enter token amount'
						size='md'
						w='md'
						onChange={onChange}
						value={tokenAmount}
					/>
					<Button
						colorScheme='blue'
						size='md'
						w='sm'
						onClick={mintTokens}
						isLoading={loading}
					>
						Mint Tokens
					</Button>
				</VStack>
			</VStack>
		</VStack>
	);
}

export default App;
