import { start } from "../bin/start";
import * as service from "../bin/service";
import * as service_migration from "../bin/service/migration";
import chalk from "chalk";
import {CommandlineArgs, Operation} from "../bin/interfaces";

describe("Start", () => {
    jest.spyOn(service, "connect").mockImplementation(async e => {
        return;
    })

    jest.spyOn(service, "close").mockImplementation(async e => {
        return;
    })

    jest.spyOn(service, "executeRaw").mockImplementation(async e => {
        return true;
    })

    jest.spyOn(service, "initDB").mockImplementation(async e => {
        return;
    } )

    jest.spyOn(service_migration, "list").mockImplementation(async e => {
        return [];
    } )

    jest.spyOn(service_migration, "saveAll").mockImplementation(async e => {
        return ["ciao"];
    } )

    jest.spyOn(service_migration, "save").mockImplementation(async e => {
        return true;
    } )



    it("Should return true", async() => {
        console.log = jest.fn();
        const args: CommandlineArgs = {o: Operation.UP, description: "dsc"};
        await expect(start(args)).resolves.not.toThrowError();

        expect(console.log).toHaveBeenCalledWith(chalk.green('MIGRATIONS DONE, ID => '));
    })

    it("Should return error if get return same id", async() => {
        console.log = jest.fn();

        // @ts-ignore
        jest.spyOn(service_migration, "list").mockImplementation(async e => {
            return [{
                id: "001"
            }];
        } )

        const args: CommandlineArgs = {o: Operation.UP, m: ["001"], description:"desc"};
        await expect(start(args)).resolves.not.toThrowError();
        expect(console.log).toHaveBeenCalledWith(chalk.yellow('NO NEW MIGRATIONS!'));
    })
})
