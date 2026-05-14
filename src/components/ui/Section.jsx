import React from 'react';
import { cn } from '@/utils/helpers';

export const Section = React.forwardRef(({
    className,
    id,
    children,
    container = true,
    fullWidth = false,
    background = "default", // default, muted, primary
    ...props
}, ref) => {
    const bgColors = {
        default: "bg-background",
        muted: "bg-muted",
        primary: "bg-primary",
    };

    return (
        <section
            id={id}
            ref={ref}
            className={cn(
                "py-16 md:py-24 lg:py-32",
                bgColors[background],
                className
            )}
            {...props}
        >
            {container ? (
                <div className={cn("container px-4 md:px-6", fullWidth && "max-w-none")}>
                    {children}
                </div>
            ) : (
                children
            )}
        </section>
    );
});

Section.displayName = "Section";
