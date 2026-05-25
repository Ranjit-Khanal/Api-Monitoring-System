import { cn } from "../../lib/utils";
import styles from "../../styles/modules/ui/Button.module.scss";

export function Button({ className, variant = "default", size = "default", children, ...props }) {
    const variants = {
        default: styles.default,
        destructive: styles.destructive,
        outline: styles.outline,
        secondary: styles.secondary,
        ghost: styles.ghost,
        link: styles.link,
    };

    const sizes = {
        default: styles.sizeDefault,
        sm: styles.sizeSm,
        lg: styles.sizeLg,
        icon: styles.sizeIcon,
    };

    return (
        <button
            className={cn(
                styles.button,
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
