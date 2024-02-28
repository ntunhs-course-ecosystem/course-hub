import { NtunhsCourseHubFns } from "../course-hub";

export const getSearchAdvancedData = function () {
    return {
        periods: [],
        days: [],
        departments: [],
        addSearchValueFromElement: function (el, field) {
            if (this.isActive(el)) {
                let index = this[field].indexOf(el.getAttribute("data-value"));
                if (index > -1) {
                    this[field].splice(index, 1);
                    el.setAttribute("data-state", "inactive");
                    el.classList.remove("bg-green-200");
                }
            } else {
                this[field].push(el.getAttribute("data-value"));
                el.setAttribute("data-state", "active");
                el.classList.add("bg-green-200");
            }

            NtunhsCourseHubFns.searchParameterHandler.setParameter(field, this[field]);
        },
        /**
         * 
         * @param {HTMLElement} el 
         * @returns 
         */
        isActive: function (el) {
            return el.getAttribute("data-state") === "active";
        }
    };
};