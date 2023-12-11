import {Component, Input} from "@angular/core";
import {UserService} from "../../../shared/services/current-user/user.service";


@Component({
    selector: 'profile-info',
    templateUrl: './info.component.html',
    styleUrl: './info.component.css'
})
export class InfoComponent{
    @Input() userData: any
}
