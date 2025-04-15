<script lang="ts" module>
    import type { WithElementRef } from "$lib/utils";
    import { cn } from "$lib/utils";
    import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
    import { tv } from "tailwind-variants";

    const variants = tv({
        slots: {
            base: "col-start-1 row-start-1 block border grow bg-white text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 w-full px-3 py-1.5 text-base outline outline-1 -outline-offset-1 focus:outline focus:outline-1 focus:-outline-offset-1 sm:text-sm/6",
            icon: "pointer-events-none col-start-1 row-start-1 size-5 self-center sm:size-4",
            prefix: "flex shrink-0 items-center rounded-l-md bg-white px-3 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6",
            suffix: "-ml-px flex shrink-0 items-center rounded-r-md bg-white px-3 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6"
        },
        variants: {
            iconPosition: {
                leading: {
                    base: "pl-10 pr-3 sm:pl-9",
                    icon: "ml-3"
                },
                trailing: {
                    base: "pl-3 pr-10 sm:pr-9",
                    icon: "mr-3 justify-self-end"
                },
                none: {}
            },
            prefix: {
                true: {
                    base: "-ml-px rounded-r-md"
                }
            },
            suffix: {
                true: {
                    base: "rounded-l-md"
                }
            },
            error: {
                true: {
                    base: "outline-red-300 focus:outline-red-300 border-red-300 bg-red-50/25 text-red-600 placeholder:text-red-300",
                    prefix: "outline-red-300 focus:outline-red-300 border-red-300",
                    suffix: "outline-red-300 focus:outline-red-300 border-red-300"
                }
            }
        },
        compoundVariants: [
            {
                prefix: true,
                suffix: true,
                class: "-ml-px rounded-none"
            },
            {
                prefix: false,
                suffix: false,
                class: "rounded-md"
            }
        ]
    });

    export type InputType = Exclude<HTMLInputTypeAttribute, "file">;
    export type InputProps = WithElementRef<
        Omit<HTMLInputAttributes, "type"> & {
            type?: InputType;
            for?: string;
            label?: string;
            hint?: string;
            error?: string;
            iconName?: string;
            iconPosition?: "leading" | "trailing";
            prefixLabel?: string;
            suffixLabel?: string;
        }
    >;
</script>

<script lang="ts">
    import Icon from "@iconify/svelte";

    let {
        type = "text",
        for: htmlFor,
        label = "",
        hint = "",
        error = "",
        iconName = "",
        iconPosition = "leading",
        prefixLabel = "",
        suffixLabel = "",

        class: className,
        ref = $bindable(null),
        value = $bindable(),
        files = $bindable(),
        ...restProps
    }: InputProps = $props();

    const { base, icon, prefix, suffix } = $derived(
        variants({
            iconPosition: iconName !== "" ? iconPosition : "none",
            error: error !== "",
            prefix: prefixLabel !== "",
            suffix: suffixLabel !== ""
        })
    );
</script>

<div>
    {#if label !== ""}
        <label for={htmlFor} class="block text-sm/6 font-medium text-gray-900">{label}</label>
    {/if}
    <div class="mt-2 flex">
        {#if prefixLabel !== ""}
            <div class={cn(prefix())}>
                {prefixLabel}
            </div>
        {/if}
        <div class="-mr-px grid grow grid-cols-1 focus-within:relative">
            <input bind:this={ref} bind:value {type} class={cn(base(), className)} {...restProps} />
            {#if iconName}
                <Icon inline icon={iconName} class={cn(icon())}></Icon>
            {/if}
        </div>
        {#if suffixLabel !== ""}
            <div class={cn(suffix())}>
                {suffixLabel}
            </div>
        {/if}
    </div>
    {#if error !== ""}
        <p class="mt-2 text-xs text-red-600">
            {error}
        </p>
    {/if}
</div>
