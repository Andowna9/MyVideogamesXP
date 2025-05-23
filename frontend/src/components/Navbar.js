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
import { NavLink as ReactNavLink, Link as ReactLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from '../api/axiosInstance';

const NAV_ITEMS = [
    {
        label: 'Videogames',
        to: '/search/games',
        protected: false
    },

    {
        label: 'My list',
        to: '/my-list',
        protected: true
    }
]

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    
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
                        <NavLinkList user={user}/>
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
                                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.email}`}
                                    />
                                </MenuButton>
                                <MenuList alignItems='center'>
                                    <br />
                                    <Center>
                                        <Avatar
                                        size='2xl'
                                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.email}`}
                                        />
                                    </Center>
                                    <br />
                                    <Center padding={3}>
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
                                            navigate('/');
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
                <NavLinkList user={user}/>
                </Stack>
            </Box>
            ) : null}
        </Box>
    );
};

const NavLink = ({ to, children }) => {
    const backgroundColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Link
        as={ReactNavLink}
        px={2}
        py={1}
        to={to}
        rounded='md'
        _hover={{
            textDecoration: 'none',
            bg: backgroundColor,
          }}
        _activeLink={{ bg: backgroundColor }}
        >
            {children}
        </Link>
    );
}

const NavLinkList = ({user}) => {
    return NAV_ITEMS.map((navItem, index) => {
        if (!user && navItem.protected) {
            return null;
        }
        return <NavLink key={index} to={navItem.to}>{navItem.label}</NavLink>;
    });
}

export default Navbar;