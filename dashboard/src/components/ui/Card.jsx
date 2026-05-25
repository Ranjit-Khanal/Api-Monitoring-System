import { cn } from "../../lib/utils";
import styles from "../../styles/modules/ui/Card.module.scss";

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(styles.card, className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }) {
    return (
        <div
            className={cn(styles.cardHeader, className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardTitle({ className, children, ...props }) {
    return (
        <h3
            className={cn(styles.cardTitle, className)}
            {...props}
        >
            {children}
        </h3>
    );
}

export function CardDescription({ className, children, ...props }) {
    return (
        <p
            className={cn(styles.cardDescription, className)}
            {...props}
        >
            {children}
        </p>
    );
}

export function CardContent({ className, children, ...props }) {
    return (
        <div className={cn(styles.cardContent, className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ className, children, ...props }) {
    return (
        <div
            className={cn(styles.cardFooter, className)}
            {...props}
        >
            {children}
        </div>
    );
}
