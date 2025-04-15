<script module>
    import { defineMeta, setTemplate } from "@storybook/addon-svelte-csf";
    import type { Args, StoryContext } from "@storybook/addon-svelte-csf";

    import ColorPalette from "$lib/components/ColorPalette.svelte";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Global/Color",
        component: ColorPalette
    });
</script>

<script lang="ts">
    setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
    <ColorPalette title="Slate" subtitle="tailwind.slate" />
    <ColorPalette title="Gray" subtitle="tailwind.gray" />
    <ColorPalette title="Zinc" subtitle="tailwind.zinc" />
    <ColorPalette title="Neutral" subtitle="tailwind.neutral" />
    <ColorPalette title="Stone" subtitle="tailwind.stone" />
    <ColorPalette title="Red" subtitle="tailwind.red" />
    <ColorPalette title="Orange" subtitle="tailwind.orange" />
    <ColorPalette title="Amber" subtitle="tailwind.amber" />
    <ColorPalette title="Yellow" subtitle="tailwind.yellow" />
    <ColorPalette title="Lime" subtitle="tailwind.lime" />
    <ColorPalette title="Green" subtitle="tailwind.green" />
    <ColorPalette title="Emerald" subtitle="tailwind.emerald" />
    <ColorPalette title="Teal" subtitle="tailwind.teal" />
    <ColorPalette title="Cyan" subtitle="tailwind.cyan" />
    <ColorPalette title="Sky" subtitle="tailwind.sky" />
    <ColorPalette title="Blue" subtitle="tailwind.blue" />
    <ColorPalette title="Indigo" subtitle="tailwind.indigo" />
    <ColorPalette title="Violet" subtitle="tailwind.violet" />
    <ColorPalette title="Purple" subtitle="tailwind.purple" />
    <ColorPalette title="Fuchsia" subtitle="tailwind.fuchsia" />
    <ColorPalette title="Pink" subtitle="tailwind.pink" />
    <ColorPalette title="Rose" subtitle="tailwind.rose" />
{/snippet}

<Story name="Colors" />
