import {db} from "@db"
import { RequestController, RequestRouter, RequestService } from "./modules/Request"

export default {
    createRequest() {
        const service = new RequestService(db);
        const controller = new RequestController(service);
        return new RequestRouter(controller).router;
    }
}