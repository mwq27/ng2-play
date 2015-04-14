import {
    Component, 
    Template, 
    For, 
    bootstrap, 
    Ancestor,
    DynamicComponent,
    PrivateComponentLoader,
    PrivateComponentLocation} from 'angular2/angular2';
import MovieFactory from './services/movieFactory';

@Component({
    selector: 'hello', 
    services: [MovieFactory]
})
@Template({
    directives: [For, Tabs, Tab],
    inline: `
      <tabs>
        <tab *for="var mov of list" [tab-title]="mov.title">{{mov.desc}}</tab>
      </tabs>
    `,
})
export class Hello {
    constructor(movieFactory: MovieFactory) {
        console.debug('doin it')
        this.factory = movieFactory;
        this.list = [];
        this.factory.getMovies()
            .then(mov => {
                mov.movies.forEach(movie => {
                    this.list.push({
                        title: movie.title, desc: movie.description
                    });
                });
            });
    }
}

@Component({
    selector: 'tabs'
})
@Template({
    inline: `
        <ul>
            <li *for="#tab of tabs" (click)="selectTab(tab)">
                {{tab.tabTitle}}
            </li>
        </ul>
        <content></content>
    `,
    directives: [For, Tab]
})
export class Tabs {
    constructor() {
        this.tabs = [];
    }

    addTab(tab: Tab) {
        if (this.tabs.length === 0) {
            tab.active = true
        }
        this.tabs.push(tab);
    }

    selectTab(tab: Tab) {
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
        tab.active = true;
    }
}

@Component({
    selector: 'tab',
    bind: {
        'tabTitle': 'tab-title'
    }
})
@Template({
    inline: `
        <div [hidden]="!active">
            <content></content>
        </div>
    `
})
export class Tab {
    constructor(@Ancestor() tabs: Tabs) {
        tabs.addTab(this);
    }
}
export function main() {
    return bootstrap(Hello);
}