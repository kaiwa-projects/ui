<script lang="ts" module>
    import type { WithElementRef } from "$lib/utils";
    import { cn } from "$lib/utils";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { type VariantProps, tv } from "tailwind-variants";

    const variants = tv({
        slots: {
            base: "w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 me-2 rounded"
        },
        variants: {
            color: {
                primary: {
                    base: "bg-white text-red-200"
                }
            }
        },
        defaultVariants: {
            color: "primary"
        }
    });

    export type CheckboxColor = VariantProps<typeof variants>["color"];
    export type CheckboxProps = WithElementRef<
        Omit<HTMLInputAttributes, "size"> & {
            for?: string;
            label?: string;
            color?: "primary";
        }
    >;
</script>

<script lang="ts">
    let {
        disabled = false,
        label = "",
        for: htmlFor,
        color = "primary",
        checked = $bindable(false),
        indeterminate = $bindable(false),

        class: className,
        ref = $bindable(null),
        children,
        ...restProps
    }: CheckboxProps = $props();

    const { base } = $derived(variants({ color }));
</script>

<input
    type="checkbox"
    bind:this={ref}
    bind:checked
    bind:indeterminate
    {...restProps}
    class={cn(base(), className)}
/>
{#if children}
    {@render children()}
{:else if label !== ""}
    <label for={htmlFor}>{label}</label>
{/if}
