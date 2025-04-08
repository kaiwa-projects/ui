<script lang="ts">
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

    const { color = "primary", size = "medium", label, onClick }: Props = $props();

    const bgColor = $derived(
        color === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-slate-600 text-slate-600 hover:bg-slate-200"
    );

    const buttonSize = $derived(
        size === "small" ? "px-2 py-1 text-sm" : size === "medium" ? "px-4 py-2" : "px-8 py-4"
    );
</script>

<button type="button" class={`rounded-md ${buttonSize} ${bgColor}`} onclick={onClick}>
    {label}
</button>
