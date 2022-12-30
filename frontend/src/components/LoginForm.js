import { Stack, FormControl, FormLabel, Input, Button, FormErrorMessage, Link, useToast } from '@chakra-ui/react';
import {Field, Form, Formik} from 'formik';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from '../api/axiosInstance';

const LoginForm = () => {
    const toast = useToast();
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    return (
        <Formik
        initialValues={{
            email: '', 
            password: ''
        }}
        validate={(values) => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Email is required';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            }

            return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.set('username', values.email);
            formData.set('password', values.password);
            try {
                await axios.post('/accounts/auth/jwt/login', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const result = axios.get('/accounts/users/me');
                setUser(result.data);
                navigate('/');
            }
            catch(error) {
                console.log(error.response);
                let errorMessage = error.response.data.detail;
                if (errorMessage === 'LOGIN_BAD_CREDENTIALS') {
                    errorMessage = 'Invalid credentials!'
                }
                toast({
                    title: 'Error',
                    description: errorMessage,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }

            finally {
                setSubmitting(false);
            }
        }}
        >
            {({ isSubmitting }) => (
            
                <Form>
                    <Stack spacing={4}>
                        <Field name='email'>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel>Email:</FormLabel>
                                    <Input type='email' {...field} />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='password'>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel>Password:</FormLabel>
                                    <Input type='password' {...field} />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                    </Stack>

                    <Stack spacing={8} pt={2}>
                        <Button
                        mt={4}
                        colorScheme='blue'
                        isLoading={isSubmitting}
                        type='submit'
                        >
                            Log in
                        </Button>
                        <Button
                        onClick={() => {
                            axios.get('/accounts/auth/google/authorize')
                            .then((result) => {
                                const authURL = result.data['authorization_url'];
                                window.open(authURL, '_self');
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        }}>
                            Log in with Google
                        </Button>
                        <Link 
                        as={ReactLink}
                        color={'blue.400'}
                        textAlign='center' 
                        to='/signup'>
                            Not signed up yet?
                        </Link>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;