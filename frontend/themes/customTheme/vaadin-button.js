// import the non-themed component
import '@vaadin/vaadin-button/src/vaadin-button.js';
// optional: reuse lumo styles for button
import '@vaadin/vaadin-button/theme/lumo/vaadin-
button-styles.js';
import { html } from
'@polymer/polymer/lib/utils/html-tag.js';
// set your custom CSS rules for button.
// Use an unique id for the dom-module.
const $_documentContainer = html`
<dom-module id="my-lumo-button"
theme-for="vaadin-button">
<template>
<style>
:host {
    #background: green;
}
</style>
</template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);