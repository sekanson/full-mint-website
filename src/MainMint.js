import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import frugs from './Frugs.json';
import React from 'react';
import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import FrugsLogo from "./assets/social-media-icons/pixelfruglogo150.png";

const frugsAddress = "0x720DfB9F3dE60ebdAb0daA8bE9F4943C29E5216f";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                frugsAddress,
                frugs.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), { 
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                 });
                console.log("response: ", response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }
    
    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 20) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="80vh" paddingBottom="100px">
            <Box width="520px">
                <div>  
                    <Image src={FrugsLogo}></Image>
                        <Text
                            fontSize="30px"
                            letterSpacing="-5.5%"
                            fontFamily="VT323"
                            textShadow="0 2px 2px #000000"
                        >
                            We tired of getting rekt and rugged. Feels bad man. Rugit. Rugit.
                        </Text>
                </div>

                    {isConnected ? (
                        <div>
                            <Flex align="center" justify="center">
                                <Button
                                    backgroundColor="#3DE200"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px" 
                                    margin="10px"
                                    onClick={handleDecrement}
                                >
                                    -
                                </Button>
                                <Input
                                    readOnly
                                    fontFamily="inherit"
                                    width="100px"
                                    height="40px"
                                    textAlign="center" 
                                    marginTop="10px"
                                    type="number"
                                    value={mintAmount}
                                />
                                <Button
                                    backgroundColor="#3DE200"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px" 
                                    margin="10px"
                                    onClick={handleIncrement}
                                    >
                                        +
                                    </Button>
                            </Flex>
                            <Button
                                    backgroundColor="#3DE200"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px" 
                                    marginTop="10px"
                                    onClick={handleMint}
                                    >
                                MINT NOW
                            </Button>
                    </div>
                ) : (
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="#3DE200"
                    >
                        You must connect to Mint
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainMint;