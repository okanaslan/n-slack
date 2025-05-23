import { describe, beforeEach, it, expect, vi } from "vitest";

import { createApp } from "./utils";
import { SlackService } from "../src/slack.service";

describe("SlackService", () => {
    it("must be defined", async () => {
        const app = await createApp();
        expect(app.get<SlackService>(SlackService)).toBeDefined();
    });

    describe("helpers", () => {
        let service: SlackService;
        beforeEach(async () => {
            const app = await createApp();
            service = app.get<SlackService>(SlackService);
            service.postMessage = vi.fn();
        });
        describe("sendText", () => {
            it("must forward to sendMessage", async () => {
                await service.sendText("hello world", { channel: "test", attachments: [] });
                expect(service.postMessage).toHaveBeenCalledWith({
                    channel: "test",
                    text: "hello world",
                    attachments: [],
                });
            });
        });

        // describe("sendBlocks", () => {
        //     it("must forward to sendMessage", async () => {
        //         const blocks = BlockCollection(Blocks.Section({ text: "hello-world" }));
        //         await service.sendBlocks(blocks);
        //         expect(service.postMessage).toHaveBeenCalledWith({ blocks });
        //     });
        // });

        describe("WebClient", () => {
            it("slack sdk WebClient is available", async () => {
                expect(service.client).toBeDefined();
            });
        });
    });
});
