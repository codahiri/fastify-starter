const responseSchema = {
    response: {
        200: {
            properties: {
                message: { type: 'string' }
            }
        }
    }
}

const greetingsController = (fastify, opts, done) => {
    fastify.get("/", (req, reply) => {
        return {
            message: "Hello World"
        }
    })

    fastify.get("/:name", { schema: responseSchema }, (req, reply) => {
        return {
            message: `Hello ${req.params.name}`
        }
    })

    done();
}

export default greetingsController;
