import {Component, Template, For, bootstrap, Parent} from 'angular2/angular2';

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
        <tab tab-title="Tab 1">
            Here's some tab 1 stuff
        </tab>
        <tab tab-title="Tab 2">
            Here's some tab 2 stuff
        </tab>
        <content></content>
    `,
    directives: [For, Tab]
})
export class Tabs {
    constructor() {
        this.tabs = [];
    }

    addTab(tab: Tab) {
        console.log(tab)
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
    constructor(@Parent() tabs: Tabs) {
        console.log('vvvvvv', tabs);
        tabs.addTab(this);
    }
}
export function main() {
    return bootstrap(Tabs);
}