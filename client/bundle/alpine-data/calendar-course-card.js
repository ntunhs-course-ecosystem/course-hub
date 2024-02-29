import { NtunhsCourseHubFns } from "../course-hub";

export function getCalendarCrouseCardData(courseCardUid) {
    const periodTimeMapping = Object.freeze([
        {},
        {
            start: "0810",
            end: "0900"
        },
        {
            start: "0910",
            end: "1000"
        },
        {
            start: "1010",
            end: "1100"
        },
        {
            start: "1110",
            end: "1200"
        },
        {
            start: "1240",
            end: "1330"
        },
        {
            start: "1340",
            end: "1430"
        },
        {
            start: "1440",
            end: "1530"
        },
        {
            start: "1540",
            end: "1630"
        },
        {
            start: "1640",
            end: "1730"
        },
        {
            start: "1740",
            end: "1830"
        },
        {
            start: "1835",
            end: "1925"
        },
        {
            start: "1730",
            end: "2020"
        },
        {
            start: "2025",
            end: "2115"
        },
        {
            start: "2120",
            end: "2210"
        }
    ]);

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
        defaultColor: () => NtunhsCourseHubFns.getColorByName(defaultColorName),
        getPeriod(startPeriod, endPeriod) {
            return `${periodTimeMapping[startPeriod].start}-${periodTimeMapping[endPeriod].end}`;
        },
        getLiClass(course) {
            return `sm:col-start-${course.dayNum} flex mt-[1px] relative calendar-course-card-${course.courseFullID}`;
        },
        getLiStyle(startPeriod, endPeriod) {
            let periodLength = (parseInt(endPeriod) - parseInt(startPeriod)) + 1;
            let rowStart = (parseInt(startPeriod)-1) * 12 + 2;
            return `grid-row: ${rowStart} / span ${periodLength * 12}`;
        }
    };
}