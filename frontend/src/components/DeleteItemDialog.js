import {
AlertDialog,
AlertDialogBody,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogContent,
AlertDialogOverlay,
Button
} from '@chakra-ui/react';
import { useRef } from 'react';

const DeleteItemDialog = ({ isOpen, onAction, onClose }) => {
    const cancelRef = useRef();

    return (
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Game Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to remove this game from your list?
              You will lose track of saved data.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button 
              colorScheme='red' 
              onClick={() => {
                if (onAction) {
                  onAction();
                  onClose();
                }
              }} 
              ml={3}>
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
};

export default DeleteItemDialog;