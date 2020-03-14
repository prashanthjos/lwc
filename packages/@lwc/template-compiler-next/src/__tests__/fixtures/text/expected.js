import { renderer } from 'lwc';
const { createText } = renderer;

export default function template(context) {
    let text;
    return {
        create() {
            text = createText("Hello world!\n");
        },
        insert(target, anchor) {
            insert(text, target);
        },
        update() {
            
        }
    }
}