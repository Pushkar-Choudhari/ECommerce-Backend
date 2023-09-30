import { Client } from '@elastic/elasticsearch';
const client = new Client({ node: "https://localhost:9200" }); // Replace with your Elasticsearch server address

// Index the product data
export const indexProduct= async (product)=> {
  try {
    const response = await client.index({
      index: 'products', //Replace with your Elasticsearch index name
      id: product.product_id,
      body: product,
    });
    console.log('Product indexed:', response.body);
  } catch (error) {
    console.error('Elasticsearch indexing error:', error);
  }
}

export default indexProduct