import { create } from "./create";
import { down } from "./down";
import { up } from "./up";

import { Controller } from "../../interfaces";

const manualController: Controller = {
 create,
 down,
 up
}

export {
 manualController
}
