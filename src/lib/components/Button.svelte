<script lang="ts" module>
    import type { WithElementRef } from "$lib/utils";
    import { cn } from "$lib/utils";
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
    import { type VariantProps, tv } from "tailwind-variants";

    import { onDestroy } from "svelte";
    import Icon from "@iconify/svelte";
    import { Spinner } from "spin.js";
    import { untrack } from "svelte";

    const variants = tv({
        slots: {
            base: "button relative overflow-hidden font-semibold",
            icon: "",
            lbl: "",
            spinner: ""
        },
        variants: {
            color: {
                primary: {
                    base: "bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-400",
                    icon: "text-white",
                    lbl: "text-white",
                    spinner: "#fff"
                },
                secondary: {
                    base: "bg-white text-gray-900 hover:bg-gray-100 ring-1 ring-gray-300 ring-inset disabled:bg-gray-50",
                    icon: "text-gray-900",
                    lbl: "text-gray-900",
                    spinner: "#000"
                }
            },
            size: {
                sm: {
                    base: "rounded-sm px-2 py-1",
                    icon: "text-xs",
                    lbl: "text-xs",
                    spinner: ""
                },
                md: {
                    base: "rounded-md px-4 py-2",
                    icon: "text-sm",
                    lbl: "text-sm",
                    spinner: ""
                },
                lg: {
                    base: "rounded-md px-6 py-3",
                    icon: "text-sm",
                    lbl: "text-sm",
                    spinner: ""
                }
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md"
        }
    });

    export type ButtonColor = VariantProps<typeof variants>["color"];
    export type ButtonSize = VariantProps<typeof variants>["size"];
    export type ButtonProps = WithElementRef<HTMLButtonAttributes> & {
        disabled?: HTMLButtonAttributes["disabled"];
        label: string;
        type?: HTMLButtonAttributes["type"];
        iconName?: string;
        progress?: number;
        loading?: boolean;
        color?: "primary" | "secondary";
        size?: "sm" | "md" | "lg";
    };
</script>

<script lang="ts">
    let {
        disabled = false,
        label = "",
        type = "button",
        iconName = "",
        progress = $bindable(0),
        loading = $bindable(false),
        color = "primary",
        size = "md",

        class: className,
        ref = $bindable(null),
        children,
        ...restProps
    }: ButtonProps = $props();

    const { base, icon, spinner, lbl } = $derived(variants({ color, size }));

    let spin = $state<Spinner | null>(null);
    const dloadingProp = $derived(loading ? { "data-loading": "" } : {});
    let offsetWidth = $state<number>(0);
    let offsetHeight = $state<number>(0);
    let timer: number = 0;

    onDestroy(() => {
        spin?.stop();
        spin = null;
        if (timer) {
            clearTimeout(timer);
        }
    });

    const createSpinner = () => {
        let height = offsetHeight * 0.7;
        let radius = height * 0.2;
        let length = radius * 0.6;
        let width = radius < 7 ? 2 : 3;

        return new Spinner({
            color: spinner({ color }),
            lines: 12,
            radius: radius,
            length: length,
            width: width,
            animation: "spinner-line-fade",
            top: "auto",
            left: "auto",
            className: ""
        });
    };

    $effect(() => {
        if (loading) {
            if (timer) {
                clearTimeout(timer);
            }
            untrack(() => {
                if (!spin) {
                    spin = createSpinner();

                    spin.spin((ref?.querySelector(".spinner") as HTMLElement) || undefined);
                }
            });
        } else {
            untrack(() => {
                timer = setTimeout(() => {
                    if (spin) {
                        spin.stop();
                        spin = null;
                    }

                    clearTimeout(timer);
                }, 1000);
            });
        }
    });
</script>

<button
    bind:this={ref}
    bind:offsetWidth
    bind:offsetHeight
    class={cn(
        base(),
        {
            "cursor-not-allowed": disabled
        },
        className
    )}
    data-slot="button"
    disabled={disabled || loading}
    {type}
    {...dloadingProp}
    {...restProps}
>
    <span class="label flex w-full items-center justify-center gap-2">
        {#if iconName}
            <Icon inline icon={iconName} class={cn(icon())}></Icon>
        {/if}
        <span class={cn(lbl())}>
            {#if label}
                {label}
            {:else}
                {@render children?.()}
            {/if}
        </span>
    </span>
    <span class="spinner"></span>
    {#if !!progress}
        <div
            class="progress"
            style:width="{Math.max(Math.min(progress || 0, 1), 0) * (offsetWidth || 0)}px"
        ></div>
    {/if}
</button>

<style>
    @keyframes -global-spinner-line-fade {
        0%,
        100% {
            opacity: 0.22;
        }
        1% {
            opacity: 1;
        }
    }
    .button .spinner {
        position: absolute;
        z-index: 2;
        display: inline-block;
        top: 50%;
        margin-top: 0;
        opacity: 0;
        pointer-events: none;
    }
    .button .label {
        position: relative;
        z-index: 3;
    }
    .button .progress {
        position: absolute;
        width: 0;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.2);
        display: none;
        transition: 0.2s linear all !important;
    }
    .button[data-loading] .progress {
        display: block;
    }
    .button,
    .button .spinner,
    .button .label {
        transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) all !important;
    }
    .button,
    .button .spinner,
    .button .label {
        transition: 0.25s ease all !important;
    }
    .button .spinner {
        left: 50%;
        transform: scale(0.2);
    }
    .button .label {
        position: relative;
    }
    .button[data-loading] .label {
        opacity: 0;
        transform: scale(2.2);
    }
    .button[data-loading] .spinner {
        opacity: 1;
        transform: none;
    }
</style>
