<script lang="ts" module>
    import type { WithElementRef } from "$lib/utils";
    import { cn } from "$lib/utils";
    import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
    import { type VariantProps, tv } from "tailwind-variants";

    const variants = tv({
        slots: {
            base: "block border border-gray-300 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
        }
    });

    export type InputType = Exclude<HTMLInputTypeAttribute, "file">;
    export type InputProps = WithElementRef<
        Omit<HTMLInputAttributes, "type"> & {
            type?: InputType;
            for?: string;
            label?: string;
        }
    >;
</script>

<script lang="ts">
    let {
        for: htmlFor,
        label = "",
        ref = $bindable(null),
        value = $bindable(),
        type = "text",
        files = $bindable(),
        class: className,
        ...restProps
    }: InputProps = $props();

    const { base } = $derived(variants({}));
</script>

<div>
    {#if label !== ""}
        <label for={htmlFor} class="block text-sm/6 font-medium text-gray-900">{label}</label>
    {/if}
    <div class="mt-2">
        <input
            bind:this={ref}
            bind:value
            type="email"
            class={cn(base(), className)}
            {...restProps}
        />
    </div>
</div>
