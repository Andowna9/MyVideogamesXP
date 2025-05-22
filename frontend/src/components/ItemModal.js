import {
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
Button,
FormControl,
FormLabel,
FormErrorMessage,
Select,
Slider,
SliderTrack,
SliderFilledTrack,
SliderThumb,
Tooltip,
NumberInput,
NumberInputField,
NumberInputStepper,
NumberIncrementStepper,
NumberDecrementStepper,
Box,
VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFormik } from 'formik';

const ItemModal = ({ headerTitle, onAction, actionName, isOpen, onClose, idField, initialState }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const formik = useFormik({
                        initialValues: initialState ||
                        { 
                            status: 'On Hold', 
                            progress: 0, 
                            score: '5.0'
                        },
                        onSubmit: (values, { resetForm }) => {
                            if (onAction) { 
                                onAction({...values, ...idField});
                                resetForm();
                                onClose();
                            }
                        },
                        enableReinitialize: true
                    });

    const closeModal = () => {
        formik.resetForm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{headerTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={2}>
                        <FormControl>
                            <FormLabel>Status:</FormLabel>
                            <Select
                            name='status'
                            value={formik.values.status}
                            onChange={formik.handleChange}>
                                <option value='On Hold'>On Hold</option>
                                <option value='Playing'>Playing</option>
                                <option value='Completed'>Completed</option>
                                <option value='Dropped'>Dropped</option>
                            </Select>
                            <FormErrorMessage></FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Progress:</FormLabel>
                            <Box px={2}>
                                <Slider
                                name='progress'
                                value={formik.values.progress}
                                min={0}
                                max={100}
                                colorScheme='blue'
                                aria-label='progress-slider' 
                                onChange={(val) => formik.setFieldValue('progress', val)}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip
                                    hasArrow
                                    colorScheme='blue'
                                    placement='top'
                                    isOpen={showTooltip}
                                    label={`${formik.values.progress}%`}
                                    >
                                        <SliderThumb />
                                    </Tooltip>
                                </Slider>
                            </Box>
                            <FormErrorMessage></FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Score:</FormLabel>
                            <NumberInput
                            name='score'
                            value={formik.values.score}
                            step={0.5}
                            min={1}
                            max={10}
                            precision={1}
                            onChange={(val) => formik.setFieldValue('score', val)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormErrorMessage></FormErrorMessage>
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} 
                    onClick={formik.handleSubmit}>
                        {actionName}
                    </Button>
                    <Button onClick={closeModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ItemModal;