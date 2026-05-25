import { cn } from "../../lib/utils";
import styles from "../../styles/modules/ui/Input.module.scss";

export function Input({ className, type = "text", ...props }) {
    return (
        <input
            type={type}
            className={cn(styles.input, className)}
            {...props}
        />
    );
}
