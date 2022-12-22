import {
Image
} from '@chakra-ui/react';
import { PUBLIC_URL } from '../config';

const GameCover = ({src, ...props}) => {
    return (
        <Image
        src={src}
        fallbackSrc={PUBLIC_URL + '/nocover.png'}
        borderRadius='md'
        {...props}
        />
    );
}
    
export default GameCover;