import { Client } from '@elastic/elasticsearch';
const client = new Client({ node: 'http://localhost:9200' }); // Replace with your Elasticsearch server address

export const search = async (req, res) => {
    const { q } = req.body.query; 
  
    try {
        const { body } = await client.search({
            index: 'products',
            body: {
              query: {
                bool: {
                  should: [
                    {
                      match: {
                        name: q, // Match the search query against the "name" field
                      },
                    },
                    {
                      match: {
                        description: q, // Match the search query against the "description" field
                      },
                    },
                  ],
                },
              },
            },
          });
  
      // Process and send the search results to the client
      res.json(body.hits.hits.map(hit => hit._source));
    } catch (error) {
      return next(err)
    }
  }