import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/current-user/user.service";
import {ModalService} from "../../../shared/components/shared-modal/shared-modal-service";
import {HttpRequestsService} from "../../../shared/services/http/http-requests.service";
import {NewsService} from "../../../shared/components/news/news.service";


@Component({
    selector: 'profile-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
    constructor(private router: Router, private userService: UserService, private modalService: ModalService, private newsService: NewsService) {}
    isFormOpen = false;
    news: string = '';
    isAdmin: boolean = false;

    ngOnInit() {
        this.modalService.modalClosed.subscribe(() => {
            this.closeAddNewsForm();
        })
        let role: string | undefined = this.userService.getUser()?.role;
        console.log(role);
        this.isAdmin = role === "администратор";
    }

    navigateToProfile(): void {
        let user = this.userService.getUser();
        let id = user?.id;
        this.router.navigate([`/profile/${id}`]).then(() => {
            console.log('Navigation successful');
        }).catch((error) => {
            console.log('Navigation error', error);
        });
    }

    navigateToNews(): void {
        this.router.navigate(['/news']).then(() => {
            console.log('Navigation successful');
        }).catch((error) => {
            console.log('Navigation error', error);
        })
    }


    addNews() {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        let news = {
            id: this.userService.getUser()?.id,
            title: this.news,
            date: formattedDate
        }

        this.newsService.addNews(news);
        this.modalService.closeModals();
        this.news = '';
    }

    allUsers() {
        this.router.navigate(['/allUsers']).then(() => {
          console.log('Navigation successful');
        }).catch((error) => {
          console.log('Navigation error', error);
        })
    }

    openAddNewsForm(): void {
        this.isFormOpen = true;
    }

    closeAddNewsForm(): void {
        if (this.isFormOpen) {
            this.isFormOpen = false;
            this.modalService.closeModals();
        }
    }

    adminPanel() {
        window.location.href = 'http://localhost:3000/users';
    }
}
