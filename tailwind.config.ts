import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "betpass-lightgrey": "#232A33",
        "betpass-grey": "#1a212a",
        "betpass-dark-grey": "#0D131B",
        "betpass-green": "#DAFB52",
      },
    },
  },
};
