import {
    Component, 
    Template, 
    For, 
    If,
    bootstrap, 
    Parent, 
    DynamicComponent} from 'angular2/angular2';
import MovieFactory from './services/movieFactory';


@Component({
    selector: 'hello', 
    services: [MovieFactory]
})
@Template({
    directives: [Tabs],
    inline: `
      <tabs>
      </tabs>
    `,
})
export class Hello {
    constructor(movieFactory: MovieFactory) {
        this.factory = movieFactory;
        this.list = [];
        this.factory.getMovies()
            .then(mov => {
                mov.movies.forEach(movie => {
                    movie.active = this.list.length === 0;
                    this.list.push({
                        title: movie.title, desc: movie.description, active: movie.active
                    });
                });
            });
    }
}


@Component({
    selector: 'tabs',
    services: [],
})
@Template({
    inline: `
        <ul>
            <li *for="#tab of tabs; #i = index" (click)="selectTab(tab, i)">
                {{tab.title}}
            </li>
        </ul>
        <div *if="tabs[index]">
            {{tabs[index].desc}}
        </div>
    `,
    directives: [For, If]
})
export class Tabs {
    constructor(@Parent() hello: Hello) {
        this.tabs = [];
        this.index = 0;
        setTimeout(() =>  {
            if (hello.list.length) {
                hello.list.forEach(t => {
                    this.tabs.push(t);
                });
            }
        }, 100);   
    }

    selectTab(tab, i) {
        this.index = i;
    }
}

export function main() {
    return bootstrap(Hello);
}