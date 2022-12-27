import {
Box,
Flex,
Stack,
HStack, 
Link, 
Text,
Button,
IconButton,
Avatar,
Menu,
MenuButton,
MenuList,
MenuDivider,
Center,
useDisclosure,
useColorMode, 
useColorModeValue,
MenuItem
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink as ReactNavLink, Link as ReactLink } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from '../api/axiosInstance';

const NAV_ITEMS = [
    {
        'label': 'Videogames',
        'to': '/search/games'
    },

    {
        'label': 'My list',
        'to': '/my-list'
    }
]

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, setUser } = useUserContext();
    
    return (
        <Box px={4}>
            <Flex h={14} alignItems='center' justifyContent='space-between'>
                <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={4}>
                    <Box>
                        <Text as='b'>My Videogames XP</Text>
                    </Box>
                    <HStack 
                    as='nav' 
                    spacing={4}
                    display={{ base: 'none', md: 'flex' }}>
                        {NAV_ITEMS.map((navItem, index) => (
                            <NavLink key={index} to={navItem.to}>{navItem.label}</NavLink>
                        ))}
                    </HStack>
                </HStack>
                <HStack spacing={6}>
                    <IconButton 
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />

                    { user ? 
                        (
                            <Menu>
                                <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                    <Avatar
                                    size='sm'
                                    src={`https://avatars.dicebear.com/api/initials/${user.email}.svg`}
                                    />
                                </MenuButton>
                                <MenuList alignItems='center'>
                                    <br />
                                    <Center>
                                        <Avatar
                                        size='2xl'
                                        src={`https://avatars.dicebear.com/api/initials/${user.email}.svg`}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <Text as='b'>
                                            {user.email}
                                        </Text>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={() => {
                                        axios.post('/accounts/auth/jwt/logout')
                                        .then((result) => {
                                            setUser(null);
                                            // TODO redirect to public route
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                    }}>
                                        Log out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )
                        :
                        (
                            <Button
                            as={ReactLink}
                            colorScheme='blue'
                            to='/login'>Log in</Button>
                        )
                    }
                </HStack>
            </Flex>
            {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
                <Stack as={'nav'} spacing={1}>
                {NAV_ITEMS.map((navItem, index) => (
                    <NavLink key={index} to={navItem.to}>{navItem.label}</NavLink>
                ))}
                </Stack>
            </Box>
            ) : null}
        </Box>
    );
};

const NavLink = ({ to, children }) => {
    return (
        <Link
        as={ReactNavLink}
        px={2}
        py={1}
        rounded='md'
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
        to={to}>
            {children}
        </Link>
    );
}

export default Navbar;