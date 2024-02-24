import "htmx.org";
import Alpine from "alpinejs";
import { NtunhsCourseHubFns } from "../bundle/course-hub.js";
import { getDropdownData } from "./alpine-data/dropdown.js";
import { getSearchAdvancedData } from "./alpine-data/search-advanced.js";

window.Alpine = Alpine;

// Start Alpine when the page is ready.
window.addEventListener("DOMContentLoaded", (event) => {
    Alpine.start();
});

window.addEventListener("alpine:init", () => {

    Alpine.data("getCalendarCrouseCardData", function (courseCardUid) {
        let defaultColorName = NtunhsCourseHubFns.persistent.getCourseCardColor();
        
        return {
            color_: undefined,
            get color() {
                return this.color_ || this.defaultColor();
            },
            set color(colorName) {
                let colorObj = NtunhsCourseHubFns.getColorByName(colorName);
                this.color_ = colorObj;

                NtunhsCourseHubFns.CalendarCourseCardColorHandler(courseCardUid).changeBg(colorName);
                NtunhsCourseHubFns.persistent.setCourseCardColor(colorName);
            },
            defaultColor: () => NtunhsCourseHubFns.getColorByName(defaultColorName)
        };
    });

    Alpine.data("getCourseCardMenuData", function () {
        return {
            show: false,
            menu: false
        };
    });

    Alpine.data("getDropdownData", getDropdownData);

    Alpine.data("getSearchAdvancedData", getSearchAdvancedData);
});

// Restart Alpine when the DOM is altered by HTMX.
document.body.addEventListener("htmx:afterSwap", () => {
    // 暫時註解此功能，因為重複啟動 alpine 會導致問題 (e.g. 部分功能無法使用)
    // Alpine.start();
});