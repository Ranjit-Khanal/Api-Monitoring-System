import { cn } from "../../lib/utils";
import styles from "../../styles/modules/ui/Badge.module.scss";

export function Badge({ className, variant = "default", children, ...props }) {
    const variants = {
        default: styles.default,
        secondary: styles.secondary,
        destructive: styles.destructive,
        outline: styles.outline,
        success: styles.success,
        warning: styles.warning,
    };

    return (
        <span
            className={cn(
                styles.badge,
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
