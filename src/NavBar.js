import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Instagram from "./assets/social-media-icons/insta_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Email from "./assets/social-media-icons/email_32x32.png";

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">
            {/* Left side - Social media icons */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.instagram.com/frugs.io">
                    <Image src={Instagram} boxSize="42px" boxShadow="0 2px 2px #000000" margin="0 15px" />
                </Link>
                <Link href="https://www.twitter.com/frugsnft">
                    <Image src={Twitter} boxSize="42px" boxShadow="0 2px 2px #000000" margin="0 15px" />
                </Link>
                <Link href="https://discord.gg/Rq4zS3GM">
                    <Image src={Email} boxSize="42px" boxShadow="0 2px 2px #000000" margin="0 15px" />
                </Link>
            </Flex>

            {/* Right side - Sections and connect */}
            <Flex justify="space-around" align="center" width="40%" padding="30px" textShadow="0 2px 2px #000000">
                <Box margin="0 15px">About</Box>
                <Spacer />
                <Box margin="0 15px">Mint</Box>
                <Spacer />
                <Box margin="0 15px">Team</Box>
                <Spacer />
               
                {/* Connect */}
                {isConnected ? (
                    <Box margin="0 15px">Connected</Box>
                ) : (
                    <Button
                        backgroundColor="#3DE200"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px" 
                        margin="0 15px"
                        onClick={connectAccount}
                    >
                        Connect
                    </Button>
                )}
            </Flex>
        </Flex>
    );
};

export default NavBar;