import test from "ava";
import parseConfig from "./Configuration";

test("parses single-level configuration", async (t) => {
    t.plan(3);
    const config = parseConfig(Buffer.from(JSON.stringify({
        foo: 1,
        bar: true,
        foobar: "barfoo"
    }), "utf8"), {
        foo: "fail",
        bar: "fail",
        foobar: "fail"
    });
    t.is(config.foo, 1);
    t.is(config.bar, true);
    t.is(config.foobar, "barfoo");
});

test("parses multi-level configuration", async (t) => {
    t.plan(3);
    const config = parseConfig(Buffer.from(JSON.stringify({
        a: {
            b: {
                c: {
                    foo: "bar"
                },
                bar: 1
            }
        },
        foo: true
    })), {
        a: {
            b: {
                c: {
                    foo: "fail"
                },
                bar: "fail"
            }
        },
        foo: "fail"
    });
    t.is(config["a.b.c.foo"], "bar");
    t.is(config["a.b.bar"], 1);
    t.is(config.foo, true);
});

test("parses arrays in configuration", async (t) => {
    t.plan(6);
    const config = parseConfig(Buffer.from(JSON.stringify({
        a: [
            1,
            2
        ],
        b: [
            [
                "foo",
                true
            ],
            {
                bar: false
            }
        ],
        foo: true
    })), {
        a: [
            "fail",
            "fail"
        ],
        b: [
            [
                "fail",
                "fail"
            ],
            {
                bar: "fail"
            }
        ],
        foo: "fail"
    });
    t.is(config["a.0"], 1);
    t.is(config["a.1"], 2);
    t.is(config["b.0.0"], "foo");
    t.is(config["b.0.1"], true);
    t.is(config["b.1.bar"], false);
    t.is(config.foo, true);
});
