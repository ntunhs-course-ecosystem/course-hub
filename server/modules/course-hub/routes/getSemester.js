import { GetSemesterService } from "../service/getSemesterService.js";

export default async function(fastify, opts) {
    fastify.get("/semesters", {
        schema: {
            response: {
                "200": {
                    type: "object",
                    properties: {
                        semesters: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        }
    }, async (request, reply)=> {
        let getSemesterService = new GetSemesterService(request);
        let { semesters } = await getSemesterService.getSemesters();

        let panelItems = semesters.map(v=> {
            return {
                template: "dropdown-panel-button",
                data: {
                    buttonText: GetSemesterService.getChineseSemester(v),
                    buttonAttrs: [
                        "@click=NtunhsCourseHubFns.searchParameterHandler.changeSemester($el.value,$el.innerHTML);toggle();",
                        `value=${v}`
                    ] 
                }
            };
        });

        return reply.view("components/dropdown", {
            labelText: "semester",
            panelItems
        });
    });
}