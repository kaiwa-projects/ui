<script lang="ts">
    import { onDestroy } from "svelte";
    import "$vendor/ladda/ladda-themeless.css";
    import Icon from "@iconify/svelte";
    import { Spinner } from "spin.js";
    import { untrack } from "svelte";

    interface Props {
        icon?: string;
        progress?: number;
        loading?: boolean;
        disabled?: boolean;
        color?: "primary" | "secondary";
        size?: "small" | "medium" | "large";
        label: string;
        onClick?: () => void;
    }

    const {
        icon = "",
        progress = 0,
        loading = false,
        disabled = false,
        color = "primary",
        size = "medium",
        label,
        onClick
    }: Props = $props();

    let spinner = $state<Spinner | null>(null);
    const dloadingProp = $derived(loading ? { "data-loading": "" } : {});
    let buttonRef = $state<HTMLButtonElement>();
    let offsetWidth = $state<number>(0);
    let offsetHeight = $state<number>(0);
    let timer: number = 0;

    onDestroy(() => {
        spinner?.stop();
        spinner = null;
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
            color: "#fff",
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
                if (!spinner) {
                    spinner = createSpinner();

                    spinner.spin(
                        (buttonRef?.querySelector(".spinner") as HTMLElement) || undefined
                    );
                }
            });
        } else {
            untrack(() => {
                timer = setTimeout(() => {
                    if (spinner) {
                        spinner.stop();
                        spinner = null;
                    }

                    clearTimeout(timer);
                }, 1000);
            });
        }
    });

    const bgColor = $derived(
        color === "primary"
            ? "bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-400"
            : "bg-white text-gray-900 hover:bg-gray-100 ring-1 ring-gray-300 ring-inset disabled:bg-gray-50"
    );

    const buttonSize = $derived(
        size === "small"
            ? "rounded-sm px-2 py-1"
            : size === "medium"
              ? "rounded-md bg-indigo-600 px-4 py-2"
              : "rounded-md bg-indigo-600 px-6 py-3"
    );

    const textSize = $derived(size === "small" ? "text-xs" : "text-sm");
    const iconSize = $derived(size === "small" ? 12 : 16);
</script>

<button
    {...dloadingProp}
    data-style="zoom-in"
    data-size="xs"
    class="button {bgColor} {buttonSize}"
    bind:this={buttonRef}
    bind:offsetWidth
    bind:offsetHeight
    disabled={disabled || loading}
