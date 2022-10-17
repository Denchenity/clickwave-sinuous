import {o, html} from 'sinuous';
import { map } from 'sinuous/map';

import './clickwave.scss';

const ClickWave = (props) => {

    const isActive = props.condition;

    const TIME_ANIMATION = 300;

    const waves = o([]);

    const getClickDirectionAndClass = (event) => {
        const width = event.target.offsetWidth;
        const current_x = event.offsetX;

        const one_part_of_width = width/3;
        const first_part = one_part_of_width;
        const second_part = one_part_of_width*2;
        const third_part = one_part_of_width*3;

        if(current_x > 0 && current_x <= first_part){
            return 'left';
        }
        else if(current_x >  first_part && current_x < second_part){
            return 'center';
        }
        else if(current_x >  second_part && current_x < third_part){
            return 'right';
        }
    };
    
    const clickHandler = (event) => {

        props.toggle(!props.condition());
        //step 1 начало анимации
        const classDirection = o(getClickDirectionAndClass(event));

        const classRunAnimation = o('animation');

        const activeClass = o(isActive() ? 'active-wave' : 'disactive-wave');
        
        const id = Date.now();

        const wave = {
            id,
            classDirection,
            classRunAnimation,
            activeClass,
        }
        waves([...waves(),wave]);

        //step 2 конец анимации
        setTimeout(()=> {
            classDirection('');
            classRunAnimation('')
            waves(waves().filter(el => el.id != id));
        }, TIME_ANIMATION);
    }

    return html`
        <div class="clickwave" onclick="${clickHandler}">
            ${map(waves, el => 
                html`
                    <div class="clickwave__wave ${el.classDirection} ${el.classRunAnimation} ${el.activeClass}"></div>
                `
            )}
        </div>
    `;
}


export default ClickWave;