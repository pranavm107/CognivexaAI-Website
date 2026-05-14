import React from 'react';
import { cn } from '@/utils/helpers';

const typographyVariants = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
};

export const Typography = ({
    variant = "p",
    className,
    as,
    children,
    ...props
}) => {
    const Component = as || (variant.startsWith('h') ? variant : 'p');

    return (
        <Component
            className={cn(typographyVariants[variant], className)}
            {...props}
        >
            {children}
        </Component>
    );
};
