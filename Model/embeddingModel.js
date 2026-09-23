const { pipeline } = require("@xenova/transformers");

async function createEmbeddingModel() {
    const extractor = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
    );

    async function embed(text) {
        const output = await extractor(text, {
            pooling: "mean", // average embedding
            normalize: true  // normalize for cosine similarity
        });

        return Array.from(output.data);

    }

    return { embed };
}

module.exports = { createEmbeddingModel };
