const responseSchema = {
    response: {
        200: {
            books: { type: 'array' }
        }
    }
}

const postSchema = {
    body: {
        properties: {
            book: { type: 'object' }
        },
        required: ['book']
    },
    response: {
        200: {
            status: { type: 'number' }
        }
    }
}

const booksController = (fastify, opts, done) => {
    fastify.get('/', { schema: responseSchema }, async (req, reply) => {
        try {
            const [books] = await fastify.mysql.execute('SELECT * FROM books');
            return { books }
        } catch (error) {
            return error;
        }
    });

    fastify.post('/', { schema: postSchema }, async (req, reply) => {
        const { book } = req.body;
        try {
            await fastify.mysql.execute(`
                                    INSERT INTO books (title, author)
                                    VALUES (?, ?);
                                    `, [book.title, book.author]);
            return { status: 200 };
        } catch (error) {
            return error;
        }
    });

    done();
}

export default booksController;
