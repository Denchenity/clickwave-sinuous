import {o, html} from 'sinuous';

import ClickWave from './clickwave/clickwave';


const App = (props) => {

    const isOpen = o(false);

    const toggle = (condition) => {
        isOpen(condition);
    }

    return html`<div>
        <div class="block">
            Пункт меню
            ${ClickWave({condition: isOpen, toggle})}
        </div>
    </div>`;
}

export default App;