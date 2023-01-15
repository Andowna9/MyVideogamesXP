import {
Image,
AspectRatio
} from '@chakra-ui/react';
import { PUBLIC_URL } from '../config';

const GameCover = ({ src, width, maxW, minW }) => {
    return (
        <AspectRatio 
        ratio={3 / 4}
        width={width}
        maxW={maxW}
        minW={minW}
        >
            <Image
            src={src}
            fallbackSrc={PUBLIC_URL + '/nocover.png'}
            alt='Game cover'
            borderRadius='md'
            />
        </AspectRatio>
    );
}
    
export default GameCover;