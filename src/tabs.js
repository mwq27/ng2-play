import {Component, Template, For} from 'angular2/angular2';

@Component({
    selector: 'tabs'
})
@Template({
    directives: [For],
    inline: `
        <ul>
            <li *for="#tab of tabs">{{tab.tabTitle}}</li>
        </ul>
        <content></content>
    `,
})
export class Tabs {
    constructor() {
        this.tabs = [];
    }

    addTab(tab: Tab) {
        this.tabs.push(tab);
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
        <div>
            <content></content>
        </div>
    `
})
export class Tab {
    constructor(@Parent() tabs: Tabs) {
        tabs.addTab(this)
    }
}