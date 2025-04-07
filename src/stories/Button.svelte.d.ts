interface Props {
	/** What background color to use */
	color?: "primary" | "secondary";
	/** How large should the button be? */
	size?: "small" | "medium" | "large";
	/** Button contents */
	label: string;
	/** The onclick event handler */
	onClick?: () => void;
}
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
