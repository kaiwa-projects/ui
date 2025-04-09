<script lang="ts">
    import Icon from "@iconify/svelte";

    interface Props {
        icon?: string;
        color?: "primary" | "secondary";
        size?: "small" | "medium" | "large";
        label: string;
        loading: boolean;
        onClick?: () => void;
    }

    const {
        icon = "",
        size = "medium",
        color = "primary",
        label,
        loading = false,
        onClick
    }: Props = $props();

    const bgColor = $derived(
        color === "primary"
            ? "bg-indigo-600 text-white hover:bg-indigo-500"
            : "bg-white text-gray-900 hover:bg-gray-100 ring-1 ring-gray-300 ring-inset"
    );

    const buttonSize = $derived(
        size === "small"
            ? "rounded-sm px-2 py-1 text-xs"
            : size === "medium"
              ? "rounded-md bg-indigo-600 px-4 py-2 text-sm"
              : "rounded-md bg-indigo-600 px-6 py-3 text-sm"
    );

    const iconSize = $derived(size === "small" ? 12 : size === "medium" ? 14 : 16);
    const iconColor = $derived(color === "primary" ? "text-white" : "text-gray-900");
</script>

<button
    type="button"
    class={`shadow-xs inline-flex items-center gap-x-2 overflow-hidden text-sm font-semibold ${buttonSize} ${bgColor}`}
    onclick={onClick}
>
    {#if loading}
        <Icon class={`${iconColor}`} icon="svg-spinners:180-ring-with-bg" height={iconSize} />
    {/if}
    <span class={size !== "small" ? "-mb-0.5" : ""}>
        {label}
    </span>
</button>
