<script module>
    import {
        defineMeta,
        setTemplate,
        type Args,
        type StoryContext
    } from "@storybook/addon-svelte-csf";

    import Input from "$lib/components/Input.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "General/Input",
        component: Input,
        tags: ["autodocs"],
        parameters: {
            controls: {
                include: ["label", "value", "placeholder"]
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
