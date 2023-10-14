import { Button, HStack, Heading, Input, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function App() {
	const [tokenAmount, setTokenAmount] = useState(0);
	const [userAddress, setUserAddress] = useState("");
	const [userBalance, setUserBalance] = useState(0);

	useEffect(() => {}, []);

	const connectWallet = async () => {};
	const onChange = async () => {};
	const mintTokens = async () => {};

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
							{userBalance && userBalance > 0 ? userBalance : "Not Available"}
						</Text>
					</HStack>
				</VStack>

				<VStack w='full' bg='white' align='center' p={8} spacing={8}>
					<Input
						placeholder='Enter token amount'
						size='md'
						w='md'
						onChange={onChange}
					/>
					<Button colorScheme='blue' size='md' w='sm' onClick={mintTokens}>
						Mint Tokens
					</Button>
				</VStack>
			</VStack>
		</VStack>
	);
}

export default App;
