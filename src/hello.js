import {Component, Template, bootstrap} from 'angular2/angular2';
import {Zippy} from 'zippy';

@Component({
  selector: 'hello'
})
@Template({
  inline: `<zippy title='Details'>
            <p>This is some content</p>
            </zippy>`,
  directives: [Zippy]
})
export class Hello {
    constructor(){
        console.debug('aisdnfioansdionf');
    }
}

bootstrap(Hello);