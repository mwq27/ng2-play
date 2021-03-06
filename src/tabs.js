import {
    Component, 
    Template, 
    For, 
    bootstrap, 
    Parent, 
    DynamicComponent} from 'angular2/angular2';
import MovieFactory from './services/movieFactory';


@Component({
    selector: 'hello', 
    services: [MovieFactory]
})
@Template({
    directives: [Tab, Tabs, For],
    inline: `
      <tabs>
        <tab *for="#mov of list; #i=index" [tab-title]="mov.title">{{mov.desc}}</tab>
      </tabs>
    `,
})
export class Hello {
    constructor(movieFactory: MovieFactory) {
        this.factory = movieFactory;
        this.list = [{title: 'first title', desc: 'first desc'}];
        this.factory.getMovies()
            .then(mov => {
                mov.movies.forEach(movie => {
                    this.list.push({
                        title: movie.title, desc: movie.description
                    });
                    console.debug(this.list);
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
        console.log('the tab', tab);
        
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
    directives: [Tabs],
    inline: `
        <div [hidden]="!active">
            <content></content>
        </div>
    `
})
export class Tab {
    constructor(@Parent() tabs: Tabs) {
        tabs.addTab(this);
    }
}
export function main() {
    return bootstrap(Hello);
}