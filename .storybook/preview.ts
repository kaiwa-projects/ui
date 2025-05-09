import type { Preview } from "@storybook/svelte";
import "../src/app.css";

const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                order: ["Global", "General", "*"]
            }
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
};

export default preview;
