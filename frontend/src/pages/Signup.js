import { Flex, Stack, Heading, Box } from "@chakra-ui/react";
import SignupForm from '../components/SignupForm';

const Signup = () => {
    return (
        <Flex
        minH='90vh'
        align='center'
        justify='center'
        >
            <Box minWidth='400px' boxShadow='lg'>
                <Stack spacing={4} py={8} px={12}>
                    <Heading textAlign='center'>Sign up</Heading>
                    <SignupForm />
                </Stack>
            </Box>
        </Flex>
    );
};

export default Signup;