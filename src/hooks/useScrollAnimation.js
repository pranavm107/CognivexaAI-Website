import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (options = { once: true, amount: 0.3 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, options);

    return { ref, isInView };
};
