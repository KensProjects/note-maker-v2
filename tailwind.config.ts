import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage:{
        desk:"url('/desk-svg-by-macrovector-on-Freepik.svg')"
      }
    },
  },
  plugins: [],
} satisfies Config;
