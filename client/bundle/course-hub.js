export const colors = [
    {
        name: "gray",
        bg: {
            color: "bg-gray-50",
            hoverColor: "hover:bg-gray-100"
        },
        courseText: {
            color: "text-gray-700"
        },
        timeText: {
            color: "text-gray-400",
            hoverColor: "group-hover:text-gray-600"
        }
    },
    {
        name: "orange",
        bg: {
            color: "bg-orange-50",
            hoverColor: "hover:bg-orange-100"
        },
        courseText: {
            color: "text-orange-700"
        },
        timeText: {
            color: "text-orange-400",
            hoverColor: "group-hover:text-orange-600"
        }
    },
    {
        name: "yellow",
        bg: {
            color: "bg-yellow-50",
            hoverColor: "hover:bg-yellow-100"
        },
        courseText: {
            color: "text-yellow-700"
        },
        timeText: {
            color: "text-yellow-400",
            hoverColor: "group-hover:text-yellow-600"
        }
    },
    {
        name: "green",
        bg: {
            color: "bg-green-50",
            hoverColor: "hover:bg-green-100"
        },
        courseText: {
            color: "text-green-700"
        },
        timeText: {
            color: "text-green-600",
            hoverColor: "group-hover:text-green-700"
        }
    },
    {
        name: "blue",
        bg: {
            color: "bg-blue-50",
            hoverColor: "hover:bg-blue-100"
        },
        courseText: {
            color: "text-blue-700"
        },
        timeText: {
            color: "text-blue-400",
            hoverColor: "group-hover:text-blue-600"
        }
    },
    {
        name: "purple",
        bg: {
            color: "bg-purple-50",
            hoverColor: "hover:bg-purple-100"
        },
        courseText: {
            color: "text-purple-700"
        },
        timeText: {
            color: "text-purple-400",
            hoverColor: "group-hover:text-purple-600"
        }
    },
    {
        name: "pink",
        bg: {
            color: "bg-pink-50",
            hoverColor: "hover:bg-pink-100"
        },
        courseText: {
            color: "text-pink-700"
        },
        timeText: {
            color: "text-pink-400",
            hoverColor: "group-hover:text-pink-600"
        }
    },
    {
        name: "red",
        bg: {
            color: "bg-red-50",
            hoverColor: "hover:bg-red-100"
        },
        courseText: {
            color: "text-red-700"
        },
        timeText: {
            color: "text-red-400",
            hoverColor: "group-hover:text-red-600"
        }
    }
];

export const NtunhsCourseHubFns = {
    persistent: {
        /**
         * 
         * @param { "gray" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" } color 
         */
        setCourseCardColor: (color) => {
            window.localStorage.setItem("ntunhs-course-hub-card-color", color);
        },
        getCourseCardColor: () => {
            return window.localStorage.getItem("ntunhs-course-hub-card-color");
        }
    },
    getCourseCardColor: (courseCardUid) => {
        let courseCard = document.querySelector(`.calendar-course-card-${courseCardUid}`);
        let courseCardItem = courseCard.querySelector("a");
        for (let i = 0; i < colors.length; i++) {
            if (courseCardItem.classList.contains(colors[i].bg.color)) {
                return colors[i];
            }
        }
    },
    getColorByName: (colorName) => {
        return colors.find(c => c.name === colorName);
    },
    openCourseDetailModal: (id) => {
        let courseDetailModalEl = document.getElementById(id);
        courseDetailModalEl.dispatchEvent(
            new CustomEvent("open-modal", {
                detail: {}
            })
        );
    },
    openModalById: (id) => {
        let modalEl = document.getElementById(id);
        modalEl.dispatchEvent(
            new CustomEvent("open-modal", {
                detail: {}
            })
        );
    },
    searchParameterHandler: {
        changeSemester (value, text) {
            let dropdownSemester = document.getElementById("dropdown-semester");
            dropdownSemester.value=value;

            let semesterLabel = document.getElementById("semester-label");
            semesterLabel.innerHTML = text;

            this.setParameter("semester", value);
        },
        setParameter(key, value) {
            let searchValue = this.getSearchValue();
            searchValue[key] = value;
            this.getSearchForm().setAttribute("hx-vals", JSON.stringify(searchValue));
        },
        getParameter(key) {
            let searchForm = document.querySelector("#search-form");
            let searchValue = searchForm.getAttribute("hx-vals");
            searchValue = JSON.parse(searchValue);
            return searchValue[key];
        },
        getSearchValue() {
            let searchValue = this.getSearchForm().getAttribute("hx-vals");
            return JSON.parse(searchValue);
        },
        getSearchForm() {
            return document.querySelector("#search-form");
        }
    },
    chineseDayMapping: Object.freeze(["", "一", "二", "三", "四", "五", "六", "日"]),
    isAnyDetailModalOpen() {
        let openedDetailModal = document.querySelector(`[id*='course-detail-modal'][data-state-open="true"]`);
        return openedDetailModal;
    }
};

NtunhsCourseHubFns.CalendarCourseCardColorHandler = function(calendarCourseCardUid) {
    let courseCard = document.querySelector(`.calendar-course-card-${calendarCourseCardUid}`);
    let courseCardItem = courseCard.querySelector("a");

    return {
        changeBg(colorName) {
            NtunhsCourseHubFns.persistent.setCourseCardColor(colorName);
            let oldColorName = NtunhsCourseHubFns.getCourseCardColor(calendarCourseCardUid).name;
            let oldColor = NtunhsCourseHubFns.getColorByName(oldColorName);
            let targetColor = NtunhsCourseHubFns.getColorByName(colorName);

            courseCardItem.classList.remove(oldColor.bg.color);
            courseCardItem.classList.remove(oldColor.bg.hoverColor);
            courseCardItem.classList.add(targetColor.bg.color);
            courseCardItem.classList.add(targetColor.bg.hoverColor);

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
};

window.addEventListener("DOMContentLoaded", (event) => {
    window.NtunhsCourseHubFns = NtunhsCourseHubFns;

    let cardColor = window.localStorage.getItem("ntunhs-course-hub-card-color");
    if (!cardColor) {
        cardColor = "green";
        window.localStorage.setItem("ntunhs-course-hub-card-color", cardColor);
    }
});


window.addEventListener("htmx:afterRequest", ({ target, detail })=> {
    if (target?.id === "search-form") {
        let noDataEl = document.getElementById("query-course-block-no-data");
        if (detail.xhr.status === 204) {
            let queryCourseCardsEl = document.getElementById("query-course-cards");
            queryCourseCardsEl.innerHTML = "";

            noDataEl?.classList.remove("hidden");
        } else {
            noDataEl?.classList.add("hidden");
        }
        console.log(detail.xhr.status);
    }
});