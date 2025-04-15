<script module>
    import { defineMeta, setTemplate } from "@storybook/addon-svelte-csf";
    import type { Args, StoryContext } from "@storybook/addon-svelte-csf";

    import Input from "$lib/components/Input.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "General/Input",
        component: Input,
        tags: ["autodocs"],
        parameters: {
            controls: {
                include: [
                    "label",
                    "value",
                    "placeholder",
                    "iconName",
                    "iconPosition",
                    "error",
                    "errors",
                    "prefixLabel",
                    "suffixLabel"
                ]
            }
        },
        argTypes: {
            label: {
                control: "text",
                defaultValue: ""
            },
            value: {
                control: "text",
                defaultValue: ""
            },
            placeholder: {
                control: "text",
                defaultValue: "Input field"
            },
            iconName: {
                control: "text",
                defaultValue: ""
            },
            iconPosition: {
                control: { type: "radio" },
                options: ["leading", "trailing"],
                defaultValue: "leading"
            },
            error: {
                control: "text",
                defaultValue: ""
            },
            errors: {
                control: "object",
                defaultValue: []
            },
            prefixLabel: {
                control: "text",
                defaultValue: ""
            },
            suffixLabel: {
                control: "text",
                defaultValue: ""
            }
        },
        args: {
            onchange: fn(),
            onblur: fn()
        }
    });
</script>

<script lang="ts">
    setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
    <Input {...args} />
{/snippet}

<Story name="Primary" />
