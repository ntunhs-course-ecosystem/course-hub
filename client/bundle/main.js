import "htmx.org";
import Alpine from "alpinejs";
import { NtunhsCourseHubFns } from "../bundle/course-hub.js";
import { getDropdownData } from "./alpine-data/dropdown.js";
import { getSearchAdvancedData } from "./alpine-data/search-advanced.js";
import { getCalendarCrouseCardData } from "./alpine-data/calendar-course-card.js";
import { getQueryCourseCardData } from "./alpine-data/query-course-card.js";

window.Alpine = Alpine;

// Start Alpine when the page is ready.
window.addEventListener("DOMContentLoaded", (event) => {
    Alpine.start();
});

window.addEventListener("alpine:init", () => {

    Alpine.data("getQueryCourseCardData", getQueryCourseCardData);

    Alpine.data("getCalendarCrouseCardData", getCalendarCrouseCardData);

    Alpine.data("getCourseCardMenuData", function () {
        return {
            show: false,
            menu: false
        };
    });

    Alpine.data("getDropdownData", getDropdownData);

    Alpine.data("getSearchAdvancedData", getSearchAdvancedData);

    Alpine.store("preCourses", { 
        data: [],
        specific: {
            period: 0,
            dayNum: 0
        },
        addCourse(course) {
            if (this.isExist(course.courseFullID)) return;
            this.data.push(course);
            for(let i = parseInt(course.startPeriod); i <= parseInt(course.endPeriod); i++){
                let specificPeriodCard = document.querySelector(`li[data-start-period="${i}"][data-day="${course.dayNum}"]`);
                specificPeriodCard.classList.add("hidden");
            }
        },
        removeCourse(courseFullID) {
            let courseIndex = this.findIndex(courseFullID);
            if (this.isExist(courseFullID)) {
                let course = this.data[courseIndex];
                for(let i = parseInt(course.startPeriod); i <= parseInt(course.endPeriod); i++){
                    let specificPeriodCard = document.querySelector(`li[data-start-period="${i}"][data-day="${course.dayNum}"]`);
                    specificPeriodCard.classList.remove("hidden");
                }
                this.data.splice(courseIndex, 1);
            }
        },
        isExist(courseFullID) {
            return this.findIndex(courseFullID) > -1;
        },
        findIndex(courseFullID) {
            return this.data.findIndex(v => v.courseFullID === courseFullID);
        },
        isConflict(startPeriod, endPeriod, day) {
            let index = this.data.findIndex(
                v => v.endPeriod >= startPeriod && v.startPeriod <= endPeriod && parseInt(v.dayNum) === parseInt(day)
            );
            return index > -1;
        }
    });
});

// Restart Alpine when the DOM is altered by HTMX.
document.body.addEventListener("htmx:afterSwap", () => {
    // 暫時註解此功能，因為重複啟動 alpine 會導致問題 (e.g. 部分功能無法使用)
    // Alpine.start();
});