<script lang="ts" module>
    import type { WithElementRef } from "$lib/utils";
    import { cn } from "$lib/utils";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { type VariantProps, tv } from "tailwind-variants";

    const variants = tv({
        slots: {
            base: "col-start-1 row-start-1 appearance-none rounded border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 forced-colors:appearance-auto",
            label: "block font-medium text-sm/6"
        },
        variants: {
            color: {
                primary: {
                    base: "border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100",
                    label: "text-gray-800"
                },
                secondary: {
                    base: "border-gray-300 bg-white checked:border-gray-600 checked:bg-gray-600 indeterminate:border-gray-600 indeterminate:bg-gray-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 ",
                    label: "text-gray-800"
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

    const { base, label: vLabel } = $derived(variants({ color }));
</script>

<div class="flex gap-2">
    <div class="flex h-6 shrink-0 items-center">
        <div class="group grid size-4 grid-cols-1">
            <input
                type="checkbox"
                bind:this={ref}
                bind:checked
                bind:indeterminate
                {disabled}
                {...restProps}
                class={cn(base(), className)}
            />
            <svg
                fill="none"
                viewBox="0 0 14 14"
                class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
            >
                <path
                    d="M3 8L6 11L11 3.5"
                    stroke-width={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="opacity-0 group-has-[:checked]:opacity-100"
                />
                <path
                    d="M3 7H11"
                    stroke-width={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="opacity-0 group-has-[:indeterminate]:opacity-100"
                />
            </svg>
        </div>
    </div>
    {#if children}
        {@render children()}
    {:else if label !== ""}
        <label for={htmlFor} class={cn(vLabel())}>{label}</label>{" "}
    {/if}
</div>
