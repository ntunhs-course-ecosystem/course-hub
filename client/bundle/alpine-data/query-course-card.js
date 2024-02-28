import Alpine from "alpinejs";

export function getQueryCourseCardData(course) {
    return {
        getCardClass() {
            if (Alpine.store("preCourses").isExist(course.courseFullID)) {
                return {
                    "course": "bg-green-50",
                    "button": "bg-green-50",
                    "addButton": "hidden"
                };
            } else if (Alpine.store("preCourses").isConflict(course.startPeriod, course.endPeriod, course.dayNum)) {
                return {
                    "course": "bg-red-50",
                    "button": "bg-red-50",
                    "addButton": "fill-red-100 hover:fill-red-200"
                };
            }
            return {
                "course": "",
                "button": "",
                "addButton": "fill-inherit hover:fill-green-500"
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