import {
    Component, 
    Template, 
    For, 
    bootstrap, 
    Parent, 
    DynamicComponent,
    PrivateComponentLoader,
    PrivateComponentLocation} from 'angular2/angular2';
import MovieFactory from './services/movieFactory';


@Component({
    selector: 'hello', 
    services: [MovieFactory]
})
@Template({
    directives: [For, Tabs, Tab, DynamicComp],
    inline: `
      <tabs>
        <dynamic-comp *for="#mov of tabs; #i=index" [component]="mov" [tab-title]="mov.title">{{mov.desc}}</dynamic-comp>
      </tabs>
    `,
})
export class Hello {
    constructor(movieFactory: MovieFactory) {
        // this.factory = movieFactory;
        // this.tabs = Tabs.tabs;
        console.debug("tabs")
        // this.list = [{title: 'first title', desc: 'first desc'}];
        // this.factory.getMovies()
        //     .then(mov => {
        //         mov.movies.forEach(movie => {
        //             this.list.push({
        //                 title: movie.title, desc: movie.description
        //             });
        //             console.debug(this.list);
        //         });
        //     });
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
    
    getTabs() {
        return this.tabs;
    }

    addTab(tab: Tab) {
        console.debug('addTab', tab);
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


@DynamicComponent({
    selector: 'dynamic-comp',
    bind : {
        component : 'component'
    }
})
class DynamicComp {
    tab:Tab;
    constructor(loader:PrivateComponentLoader, location:PrivateComponentLocation) {
        console.debug('loader')
        this.loader = loader;
        this.location = location;   
    }
    set component(ComponentConstructor) {
        this.loader.load(ComponentConstructor, this.location).then((tab) => {
            console.debug('IS there a tab', tab);
            this.tab = tab;
        });
    }
}


@Component({
    selector: 'tab',
    bind: {
        'tabTitle': 'tab-title'
    },
    services: [MovieFactory]
})
@Template({
    inline: `
        <div [hidden]="!active">
            <content></content>
        </div>
    `
})
export class Tab {
    constructor(@Parent() tabs: Tabs, movieFactory:MovieFactory) {
        this.factory = movieFactory;
        this.list = [{title: 'first title', desc: 'first desc'}];
        this.factory.getMovies()
            .then(mov => {
                mov.movies.forEach(movie => {
                    this.list.push({
                        title: movie.title, desc: movie.description
                    });
                    console.debug('what', this.list);
                    tabs.addTab(this.list);
                });
            });
    }
}
export function main() {
    return bootstrap(Hello);
}