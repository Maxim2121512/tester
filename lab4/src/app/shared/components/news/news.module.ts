import {NgModule} from "@angular/core";
import {NewsComponent} from "./news.component";
import {CommonModule} from "@angular/common";


@NgModule({
    declarations: [NewsComponent],
    exports: [NewsComponent],
    imports: [
        CommonModule
    ]
})
export class NewsModule {}
