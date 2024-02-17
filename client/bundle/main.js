import "htmx.org";
import Alpine from "alpinejs";
import { NtunhsCourseHubFns } from "../bundle/course-hub.js";

window.Alpine = Alpine;

// Start Alpine when the page is ready.
window.addEventListener("DOMContentLoaded", (event) => {
    Alpine.start();
});

window.addEventListener("alpine:init", () => {
    Alpine.data("getCourseCardMenuData", function (courseCardUid) {
        let courseCard = document.querySelector(`.calendar-course-card-${courseCardUid}`);
        let courseCardItem = courseCard.querySelector("a");

        return {
            show: false,
            menu: false, 
            color: NtunhsCourseHubFns.getCourseCardColor(courseCardUid).name,
            changeColor(colorName) {
                NtunhsCourseHubFns.persistent.setCourseCardColor(colorName);
                let oldColor = NtunhsCourseHubFns.getColorByName(this.color);
                let targetColor = NtunhsCourseHubFns.getColorByName(colorName);
                this.changeCourseCardColor(oldColor, targetColor);
                this.show = false;
                this.menu = false;
            },
            changeCourseCardColor(oldColor, targetColor) {
                courseCardItem.classList.remove(oldColor.bg.color);
                courseCardItem.classList.remove(oldColor.bg.hoverColor);
                courseCardItem.classList.add(targetColor.bg.color);
                courseCardItem.classList.add(targetColor.bg.hoverColor);
                this.color = window.NtunhsCourseHubFns.getCourseCardColor(courseCardUid).name;

                this.changeCourseCardCourseNameColor(oldColor, targetColor);
                this.changeCourseCardTimeColor(oldColor, targetColor);
            },
            changeCourseCardCourseNameColor(oldColor, targetColor) {
                let courseNameElement = courseCardItem.querySelector("p:nth-child(1)");
                courseNameElement.classList.remove(oldColor.courseText.color);
                courseNameElement.classList.add(targetColor.courseText.color);
            },
            changeCourseCardTimeColor(oldColor, targetColor) {
                let timeElement = courseCardItem.querySelector("p:nth-child(2)");
                timeElement.classList.remove(oldColor.timeText.color);
                timeElement.classList.remove(oldColor.timeText.hoverColor);
                timeElement.classList.add(targetColor.timeText.color);
                timeElement.classList.add(targetColor.timeText.hoverColor);
            }
        };
    });
});

// Restart Alpine when the DOM is altered by HTMX.
document.body.addEventListener("htmx:afterSwap", () => {
    Alpine.start();
});