>
    <span class="label inline-flex items-center justify-center gap-x-1">
        <Icon icon="famicons:home-outline" height={iconSize} />
        <span class={textSize}>{label}</span>
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

    .button {
        position: relative;
    }
    .button .spinner {
        position: absolute;
        z-index: 2;
        display: inline-block;
        width: 32px;
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
        transition: 0.1s linear all !important;
    }
    .button[data-loading] .progress {
        display: block;
    }
    .button,
    .button .spinner,
    .button .label {
        transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) all !important;
    }
    .button[data-style="zoom-in"],
    .button[data-style="zoom-in"] .spinner,
    .button[data-style="zoom-in"] .label,
    .button[data-style="zoom-out"],
    .button[data-style="zoom-out"] .spinner,
    .button[data-style="zoom-out"] .label {
        transition: 0.3s ease all !important;
    }
    .button[data-style="expand-right"] .spinner {
        right: -6px;
    }
    .button[data-style="expand-right"][data-size="s"] .spinner,
    .button[data-style="expand-right"][data-size="xs"] .spinner {
        right: -12px;
    }
    .button[data-style="expand-right"][data-loading] {
        padding-right: 56px;
    }
    .button[data-style="expand-right"][data-loading] .spinner {
        opacity: 1;
    }
    .button[data-style="expand-right"][data-loading][data-size="s"],
    .button[data-style="expand-right"][data-loading][data-size="xs"] {
        padding-right: 40px;
    }
    .button[data-style="expand-left"] .spinner {
        left: 26px;
    }
    .button[data-style="expand-left"][data-size="s"] .spinner,
    .button[data-style="expand-left"][data-size="xs"] .spinner {
        left: 4px;
    }
    .button[data-style="expand-left"][data-loading] {
        padding-left: 56px;
    }
    .button[data-style="expand-left"][data-loading] .spinner {
        opacity: 1;
    }
    .button[data-style="expand-left"][data-loading][data-size="s"],
    .button[data-style="expand-left"][data-loading][data-size="xs"] {
        padding-left: 40px;
    }
    .button[data-style="expand-up"] {
        overflow: hidden;
    }
    .button[data-style="expand-up"] .spinner {
        top: -32px;
        left: 50%;
        margin-left: 0;
    }
    .button[data-style="expand-up"][data-loading] {
        padding-top: 54px;
    }
    .button[data-style="expand-up"][data-loading] .spinner {
        opacity: 1;
        top: 26px;
        margin-top: 0;
    }
    .button[data-style="expand-up"][data-loading][data-size="s"],
    .button[data-style="expand-up"][data-loading][data-size="xs"] {
        padding-top: 32px;
    }
    .button[data-style="expand-up"][data-loading][data-size="s"] .spinner,
    .button[data-style="expand-up"][data-loading][data-size="xs"] .spinner {
        top: 4px;
    }
    .button[data-style="expand-down"] {
        overflow: hidden;
    }
    .button[data-style="expand-down"] .spinner {
        top: 62px;
        left: 50%;
        margin-left: 0;
    }
    .button[data-style="expand-down"][data-size="s"] .spinner,
    .button[data-style="expand-down"][data-size="xs"] .spinner {
        top: 40px;
    }
    .button[data-style="expand-down"][data-loading] {
        padding-bottom: 54px;
    }
    .button[data-style="expand-down"][data-loading] .spinner {
        opacity: 1;
    }
    .button[data-style="expand-down"][data-loading][data-size="s"],
    .button[data-style="expand-down"][data-loading][data-size="xs"] {
        padding-bottom: 32px;
    }
    .button[data-style="slide-left"] {
        overflow: hidden;
    }
    .button[data-style="slide-left"] .label {
        position: relative;
    }
    .button[data-style="slide-left"] .spinner {
        left: 100%;
        margin-left: 0;
    }
    .button[data-style="slide-left"][data-loading] .label {
        opacity: 0;
        left: -100%;
    }
    .button[data-style="slide-left"][data-loading] .spinner {
        opacity: 1;
        left: 50%;
    }
    .button[data-style="slide-right"] {
        overflow: hidden;
    }
    .button[data-style="slide-right"] .label {
        position: relative;
    }
    .button[data-style="slide-right"] .spinner {
        right: 100%;
        margin-left: 0;
        left: 16px;
    }
    [dir="rtl"] .button[data-style="slide-right"] .spinner {
        right: auto;
    }
    .button[data-style="slide-right"][data-loading] .label {
        opacity: 0;
        left: 100%;
    }
    .button[data-style="slide-right"][data-loading] .spinner {
        opacity: 1;
        left: 50%;
    }
    .button[data-style="slide-up"] {
        overflow: hidden;
    }
    .button[data-style="slide-up"] .label {
        position: relative;
    }
    .button[data-style="slide-up"] .spinner {
        left: 50%;
        margin-left: 0;
        margin-top: 1em;
    }
    .button[data-style="slide-up"][data-loading] .label {
        opacity: 0;
        top: -1em;
    }
    .button[data-style="slide-up"][data-loading] .spinner {
        opacity: 1;
        margin-top: 0;
    }
    .button[data-style="slide-down"] {
        overflow: hidden;
    }
    .button[data-style="slide-down"] .label {
        position: relative;
    }
    .button[data-style="slide-down"] .spinner {
        left: 50%;
        margin-left: 0;
        margin-top: -2em;
    }
    .button[data-style="slide-down"][data-loading] .label {
        opacity: 0;
        top: 1em;
    }
    .button[data-style="slide-down"][data-loading] .spinner {
        opacity: 1;
        margin-top: 0;
    }
    .button[data-style="zoom-out"] {
        overflow: hidden;
    }
    .button[data-style="zoom-out"] .spinner {
        left: 50%;
        margin-left: 32px;
        transform: scale(2.5);
    }
    .button[data-style="zoom-out"] .label {
        position: relative;
    }
    .button[data-style="zoom-out"][data-loading] .label {
        opacity: 0;
        transform: scale(0.5);
    }
    .button[data-style="zoom-out"][data-loading] .spinner {
        opacity: 1;
        margin-left: 0;
        transform: none;
    }
    .button[data-style="zoom-in"] {
        overflow: hidden;
    }
    .button[data-style="zoom-in"] .spinner {
        left: 50%;
        margin-left: -16px;
        transform: scale(0.2);
    }
    .button[data-style="zoom-in"] .label {
        position: relative;
    }
    .button[data-style="zoom-in"][data-loading] .label {
        opacity: 0;
        transform: scale(2.2);
    }
    .button[data-style="zoom-in"][data-loading] .spinner {
        opacity: 1;
        margin-left: 0;
        transform: none;
    }
    .button[data-style="contract"] {
        overflow: hidden;
        width: 100px;
    }
    .button[data-style="contract"] .spinner {
        left: 50%;
        margin-left: 0;
    }
    .button[data-style="contract"][data-loading] {
        border-radius: 50%;
        width: 52px;
    }
    .button[data-style="contract"][data-loading] .label {
        opacity: 0;
    }
    .button[data-style="contract"][data-loading] .spinner {
        opacity: 1;
    }
    .button[data-style="contract-overlay"] {
        overflow: hidden;
        width: 100px;
        box-shadow: 0px 0px 0px 2000px rgba(0, 0, 0, 0);
    }
    .button[data-style="contract-overlay"] .spinner {
        left: 50%;
        margin-left: 0;
    }
    .button[data-style="contract-overlay"][data-loading] {
        border-radius: 50%;
        width: 52px;
        box-shadow: 0px 0px 0px 2000px rgba(0, 0, 0, 0.8);
    }
    .button[data-style="contract-overlay"][data-loading] .label {
        opacity: 0;
    }
    .button[data-style="contract-overlay"][data-loading] .spinner {
        opacity: 1;
    }
    [dir="rtl"] .spinner > div {
        left: 25% !important;
    }
</style>
