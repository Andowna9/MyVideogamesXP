import {
Box,
Flex,
Stack,
HStack, 
Link, 
Text,
Button,
IconButton,
useDisclosure,
useColorMode, 
useColorModeValue
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const NAV_ITEMS = [
    {
        'label': 'Videogames',
        'href': '/'
    },

    {
        'label': 'My list',
        'href': '/my-list'
    }
]

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    
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
                            <NavLink key={index} href={navItem.href}>{navItem.label}</NavLink>
                        ))}
                    </HStack>
                </HStack>
                <HStack>
                    <IconButton 
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
                    <Button
                    as='a'
                    colorScheme='blue'
                    href='/login'>Log in</Button>
                </HStack>
            </Flex>
            {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
                <Stack as={'nav'} spacing={1}>
                {NAV_ITEMS.map((navItem, index) => (
                    <NavLink key={index} href={navItem.href}>{navItem.label}</NavLink>
                ))}
                </Stack>
            </Box>
            ) : null}
        </Box>
    );
};

const NavLink = ({ href, children }) => {
    return (
        <Link
        px={2}
        py={1}
        rounded='md'
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
          href={href}>
            {children}
        </Link>
    );
}

export default Navbar;