import { Flex, Stack, Heading, Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <Flex
        minH='90vh'
        align='center'
        justify='center'
        >
            <Box minWidth='400px' boxShadow='lg'>
                <Stack spacing={4} py={8} px={12}>
                    <Heading textAlign='center'>Log in</Heading>
                    <LoginForm />
                </Stack>
            </Box>
        </Flex>
    );
};

export default Login;