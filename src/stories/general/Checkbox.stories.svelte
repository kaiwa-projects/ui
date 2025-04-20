<script module>
    import { defineMeta, setTemplate } from "@storybook/addon-svelte-csf";
    import type { Args, StoryContext } from "@storybook/addon-svelte-csf";

    import Checkbox from "$lib/components/Checkbox.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "General/Checkbox",
        component: Checkbox,
        tags: ["autodocs"],
        parameters: {
            controls: {
                include: ["label", "color", "disabled", "checked", "indeterminate"]
            }
        },
        argTypes: {
            label: {
                defaultValue: ""
            },
            color: {
                control: { type: "select" },
                options: ["primary", "secondary"],
                defaultValue: "secondary"
            }
        },
        args: {
            onclick: fn()
        }
    });
</script>

<script lang="ts">
    setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
    <Checkbox {...args} />
{/snippet}

<Story name="Primary" />
