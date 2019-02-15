/// <reference types="jquery" />
//import { Packery } from 'packery';
import { default as Swal } from 'sweetalert2';
import { default as Draggabilly } from 'draggabilly';
/**
 * override packery type defs since theyre outdated
 */
declare var Packery: any;
declare var Draggabilly: any;

export module Dashboard {
    /**
     * Say Hello
     * @param name name
     */
    export function sayHello (name: string){
        Swal.fire(`Hello ${name}!`);
    }

    export function doDraggabilly(selector: string){
        console.log('starting doDraggabilly');
        let $widgets:JQuery = $(`${selector}`);
        let draggies: Draggabilly[] = [];
        for(var i=0;i<$widgets.length;i++){
            console.log(`drag ${i}`);
            let $widget = $widgets[i];
            let draggie = new Draggabilly($widget, {});
            draggies.push(draggie);
        }

    }

    export function doPackery(){
        let grid = document.querySelector('#grid');
        var p = new Packery('#grid', { itemSelector: '.widget', gutter: 10, stagger: 300 });
        p.layout();
    }




    export function logOrder(){
        let $widgets = $('.widget');
        
    }
}
export default Dashboard;

declare global{
    interface Window{ Dashboard?: any; }
}
window.Dashboard = Dashboard || {};