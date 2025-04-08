<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Button from "$lib/components/Button.svelte";
    import { fn } from "@storybook/test";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Example/Button",
        component: Button,
        tags: ["autodocs"],
        argTypes: {
            color: {
                control: { type: "select" },
                options: ["primary", "secondary"],
                defaultValue: "primary"
            },
            size: {
                control: { type: "select" },
                options: ["small", "medium", "large"],
                defaultValue: "medium"
            }
        },
        args: {
            onClick: fn()
        }
    });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ label: "Button" }} />
<Story name="Secondary" args={{ color: "secondary", label: "Button" }} />
<Story name="Small" args={{ size: "small", label: "Button" }} />
<Story name="Medium" args={{ size: "medium", label: "Button" }} />
<Story name="Large" args={{ size: "large", label: "Button" }} />
