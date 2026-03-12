import { type SchemaTypeDefinition } from "sanity";
import { page } from "./page";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { whatWeDoPage } from "./whatWeDoPage";
import { post } from "./post";
import { publicationsPage } from "./publicationsPage";
import { resource } from "./resource";
import { resourcesPage } from "./resourcesPage";
import { faqPage } from "./faqPage";
import { membersPage } from "./membersPage";
import { contactPage } from "./contactPage";
import { recurseroPage } from "./recurseroPage";
import { entrepreneur } from "./entrepreneur";
import { entrepreneursPage } from "./entrepreneursPage";
import { book } from "./book";
import { booksPage } from "./booksPage";
import { encuentro } from "./encuentro";
import { taller } from "./taller";
import { footerSettings } from "./footerSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page,
    homePage,
    aboutPage,
    whatWeDoPage,
    post,
    publicationsPage,
    resource,
    resourcesPage,
    faqPage,
    membersPage,
    contactPage,
    recurseroPage,
    entrepreneur,
    entrepreneursPage,
    book,
    booksPage,
    encuentro,
    taller,
    footerSettings,
  ],
};
