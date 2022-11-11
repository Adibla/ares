import * as utility from "../../src/utils";
import {formatDirContentBeforeStore} from "../../src/utils";
import {DbmsSupported, FileData} from "../../src/interfaces";
import fs from "fs";
import * as R from "ramda";

describe("Utililty functions", () => {
    describe("Format content before store", () => {
        it('should return same files length',  async () => {
            const dataLocationDir = __dirname+"/../data/data-sample";
            const content = await fs.promises.readdir(dataLocationDir)
            const formatted = await formatDirContentBeforeStore(content, dataLocationDir);
            expect(formatted.length).toBe(4);
        });

        it('should return same files formatted',  async () => {
            const dataLocationDir = __dirname + "/../data/data-sample";
            const content = await fs.promises.readdir(dataLocationDir)
            const formatted = await formatDirContentBeforeStore(content, dataLocationDir);

            const expectedResult = [
                {
                id: '001',
                author: 'Andrea',
                dbms: 'mysql',
                title: 'example',
                tag: undefined,
                labels: undefined,
                comment: undefined,
                up: 'Insert x',
                down: 'delete y',
                ares_version: '1.0.0',
                status: 'PENDING',
                outcome: 'NONE',
                filename: '001-example.json',
                description: undefined,
                checksum: '77dec3c150abe9328f67c3f3103cb4e3'
            },
                {
                    id: '002',
                    author: 'Andrea',
                    dbms: 'mysql',
                    title: 'example',
                    tag: undefined,
                    labels: undefined,
                    comment: undefined,
                    up: 'Insert x',
                    down: 'delete y',
                    ares_version: '1.0.0',
                    status: 'PENDING',
                    outcome: 'NONE',
                    filename: '002-example.json',
                    description: undefined,
                    checksum: '77dec3c150abe9328f67c3f3103cb4e3'
                },
                {
                    id: '003',
                    author: 'andrea',
                    dbms: 'mysql',
                    title: 'example',
                    tag: undefined,
                    labels: undefined,
                    comment: undefined,
                    up: 'Insert x',
                    down: 'delete y',
                    ares_version: '1.0.0',
                    status: 'PENDING',
                    outcome: 'NONE',
                    filename: '003-example-andrea.json',
                    description: undefined,
                    checksum: '77dec3c150abe9328f67c3f3103cb4e3'
                },
                {
                    id: '004',
                    author: 'andrea',
                    dbms: 'mongodb',
                    title: 'example',
                    tag: undefined,
                    labels: undefined,
                    comment: undefined,
                    up: 'Insert x',
                    down: 'delete y',
                    ares_version: '1.0.0',
                    status: 'PENDING',
                    outcome: 'NONE',
                    filename: '004-example-andrea.json',
                    description: undefined,
                    checksum: '071839ebe01ad4dfadb9f38b35c30bd1'
                }
            ];
            const resultWithoutCreatedAt = formatted.map(el => R.omit(["created_at"], el));
            expect(resultWithoutCreatedAt).toEqual(expectedResult);
        })

        it('should get author name from file name if exist',  async () => {
            const dataLocationDir = __dirname + "/../data/data-author";
            const content = await fs.promises.readdir(dataLocationDir)
            const formatted = await formatDirContentBeforeStore(content, dataLocationDir);

            const expectedResult = [
                {
                    id: '001',
                    author: 'andrea',
                    dbms: 'mongodb',
                    title: 'example',
                    tag: undefined,
                    labels: undefined,
                    comment: undefined,
                    up: 'Insert x',
                    down: 'delete y',
                    ares_version: '1.0.0',
                    status: 'PENDING',
                    outcome: 'NONE',
                    filename: '001-example-andrea.json',
                    description: undefined,
                    checksum: '579a3dd4921843640b0255ddce4e5f61'
                },
            ];
            const resultWithoutCreatedAt = formatted.map(el => R.omit(["created_at"], el));
            expect(resultWithoutCreatedAt).toEqual(expectedResult);
        })
        it('should get author name from content if exist',  async () => {
            const dataLocationDir = __dirname + "/../data/data-author-content";
            const content = await fs.promises.readdir(dataLocationDir)
            const formatted = await formatDirContentBeforeStore(content, dataLocationDir);

            const expectedResult = [
                {
                    id: '001',
                    author: 'AndreaFile',
                    dbms: 'mongodb',
                    title: 'example',
                    tag: undefined,
                    labels: undefined,
                    comment: undefined,
                    up: 'Insert x',
                    down: 'delete y',
                    ares_version: '1.0.0',
                    status: 'PENDING',
                    outcome: 'NONE',
                    filename: '001-example.json',
                    description: undefined,
                    checksum: '579a3dd4921843640b0255ddce4e5f61'
                }
            ];
            const resultWithoutCreatedAt = formatted.map(el => R.omit(["created_at"], el));
            expect(resultWithoutCreatedAt).toEqual(expectedResult);
        })
    })
    describe("Content Validation", () => {
        it('should return object if content is valid',  async () => {
            const content: FileData = {
                "dbms": DbmsSupported.MYSQL,
                "author": "andrea",
                "description": "cici",
                "up": "cicic",
                "down": "skksksk",
                "title": "title"
            }
            const result = await utility.validateContent(content)
            expect(result).toBe(content)
        });

        it('should return error is missing required property',  async () => {
            const content: any = {
                "author": "andrea",
                "description": "cici",
                "up": "cicic",
                "down": "skksksk",
                "title": "title"
            }
            try{
                const result = await utility.validateContent(content)
            }catch (e: any) {
                expect(e.message).toContain("Validation error")
            }
        });

        it('should return validation error if property has wrong value',  async () => {
            const content: any = {
                "author": "andrea",
                "description": "cici",
                "up": "cicic",
                "down": "skksksk",
                "dbms": "not_exist",
                "title": "title"
            }
            try{
                const result = await utility.validateContent(content)
            }catch (e: any) {
                expect(e.message).toContain("Validation error")
            }
        });
    })
    describe("Checksum", () => {
        it('should generate checksum from filedata',  async () => {
            const filedata: string = "data";
            const result = await utility.generateChecksum(filedata);
            expect(result).toBe("8d777f385d3dfec8815d20f7496026dc");
        });
    })
})
