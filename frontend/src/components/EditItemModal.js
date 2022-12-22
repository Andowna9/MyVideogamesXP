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
Select,
Slider,
SliderTrack,
SliderFilledTrack,
SliderThumb,
Tooltip,
Box,
VStack
} from '@chakra-ui/react';
import { useState } from 'react';

const EditItemModal = ({ isOpen, onClose }) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Game Item</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={2}>
                        <FormControl>
                            <FormLabel>Status:</FormLabel>
                            <Select placeholder='Select status'>
                                <option value='On Hold'>On Hold</option>
                                <option value='Playing'>Playing</option>
                                <option value='Completed'>Completed</option>
                                <option value='Dropped'>Dropped</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Progress:</FormLabel>
                            <Box px={2}>
                                <Slider
                                defaultValue={0}
                                min={0}
                                max={100}
                                colorScheme='blue'
                                aria-label='progress-slider' 
                                onChange={(val) => setSliderValue(val)}
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
                                    label={`${sliderValue}%`}
                                    >
                                        <SliderThumb />
                                    </Tooltip>
                                </Slider>
                            </Box>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Score:</FormLabel>
                            <Select placeholder='Select score'>
                                <option value='4'>4 - Bad</option>
                                <option value='6'>6 - Good</option>
                                <option value='8'>8 - Great</option>
                                <option value='9'>9 - Incredible</option>
                                <option value='10'>10 - Masterpiece</option>
                            </Select>
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditItemModal;