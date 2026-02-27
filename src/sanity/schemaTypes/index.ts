import { type SchemaTypeDefinition } from "sanity";
import { page } from "./page";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { whatWeDoPage } from "./whatWeDoPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page,
    homePage,
    aboutPage,
    whatWeDoPage, // ← add this
  ],
};
