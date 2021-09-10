import Button from "./Button";
import createFooter from "./Footer";
import createLicense from "./License";
import Modal from "./Modal";

export { default as Button } from "./Button";
export { default as Chancellor } from "./Chancellor";
export * from "./gameAssets";
export { default as Modal } from "./Modal";
export { default as President } from "./President";

export const Footer = createFooter(Button, createLicense(Modal));
