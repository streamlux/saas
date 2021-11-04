import { ThemeOverride } from "@chakra-ui/react";

// Do not remove below imports, it's needed to make sure @emotion/react is included in the generated package.json file when we build our app for production.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Global } from "@emotion/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StyledComponent } from "@emotion/styled";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnimationOptions } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "babel-plugin-superjson-next";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { serialize } from "superjson";

type GlobalStyles = Pick<ThemeOverride, "styles">;

export default {
    styles: {
        global: {
            "html, body": {
            },
        },
    },
} as GlobalStyles;
