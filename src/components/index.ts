import Button from "./Button";
import createFooter from "./createFooter";
import createLicense from "./createLicense";
import Modal from "./Modal";

export { default as Button } from "./Button";
export { default as Chancellor } from "./Chancellor";
export * from "./gameAssets";
export { default as Modal } from "./Modal";
export type { ModalProps } from "./Modal";
export { default as President } from "./President";

export const Footer = createFooter(Button, createLicense(Modal));
