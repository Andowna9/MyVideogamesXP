import { Stack, FormControl, FormLabel, Input, Link, Button, FormErrorMessage, useToast } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const SignupForm = () => {
    const toast = useToast();
    const navigate = useNavigate();

    return (
        <Formik
        initialValues={{
            email: '', 
            password: '', 
            confirmPassword: ''
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
            else if(!values.confirmPassword) {
                errors.confirmPassword = 'Password confirmation missing';
            }
            else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password confirmation does not match';
            }

            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            axios.post('/accounts/auth/register', {
                email: values.email,
                password: values.password
            })
            .then((result) => {
                navigate('/login');
            }).catch((error) => {
                console.log(error.response);
                let errorMessage = error.response.data.detail;
                if (errorMessage === 'REGISTER_USER_ALREADY_EXISTS') {
                    errorMessage = 'Account already exists!';
                }
                toast({
                    title: 'Error',
                    description: errorMessage,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
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
                        <Field name='confirmPassword'>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                    <FormLabel>Confirm password:</FormLabel>
                                    <Input type='password' {...field} />
                                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
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
                            Sign up
                        </Button>
                        <Link 
                        as={ReactLink}
                        color={'blue.400'}
                        textAlign='center' 
                        to='/login'>
                            Already a user?
                        </Link>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default SignupForm;