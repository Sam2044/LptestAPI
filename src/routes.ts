import { TestController } from "./controller/TestController"


export const Routes = [ {
    method: "get",
    route: "/test",
    controller: TestController,
    action: "all"
}

]