import Alpine from "alpinejs";

export function getQueryCourseCardData(course) {
    return {
        getCardClass() {
            if (Alpine.store("preCourses").isExist(course.courseFullID)) {
                return {
                    "course": "bg-green-50",
                    "addButton": "bg-green-50",
                    "addButtonIcon": "hidden",
                    "removeButton": "bg-green-50",
                    "removeButtonIcon": "fill-inherit hover:fill-red-500"
                };
            } else if (Alpine.store("preCourses").isConflict(course.startPeriod, course.endPeriod, course.dayNum)) {
                return {
                    "course": "bg-red-50",
                    "addButton": "bg-red-50",
                    "addButtonIcon": "fill-red-100 hover:fill-red-200",
                    "removeButtonIcon": ""
                };
            }
            return {
                "course": "",
                "addButton": "",
                "addButtonIcon": "fill-inherit hover:fill-green-500",
                "removeButton": "hidden",
                "removeButtonIcon": ""
            };
        },
        isExistInCalendar() {
            return Alpine.store("preCourses").isExist(course.courseFullID);
        },
        isConflict() {
            return Alpine.store("preCourses").isConflict(course.startPeriod, course.endPeriod, course.dayNum);
        }
    };
}