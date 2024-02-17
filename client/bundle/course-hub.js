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
    }
};

window.addEventListener("DOMContentLoaded", (event) => {
    window.NtunhsCourseHubFns = NtunhsCourseHubFns;

    let cardColor = window.localStorage.getItem("ntunhs-course-hub-card-color");
    if (!cardColor) {
        cardColor = "green";
        window.localStorage.setItem("ntunhs-course-hub-card-color", cardColor);
    }
});