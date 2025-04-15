<script module>
    import { defineMeta, setTemplate } from "@storybook/addon-svelte-csf";
    import type { Args, StoryContext } from "@storybook/addon-svelte-csf";

    import Button from "$lib/components/Button.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "General/Button",
        component: Button,
        tags: ["autodocs"],
        argTypes: {
            label: {
                defaultValue: ""
            },
            loading: {
                control: { type: "boolean" },
                defaultValue: false
            },
            color: {
                control: { type: "select" },
                options: ["primary", "secondary"],
                defaultValue: "secondary"
            },
            size: {
                control: { type: "select" },
                options: ["sm", "md", "lg"],
                defaultValue: "sm"
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
    <Button {...args}>Button</Button>
{/snippet}

<Story name="Primary" />
<Story name="Secondary" args={{ color: "secondary" }} />
<Story name="Small" args={{ size: "sm" }} />
<Story name="Medium" args={{ size: "md" }} />
<Story name="Large" args={{ size: "lg" }} />
